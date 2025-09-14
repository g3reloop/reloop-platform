// Agent System Configuration and Intelligence Layer

import { getAgentRelevantFeatures, searchFeatures, SiteFeature } from './site-context'

export interface AgentCapability {
  name: string
  description: string
  actions: string[]
  dataAccess: string[]
  integrations: string[]
}

export interface AgentContext {
  userId?: string
  sessionId: string
  conversationHistory: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>
  userProfile?: {
    type: 'supplier' | 'processor' | 'buyer' | 'logistics'
    location?: string
    capabilities?: string[]
    certifications?: string[]
  }
  currentLoopData?: {
    activeLoops: number
    totalVolume: number
    carbonCredits: number
  }
  siteFeatures?: SiteFeature[]
}

export const agentCapabilities: Record<string, AgentCapability> = {
  FeedstockMatcher: {
    name: 'FeedstockMatcher',
    description: 'Connects waste suppliers to compatible recycling plants',
    actions: [
      'analyze_waste_stream',
      'find_processors',
      'calculate_compatibility_score',
      'suggest_optimal_matches',
      'estimate_gate_fees'
    ],
    dataAccess: [
      'processor_database',
      'waste_specifications',
      'pricing_data',
      'capacity_availability'
    ],
    integrations: [
      'marketplace_api',
      'compliance_system',
      'routing_engine'
    ]
  },
  
  TraceBot: {
    name: 'TraceBot',
    description: 'Tracks material flows with full transparency',
    actions: [
      'track_batch',
      'verify_chain_of_custody',
      'generate_audit_trail',
      'validate_evidence',
      'create_transparency_report'
    ],
    dataAccess: [
      'blockchain_ledger',
      'gps_tracking',
      'photo_evidence',
      'wtn_database'
    ],
    integrations: [
      'iot_sensors',
      'blockchain_api',
      'evidence_storage'
    ]
  },
  
  RouteGen: {
    name: 'RouteGen',
    description: 'Optimizes collection and delivery routes',
    actions: [
      'optimize_route',
      'calculate_emissions',
      'predict_traffic',
      'schedule_collections',
      'minimize_distance'
    ],
    dataAccess: [
      'traffic_data',
      'vehicle_fleet',
      'collection_points',
      'time_windows'
    ],
    integrations: [
      'maps_api',
      'traffic_api',
      'fleet_management',
      'weather_api'
    ]
  },
  
  BuyerDiscoveryBot: {
    name: 'BuyerDiscoveryBot',
    description: 'Matches recycled outputs to buyers',
    actions: [
      'identify_buyers',
      'analyze_demand',
      'negotiate_pricing',
      'match_specifications',
      'forecast_market'
    ],
    dataAccess: [
      'buyer_database',
      'market_prices',
      'demand_patterns',
      'quality_requirements'
    ],
    integrations: [
      'marketplace_api',
      'pricing_engine',
      'contract_system'
    ]
  },
  
  ByproductMatcher: {
    name: 'ByproductMatcher',
    description: 'Finds value streams for byproducts',
    actions: [
      'analyze_composition',
      'identify_applications',
      'calculate_value',
      'match_to_industries',
      'optimize_utilization'
    ],
    dataAccess: [
      'chemical_analysis',
      'industry_needs',
      'byproduct_markets',
      'quality_standards'
    ],
    integrations: [
      'lab_systems',
      'industry_database',
      'quality_control'
    ]
  },
  
  CarbonVerifier: {
    name: 'CarbonVerifier',
    description: 'Calculates and verifies carbon savings',
    actions: [
      'calculate_emissions_avoided',
      'verify_tonnage',
      'issue_credits',
      'track_lifecycle',
      'generate_certificates'
    ],
    dataAccess: [
      'emission_factors',
      'tonnage_data',
      'processing_records',
      'baseline_data'
    ],
    integrations: [
      'carbon_registry',
      'blockchain_api',
      'verification_system'
    ]
  },
  
  ComplianceClerk: {
    name: 'ComplianceClerk',
    description: 'Automates regulatory compliance',
    actions: [
      'generate_documentation',
      'check_regulations',
      'file_reports',
      'track_licenses',
      'audit_compliance'
    ],
    dataAccess: [
      'regulation_database',
      'license_registry',
      'compliance_history',
      'document_templates'
    ],
    integrations: [
      'government_apis',
      'document_system',
      'notification_service'
    ]
  },
  
  ReputationBot: {
    name: 'ReputationBot',
    description: 'Builds trust scores for network participants',
    actions: [
      'calculate_trust_score',
      'verify_credentials',
      'track_performance',
      'flag_issues',
      'recommend_partners'
    ],
    dataAccess: [
      'performance_metrics',
      'verification_records',
      'feedback_data',
      'compliance_scores'
    ],
    integrations: [
      'verification_services',
      'feedback_system',
      'blockchain_reputation'
    ]
  },
  
  LoopAuditBot: {
    name: 'LoopAuditBot',
    description: 'Ensures loop integrity and detects anomalies',
    actions: [
      'audit_material_flow',
      'detect_anomalies',
      'verify_balances',
      'assess_risks',
      'recommend_improvements'
    ],
    dataAccess: [
      'flow_data',
      'sensor_readings',
      'historical_patterns',
      'risk_indicators'
    ],
    integrations: [
      'iot_network',
      'analytics_engine',
      'alert_system'
    ]
  },
  
  LoopInsurer: {
    name: 'LoopInsurer',
    description: 'Provides risk coverage for operations',
    actions: [
      'assess_risk',
      'calculate_premiums',
      'process_claims',
      'monitor_coverage',
      'optimize_policies'
    ],
    dataAccess: [
      'risk_models',
      'claims_history',
      'coverage_data',
      'incident_reports'
    ],
    integrations: [
      'insurance_system',
      'risk_analytics',
      'payment_gateway'
    ]
  },
  
  LiquidityBot: {
    name: 'LiquidityBot',
    description: 'Manages financial flows and treasury',
    actions: [
      'monitor_liquidity',
      'optimize_treasury',
      'manage_settlements',
      'forecast_cashflow',
      'recommend_yield_strategies'
    ],
    dataAccess: [
      'treasury_balance',
      'transaction_data',
      'market_rates',
      'settlement_queue'
    ],
    integrations: [
      'defi_protocols',
      'banking_apis',
      'settlement_system'
    ]
  },
  
  SupportBot: {
    name: 'SupportBot',
    description: 'Your friendly ReLoop platform assistant for navigation and support',
    actions: [
      'navigate_to_page',
      'explain_feature',
      'troubleshoot_issue',
      'guide_onboarding',
      'find_relevant_agent',
      'search_documentation'
    ],
    dataAccess: [
      'site_structure',
      'feature_documentation',
      'common_issues',
      'agent_capabilities',
      'user_guides'
    ],
    integrations: [
      'navigation_system',
      'documentation_api',
      'agent_registry'
    ]
  }
}

import { executeAgentAction, parseActionFromMessage } from './agent-actions'

// Context-aware response generation
export async function generateContextualResponse(
  agentName: string,
  userMessage: string,
  context: AgentContext
): Promise<string> {
  const capability = agentCapabilities[agentName]
  if (!capability) {
    return "I'm not sure which agent you're trying to reach. Please try again."
  }
  
  // Add site context for the agent
  if (!context.siteFeatures) {
    context.siteFeatures = getAgentRelevantFeatures(agentName)
  }

  // Parse action from message
  const { action, parameters } = parseActionFromMessage(userMessage)
  
  // Try to execute action if it's not general
  if (action !== 'general') {
    try {
      const result = await executeAgentAction(agentName, action, parameters, context)
      if (result.success) {
        let response = result.message
        
        // Add data visualization if available
        if (result.data) {
          if (Array.isArray(result.data)) {
            response += '\n\n'
            result.data.forEach((item: any, idx: number) => {
              response += `${idx + 1}. **${item.name}**\n`
              response += `   Location: ${item.location}\n`
              if (item.capacity) response += `   Capacity: ${item.capacity.toLocaleString()} tonnes/year\n`
              if (item.gateFee !== undefined) response += `   Gate Fee: £${item.gateFee}/tonne\n`
              if (item.certifications) response += `   Certifications: ${item.certifications.join(', ')}\n`
              response += '\n'
            })
          }
        }
        
        // Add follow-up suggestions
        if (result.followUp && result.followUp.length > 0) {
          response += '\n**What would you like to do next?**\n'
          result.followUp.forEach((suggestion: string) => {
            response += `• ${suggestion}\n`
          })
        }
        
        return response
      }
    } catch (error) {
      console.error('Action execution error:', error)
    }
  }

  // Fall back to intent-based response
  const intent = analyzeIntent(userMessage, capability)
  return buildIntelligentResponse(agentName, intent, context)
}

function analyzeIntent(message: string, capability: AgentCapability): string {
  const lowerMessage = message.toLowerCase()
  
  // Check for specific action keywords
  for (const action of capability.actions) {
    const actionWords = action.split('_')
    if (actionWords.some(word => lowerMessage.includes(word))) {
      return action
    }
  }
  
  // Default intents
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return 'help'
  }
  
  if (lowerMessage.includes('status') || lowerMessage.includes('update')) {
    return 'status'
  }
  
  return 'general'
}

function buildIntelligentResponse(
  agentName: string,
  intent: string,
  context: AgentContext
): string {
  const capability = agentCapabilities[agentName]
  
  // Help responses
  if (intent === 'help') {
    return `I'm ${agentName}, specialized in ${capability.description}. I can help you with:\n\n` +
      capability.actions.map(action => `• ${action.replace(/_/g, ' ')}`).join('\n') +
      `\n\nWhat would you like me to help you with today?`
  }
  
  // Status responses
  if (intent === 'status') {
    if (context.currentLoopData) {
      return `Here's your current loop status:\n\n` +
        `• Active loops: ${context.currentLoopData.activeLoops}\n` +
        `• Total volume processed: ${context.currentLoopData.totalVolume} tonnes\n` +
        `• Carbon credits generated: ${context.currentLoopData.carbonCredits}\n\n` +
        `How can I help optimize your operations?`
    }
    return `I'll need to access your loop data to provide a status update. Please ensure you're connected to the network.`
  }
  
  // Agent-specific intelligent responses
  return getAgentSpecificResponse(agentName, intent, context)
}

function getAgentSpecificResponse(
  agentName: string,
  intent: string,
  context: AgentContext
): string {
  // This would be enhanced with actual AI integration
  const responses: Record<string, Record<string, string>> = {
    FeedstockMatcher: {
      analyze_waste_stream: "I'll analyze your waste stream characteristics. Please provide details about waste type, volume, frequency, and quality parameters.",
      find_processors: "Searching for compatible processors in your area. I'll consider capacity, certifications, and gate fees.",
      general: "I can help match your waste streams with the most suitable processors. What type of waste are you looking to process?"
    },
    TraceBot: {
      track_batch: "Please provide the batch ID or WTN number you'd like to track.",
      verify_chain_of_custody: "I'll verify the complete chain of custody for your material. This includes all checkpoints, evidence, and timestamps.",
      general: "I ensure complete transparency in material flows. Would you like to track a specific batch or view your recent transfers?"
    },
    RouteGen: {
      optimize_route: "I'll optimize your collection route considering time windows, vehicle capacity, and traffic patterns.",
      calculate_emissions: "Calculating emissions for your routes and identifying reduction opportunities.",
      general: "I optimize logistics to minimize costs and environmental impact. How many stops do you need to plan for?"
    },
    CarbonVerifier: {
      calculate_emissions_avoided: "I'll calculate the emissions avoided by your waste diversion activities.",
      issue_credits: "Verifying tonnage and calculating GIRM credits for your verified material.",
      general: "I verify carbon savings and issue credits for your circular economy activities. What material volumes would you like verified?"
    }
  }

  const agentResponses = responses[agentName] || {}
  return agentResponses[intent] || agentResponses.general || 
    `I'm ${agentName}, ready to assist with ${agentCapabilities[agentName].description}. How can I help you?`
}

// Export utility functions for session management
export function createAgentSession(userId?: string): AgentContext {
  return {
    userId,
    sessionId: generateSessionId(),
    conversationHistory: [],
    currentLoopData: {
      activeLoops: 12,
      totalVolume: 847,
      carbonCredits: 1694
    }
  }
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function updateConversationHistory(
  context: AgentContext,
  role: 'user' | 'assistant',
  content: string
): AgentContext {
  return {
    ...context,
    conversationHistory: [
      ...context.conversationHistory,
      {
        role,
        content,
        timestamp: new Date()
      }
    ]
  }
}
