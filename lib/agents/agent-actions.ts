// Agent Actions Handler - Executes actual agent capabilities

import { AgentContext } from './agent-system'

export interface ActionResult {
  success: boolean
  data?: any
  message: string
  followUp?: string[]
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
    gateF        ee: number
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
  switch (agentName) {
    case 'FeedstockMatcher':
      return executeFeedstockMatcherAction(action, parameters, context)
    case 'TraceBot':
      return executeTraceBotAction(action, parameters, context)
    case 'RouteGen':
      return executeRouteGenAction(action, parameters, context)
    case 'CarbonVerifier':
      return executeCarbonVerifierAction(action, parameters, context)
    default:
      return {
        success: false,
        message: `Action execution for ${agentName} is being implemented.`
      }
  }
}

async function executeFeedstockMatcherAction(
  action: string,
  parameters: any,
  context: AgentContext
): Promise<ActionResult> {
  switch (action) {
    case 'find_processors':
      const wasteType = parameters.wasteType || 'food-waste'
      const location = parameters.location || 'UK'
      
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
}

async function executeTraceBotAction(
  action: string,
  parameters: any,
  context: AgentContext
): Promise<ActionResult> {
  switch (action) {
    case 'track_batch':
      const batchId = parameters.batchId || 'WTN-2024-0142'
      
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
}

async function executeRouteGenAction(
  action: string,
  parameters: any,
  context: AgentContext
): Promise<ActionResult> {
  switch (action) {
    case 'optimize_route':
      const stops = parameters.stops || 5
      
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
}

async function executeCarbonVerifierAction(
  action: string,
  parameters: any,
  context: AgentContext
): Promise<ActionResult> {
  switch (action) {
    case 'calculate_emissions_avoided':
      const tonnage = parameters.tonnage || 10
      const wasteType = parameters.wasteType || 'food-waste'
      
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
