// Agent Actions Handler - Executes actual agent capabilities

import { AgentContext } from './agent-system'
import { searchFeatures, getAllFeaturesBySection } from './site-context'
import { searchFAQs, getFAQsByCategory, getRelatedFAQs } from '../data/faqs'

export interface ActionResult {
  success: boolean
  data?: any
  message: string
  followUp?: string[]
  error?: string
}

export interface MarketData {
  suppliers: Array<{
    id: string
    name: string
    wasteType: string
    volume: number
    location: string
    quality: string
    price?: number
  }>
  processors: Array<{
    id: string
    name: string
    capacity: number
    accepts: string[]
    certifications: string[]
    gateFee: number
    location: string
  }>
  buyers: Array<{
    id: string
    name: string
    needs: string
    volume: number
    priceRange: { min: number; max: number }
  }>
}

// Simulated market data (in production, this would come from database)
const marketData: MarketData = {
  suppliers: [
    {
      id: 'sup1',
      name: 'Brighton Restaurant Group',
      wasteType: 'uco',
      volume: 500,
      location: 'Brighton, UK',
      quality: 'ISCC certified, <3% FFA',
      price: 0.85
    },
    {
      id: 'sup2',
      name: 'Manchester Hotels Ltd',
      wasteType: 'food-waste',
      volume: 2500,
      location: 'Manchester, UK',
      quality: 'Source separated, organic',
      price: 0
    }
  ],
  processors: [
    {
      id: 'proc1',
      name: 'Brighton Community AD',
      capacity: 50000,
      accepts: ['food-waste', 'organic'],
      certifications: ['EA Permit', 'PAS110'],
      gateFee: 35,
      location: 'Brighton, UK'
    },
    {
      id: 'proc2',
      name: 'Bristol Biodiesel Co-op',
      capacity: 10000,
      accepts: ['uco', 'grease'],
      certifications: ['ISCC', 'ISO 14001'],
      gateFee: 0,
      location: 'Bristol, UK'
    }
  ],
  buyers: [
    {
      id: 'buy1',
      name: 'Green Fleet Solutions',
      needs: 'biodiesel',
      volume: 5000,
      priceRange: { min: 1.80, max: 2.10 }
    },
    {
      id: 'buy2',
      name: 'Organic Farms Network',
      needs: 'digestate',
      volume: 1000,
      priceRange: { min: 15, max: 25 }
    }
  ]
}

export async function executeAgentAction(
  agentName: string,
  action: string,
  parameters: any,
  context: AgentContext
): Promise<ActionResult> {
  try {
    // Validate inputs
    if (!agentName || typeof agentName !== 'string') {
      return {
        success: false,
        message: 'Invalid agent name provided'
      }
    }

    if (!action || typeof action !== 'string') {
      return {
        success: false,
        message: 'Invalid action provided'
      }
    }

    // Execute agent-specific action
    switch (agentName) {
      case 'FeedstockMatcher':
        return await executeFeedstockMatcherAction(action, parameters, context)
      case 'TraceBot':
        return await executeTraceBotAction(action, parameters, context)
      case 'RouteGen':
        return await executeRouteGenAction(action, parameters, context)
      case 'CarbonVerifier':
        return await executeCarbonVerifierAction(action, parameters, context)
      case 'SupportBot':
        return await executeSupportBotAction(action, parameters, context)
      default:
        return {
          success: false,
          message: `Agent '${agentName}' is not recognized or not yet implemented.`
        }
    }
  } catch (error) {
    console.error(`Error executing ${agentName} action:`, error)
    return {
      success: false,
      message: `An error occurred while executing the ${action} action. Please try again later.`,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function executeFeedstockMatcherAction(
  action: string,
  parameters: any,
  context: AgentContext
): Promise<ActionResult> {
  try {
    switch (action) {
      case 'find_processors':
        const wasteType = parameters?.wasteType || 'food-waste'
        const location = parameters?.location || 'UK'
        
        // Validate waste type
        const validWasteTypes = ['food-waste', 'uco', 'mixed']
        if (!validWasteTypes.includes(wasteType)) {
          return {
            success: false,
            message: `Invalid waste type '${wasteType}'. Valid types are: ${validWasteTypes.join(', ')}`
          }
        }
        
        const compatibleProcessors = marketData.processors.filter(proc => 
          proc.accepts.includes(wasteType) && 
          proc.location.includes(location)
        )
        
        return {
          success: true,
          data: compatibleProcessors,
          message: `Found ${compatibleProcessors.length} compatible processors for ${wasteType} in ${location}:`,
          followUp: [
            'Would you like to see detailed pricing?',
            'Should I check their current capacity?',
            'Do you need route optimization to these facilities?'
          ]
        }
      
      case 'analyze_waste_stream':
        // Validate required parameters
        if (!parameters || typeof parameters !== 'object') {
          return {
            success: false,
            message: 'Invalid parameters for waste stream analysis. Please provide waste composition data.'
          }
        }
        
        return {
          success: true,
          data: {
            composition: {
              organic: 85,
              packaging: 10,
              other: 5
            },
            quality: 'High',
            processingOptions: ['AD', 'Composting'],
            estimatedValue: 125
          },
          message: 'Waste stream analysis complete. Your material is suitable for anaerobic digestion with high biogas potential.',
          followUp: [
            'Would you like me to find matching processors?',
            'Should I calculate potential carbon credits?'
          ]
        }
      
      default:
        return {
          success: false,
          message: 'Action not recognized. Try "find processors" or "analyze waste stream".'
        }
    }
  } catch (error) {
    console.error('FeedstockMatcher action error:', error)
    return {
      success: false,
      message: 'An error occurred while processing your request. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function executeTraceBotAction(
  action: string,
  parameters: any,
  context: AgentContext
): Promise<ActionResult> {
  try {
    switch (action) {
      case 'track_batch':
        const batchId = parameters?.batchId || 'WTN-2024-0142'
        
        // Validate batch ID format
        if (batchId && !batchId.match(/^WTN-\d{4}-\d{4}$/)) {
          return {
            success: false,
            message: 'Invalid batch ID format. Expected format: WTN-YYYY-NNNN'
          }
        }
        
        return {
          success: true,
          data: {
            batchId,
            status: 'In Transit',
            checkpoints: [
              { location: 'Collection Point', time: '09:00', verified: true },
              { location: 'Weighbridge', time: '09:45', verified: true },
              { location: 'En Route', time: '10:15', verified: true }
            ],
            estimatedArrival: '11:00',
            carbonSaved: 2.4
          },
          message: `Tracking batch ${batchId}: Currently in transit, 3/5 checkpoints verified.`,
          followUp: [
            'Would you like to see the GPS route?',
            'Should I notify you upon delivery?'
          ]
        }
      
      default:
        return {
          success: false,
          message: 'Please specify what you would like to track.'
        }
    }
  } catch (error) {
    console.error('TraceBot action error:', error)
    return {
      success: false,
      message: 'An error occurred while tracking your batch. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function executeRouteGenAction(
  action: string,
  parameters: any,
  context: AgentContext
): Promise<ActionResult> {
  try {
    switch (action) {
      case 'optimize_route':
        const stops = parameters?.stops || 5
        
        // Validate stops parameter
        if (stops < 1 || stops > 50) {
          return {
            success: false,
            message: 'Invalid number of stops. Please provide a number between 1 and 50.'
          }
        }
        
        return {
          success: true,
          data: {
            totalDistance: 67.8,
            estimatedTime: 4.5,
            fuelSaved: 12.3,
            co2Reduced: 18.7,
            optimizedStops: stops
          },
          message: `Route optimized! New route reduces distance by 23% and saves ${12.3}L of fuel.`,
          followUp: [
            'Would you like to see the detailed route?',
            'Should I send this to the driver app?',
            'Do you want to calculate the cost savings?'
          ]
        }
      
      default:
        return {
          success: false,
          message: 'Please specify the route optimization parameters.'
        }
    }
  } catch (error) {
    console.error('RouteGen action error:', error)
    return {
      success: false,
      message: 'An error occurred while optimizing your route. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function executeCarbonVerifierAction(
  action: string,
  parameters: any,
  context: AgentContext
): Promise<ActionResult> {
  try {
    switch (action) {
      case 'calculate_emissions_avoided':
        const tonnage = parameters?.tonnage || 10
        const wasteType = parameters?.wasteType || 'food-waste'
        
        // Validate tonnage
        if (tonnage < 0 || tonnage > 10000) {
          return {
            success: false,
            message: 'Invalid tonnage. Please provide a value between 0 and 10,000 tonnes.'
          }
        }
        
        // Validate waste type
        const validWasteTypes = ['food-waste', 'uco', 'mixed']
        if (!validWasteTypes.includes(wasteType)) {
          return {
            success: false,
            message: `Invalid waste type '${wasteType}'. Valid types are: ${validWasteTypes.join(', ')}`
          }
        }
        
        const emissionFactor = wasteType === 'food-waste' ? 2.1 : 2.8
        const creditsGenerated = tonnage * emissionFactor
        
        return {
          success: true,
          data: {
            tonnage,
            wasteType,
            emissionsAvoided: tonnage * emissionFactor,
            creditsGenerated,
            value: creditsGenerated * 32.50
          },
          message: `Verified: ${tonnage} tonnes of ${wasteType} diverted, generating ${creditsGenerated.toFixed(1)} GIRM credits worth £${(creditsGenerated * 32.50).toFixed(2)}.`,
          followUp: [
            'Would you like to mint these credits on-chain?',
            'Should I generate the verification certificate?',
            'Do you want to see the market price trends?'
          ]
        }
      
      default:
        return {
          success: false,
          message: 'Please specify the tonnage and waste type for verification.'
        }
    }
  } catch (error) {
    console.error('CarbonVerifier action error:', error)
    return {
      success: false,
      message: 'An error occurred while calculating carbon credits. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Helper function to parse action from user message
export function parseActionFromMessage(message: string): { action: string; parameters: any } {
  const lowerMessage = message.toLowerCase()
  
  // Extract numbers
  const numbers = message.match(/\d+/g)
  const firstNumber = numbers ? parseInt(numbers[0]) : undefined
  
  // Extract location
  const locationMatch = message.match(/in\s+(\w+)/i)
  const location = locationMatch ? locationMatch[1] : undefined
  
  // Parse different action patterns
  if (lowerMessage.includes('find') && lowerMessage.includes('processor')) {
    return {
      action: 'find_processors',
      parameters: {
        wasteType: lowerMessage.includes('uco') ? 'uco' : 'food-waste',
        location: location || 'UK'
      }
    }
  }
  
  if (lowerMessage.includes('track') || lowerMessage.includes('batch')) {
    const batchMatch = message.match(/WTN-\d{4}-\d{4}/i)
    return {
      action: 'track_batch',
      parameters: {
        batchId: batchMatch ? batchMatch[0] : undefined
      }
    }
  }
  
  if (lowerMessage.includes('optimize') && lowerMessage.includes('route')) {
    return {
      action: 'optimize_route',
      parameters: {
        stops: firstNumber || 5
      }
    }
  }
  
  if (lowerMessage.includes('calculate') && (lowerMessage.includes('carbon') || lowerMessage.includes('credit'))) {
    return {
      action: 'calculate_emissions_avoided',
      parameters: {
        tonnage: firstNumber || 10,
        wasteType: lowerMessage.includes('uco') ? 'uco' : 'food-waste'
      }
    }
  }
  
  return {
    action: 'general',
    parameters: {}
  }
}

async function executeSupportBotAction(
  action: string,
  parameters: any,
  context: AgentContext
): Promise<ActionResult> {
  switch (action) {
    case 'navigate_to_page':
      const query = parameters.query || ''
      const features = searchFeatures(query)
      
      if (features.length > 0) {
        let message = `I found these relevant pages for "${query}":\n\n`
        features.slice(0, 3).forEach(feature => {
          message += `**[${feature.name}](${feature.path})**\n`
          message += `${feature.description}\n\n`
        })
        
        return {
          success: true,
          data: features,
          message,
          followUp: [
            'Would you like me to explain how to use any of these features?',
            'Do you need help with something specific?'
          ]
        }
      } else {
        return {
          success: false,
          message: `I couldn't find pages matching "${query}". Try browsing our main sections:\n\n• [Dashboard](/dashboard)\n• [Marketplace](/marketplace)\n• [Collection](/collection)\n• [Logistics](/logistics)\n• [Carbon Credits](/carbon)`,
          followUp: [
            'What are you trying to accomplish?',
            'Would you like to see all available features?'
          ]
        }
      }
      
    case 'explain_feature':
      const featureName = parameters.feature || ''
      const feature = searchFeatures(featureName)[0]
      
      if (feature) {
        return {
          success: true,
          data: feature,
          message: `**${feature.name}**\n\n${feature.description}\n\nYou can access it here: [${feature.path}](${feature.path})\n\nThis feature is useful for ${feature.userTypes.join(', ')} users.`,
          followUp: [
            'Would you like me to guide you through using this feature?',
            'Do you have any specific questions about it?'
          ]
        }
      } else {
        return {
          success: false,
          message: 'Could you please specify which feature you\'d like to know about?'
        }
      }
      
    case 'troubleshoot_issue':
      const issue = parameters.issue || ''
      
      let troubleshootMessage = 'I can help you troubleshoot. '
      
      if (issue.includes('login') || issue.includes('sign')) {
        troubleshootMessage += 'For login issues:\n\n• Make sure you\'re using the correct email\n• Check if caps lock is on\n• Try resetting your password\n• Clear your browser cache\n\nYou can [login here](/login) or [register a new account](/register).'
      } else if (issue.includes('payment') || issue.includes('transaction')) {
        troubleshootMessage += 'For payment issues:\n\n• Check your wallet connection\n• Ensure sufficient balance\n• Try refreshing the page\n• Contact support if the issue persists\n\nVisit the [Treasury](/treasury) or [Dashboard](/dashboard) to check your balance.'
      } else {
        troubleshootMessage += 'Please describe your issue in more detail. Common areas I can help with:\n\n• Login and account access\n• Marketplace transactions\n• Waste tracking\n• Carbon credit calculations\n• DAO voting'
      }
      
      return {
        success: true,
        message: troubleshootMessage,
        followUp: [
          'Is this helping resolve your issue?',
          'Would you like to contact support directly?'
        ]
      }
      
    case 'guide_onboarding':
      return {
        success: true,
        message: `Welcome to ReLoop! Let me guide you through getting started:\n\n1. **[Join the Platform](/join)** - Choose your role (supplier, processor, collector, or investor)\n2. **[Complete Your Profile](/dashboard)** - Add your business details and certifications\n3. **[Take the Tutorial](/tutorial)** - Learn the platform basics (10 minutes)\n4. **[Browse the Marketplace](/marketplace)** - See available materials and processors\n5. **[Connect with AI Agents](/agents)** - Get specialized help for your needs\n\nWhich step would you like to start with?`,
        followUp: [
          'Should I walk you through the registration process?',
          'Would you like to know which role is best for you?',
          'Do you have specific questions about the platform?'
        ]
      }
      
    case 'search_documentation':
      const docQuery = parameters.query || action || ''
      
      // Search FAQs first
      const faqs = searchFAQs(docQuery)
      
      if (faqs.length > 0) {
        let message = `I found these FAQs that might help:\n\n`
        faqs.slice(0, 3).forEach(faq => {
          message += `**${faq.question}**\n${faq.answer}\n\n`
        })
        
        return {
          success: true,
          data: faqs,
          message,
          followUp: [
            'Would you like to see more FAQs?',
            'Do you need clarification on any of these answers?',
            'Should I help you with something specific?'
          ]
        }
      } else {
        return {
          success: false,
          message: `I couldn't find FAQs about "${docQuery}". Try rephrasing your question or visit our [FAQ section](/#faq) to browse all questions.`,
          followUp: [
            'Would you like to browse FAQs by category?',
            'Can I help you find a specific feature?'
          ]
        }
      }
      
    case 'find_relevant_agent':
      const need = parameters.need || ''
      let agentRecommendation = ''
      
      if (need.includes('match') || need.includes('processor')) {
        agentRecommendation = 'I recommend talking to **FeedstockMatcher** - they specialize in connecting waste suppliers with processors. [Chat with FeedstockMatcher](/agents)'
      } else if (need.includes('track') || need.includes('trace')) {
        agentRecommendation = 'You should speak with **TraceBot** - they handle all material tracking and chain of custody. [Chat with TraceBot](/agents)'
      } else if (need.includes('route') || need.includes('optimize')) {
        agentRecommendation = '**RouteGen** is perfect for route optimization and logistics planning. [Chat with RouteGen](/agents)'
      } else if (need.includes('carbon') || need.includes('credit')) {
        agentRecommendation = '**CarbonVerifier** can help with carbon credit calculations and verification. [Chat with CarbonVerifier](/agents)'
      } else {
        agentRecommendation = 'Here are our specialized agents:\n\n• **FeedstockMatcher** - Waste-to-processor matching\n• **TraceBot** - Material tracking\n• **RouteGen** - Route optimization\n• **CarbonVerifier** - Carbon credits\n• **ComplianceGuard** - Regulatory compliance\n\n[Visit the AI Agents page](/agents) to chat with any of them.'
      }
      
      return {
        success: true,
        message: agentRecommendation,
        followUp: [
          'Would you like me to explain what this agent can do?',
          'Do you have other tasks I can help with?'
        ]
      }
      
    default:
      // For general queries, search both FAQs and features
      const searchQuery = parameters.query || action
      const relevantFAQs = searchFAQs(searchQuery).slice(0, 2)
      const relevantFeatures = searchFeatures(searchQuery).slice(0, 2)
      
      if (relevantFAQs.length > 0 || relevantFeatures.length > 0) {
        let message = ''
        
        // Add FAQ results
        if (relevantFAQs.length > 0) {
          message += 'Here are relevant answers from our FAQ:\n\n'
          relevantFAQs.forEach(faq => {
            message += `**${faq.question}**\n${faq.answer}\n\n`
          })
        }
        
        // Add feature results
        if (relevantFeatures.length > 0) {
          message += 'These platform features might also help:\n\n'
          relevantFeatures.forEach(feature => {
            message += `• **[${feature.name}](${feature.path})** - ${feature.description}\n`
          })
        }
        
        return {
          success: true,
          data: { faqs: relevantFAQs, features: relevantFeatures },
          message,
          followUp: [
            'Would you like more information about any of these?',
            'Can I help you with something else?'
          ]
        }
      } else {
        return {
          success: true,
          message: 'I\'m here to help! You can ask me about:\n\n• Finding specific features or pages\n• Getting started on the platform\n• Troubleshooting issues\n• Understanding how things work\n• Connecting with the right AI agent\n\nWhat would you like help with?',
          followUp: [
            'Would you like to see all available features?',
            'Should I guide you through getting started?'
          ]
        }
      }
  }
}
