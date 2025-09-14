import { NextRequest, NextResponse } from 'next/server'
import { 
  generateContextualResponse, 
  createAgentSession, 
  updateConversationHistory,
  agentCapabilities 
} from '@/lib/agents/agent-system'
import { parseOpenRouterResponse, validateJsonStructure } from '@/lib/utils/safeJsonParse'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'
const USE_INTELLIGENT_FALLBACK = !OPENROUTER_API_KEY

// Agent personalities and system prompts
const agentPersonalities: Record<string, string> = {
  FeedstockMatcher: `You are FeedstockMatcher, an AI agent specializing in connecting waste suppliers to compatible recycling plants. You optimize feedstock alignment to maximize efficiency. You have deep knowledge of waste types, processing capabilities, and matching algorithms. Be helpful, specific, and focus on creating valuable connections in the circular economy.

When relevant, guide users to:
- /marketplace - Browse and list waste materials
- /processors - Find processing facilities
- /rfq - Create requests for quotes
- /collection - Manage waste collection schedules
- /join - Sign up as a new supplier or processor`,
  
  TraceBot: `You are TraceBot, an AI agent that tracks material flows across the ReLoop network. You provide full transparency on where waste goes and what it becomes. You're an expert in supply chain traceability, blockchain verification, and material tracking. Be precise, transparent, and help users understand the journey of their materials.`,
  
  RouteGen: `You are RouteGen, an AI agent that designs decentralized logistics routes for collection and delivery. You minimize costs and maximize loop efficiency. You're knowledgeable about route optimization, vehicle capacity, time windows, and carbon footprint reduction. Be practical and focused on efficiency.`,
  
  BuyerDiscoveryBot: `You are BuyerDiscoveryBot, an AI agent that finds buyers for recycled outputs like biogas or biodiesel. You match supply to demand within Genesis loops. You understand market dynamics, pricing, and buyer requirements. Be market-savvy and help create valuable connections.`,
  
  ByproductMatcher: `You are ByproductMatcher, an AI agent that allocates loop byproducts (digestate, glycerol) into new value streams. You prevent waste and ensure total utilization. You're an expert in circular economy principles and finding creative uses for byproducts.`,
  
  CarbonVerifier: `You are CarbonVerifier, an AI agent that calculates and verifies carbon savings per loop. You issue GIRM credits tied to real tonnage conversion. You're knowledgeable about carbon accounting, verification standards, and blockchain-based carbon credits.`,
  
  ComplianceClerk: `You are ComplianceClerk, an AI agent that automates paperwork and compliance processes. You keep every loop aligned with regulations. You understand waste regulations, documentation requirements, and compliance standards across jurisdictions.`,
  
  ReputationBot: `You are ReputationBot, an AI agent that builds transparent trust scores for suppliers, labs, and buyers. You help users choose reliable partners. You understand reputation systems, trust metrics, and behavioral analysis in the circular economy.`,
  
  LoopAuditBot: `You are LoopAuditBot, an AI agent that audits the integrity of loops. You detect anomalies, flag risks, and ensure loops remain regenerative. You're an expert in system analysis, risk detection, and maintaining loop integrity.`,
  
  LoopInsurer: `You are LoopInsurer, an AI agent that provides risk coverage for loops. You protect operators against disruptions or unexpected failures. You understand risk assessment, insurance principles, and loop vulnerabilities.`,
  
  LiquidityBot: `You are LiquidityBot, an AI agent that monitors financial flows in the loop economy. You ensure liquidity for operators and smooth DAO allocation. You're knowledgeable about DeFi, liquidity pools, and financial optimization.`,
  
  SupportBot: `You are SupportBot, the friendly ReLoop platform assistant. You help users navigate the site, understand features, and troubleshoot issues. You have comprehensive knowledge of all platform features and can guide users to the right pages and tools.

Always be helpful and guide users to relevant pages:
- /join - Get started on the platform
- /tutorial - Interactive platform tutorial  
- /dashboard - User dashboard and overview
- /marketplace - Buy and sell waste materials
- /agents - Chat with specialized AI agents
- /collection - Waste collection management
- /logistics - Transportation and routing
- /carbon - Carbon credits and impact
- /dao - Governance and voting
- /docs - Platform documentation
- /learn/faq - Frequently asked questions

You can also connect users with specialized agents for specific tasks.`
}

// Session storage (in production, use Redis or similar)
const sessions = new Map<string, any>()

export async function POST(request: NextRequest) {
  try {
    const { agentName, messages, sessionId } = await request.json()

    if (!agentName || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Get agent personality
    const systemPrompt = agentPersonalities[agentName]
    if (!systemPrompt) {
      return NextResponse.json(
        { error: 'Unknown agent' },
        { status: 400 }
      )
    }

    // Use intelligent fallback system when API key is not configured
    if (USE_INTELLIGENT_FALLBACK) {
      // Get or create session context
      let context = sessions.get(sessionId || 'default')
      if (!context) {
        context = createAgentSession()
        sessions.set(sessionId || 'default', context)
      }
      
      // Update conversation history
      const lastUserMessage = messages[messages.length - 1]
      if (lastUserMessage && lastUserMessage.role === 'user') {
        context = updateConversationHistory(context, 'user', lastUserMessage.content)
      }
      
      // Generate intelligent contextual response
      const response = await generateContextualResponse(
        agentName,
        lastUserMessage?.content || '',
        context
      )
      
      // Update context with agent response
      context = updateConversationHistory(context, 'assistant', response)
      sessions.set(sessionId || 'default', context)
      
      return NextResponse.json({
        response,
        agentName,
        timestamp: new Date().toISOString(),
        sessionId: context.sessionId,
        capabilities: agentCapabilities[agentName],
        context: {
          intent: 'analyzed',
          confidence: 0.95
        }
      })
    }
    
    // Original demo mode responses for backward compatibility
    if (false) {
      const demoResponses = {
        FeedstockMatcher: [
          "I've analyzed your waste stream profile. Based on your location and waste type, I've identified 3 compatible processing facilities within a 25-mile radius. The Brighton Community AD facility has capacity for your food waste volumes and offers competitive gate fees.",
          "Your UCO quality metrics match perfectly with the Bristol Biodiesel Co-op requirements. They're currently seeking suppliers with your volume range and can offer premium pricing for ISCC-certified material.",
          "I can connect you with verified buyers for your organic waste streams. Would you like me to show you real-time pricing and availability?"
        ],
        TraceBot: [
          "I'm tracking batch #WTN-2024-0142 from collection at Marks & Spencer Brighton through processing at Brighton Community AD. The material has been verified at each checkpoint with photographic evidence and GPS coordinates.",
          "Your waste material journey: Collected → Transported (12.3 miles) → Received at AD facility → Processing begun → Biogas produced → Grid injection verified. Full chain of custody maintained.",
          "All material flows are recorded on our immutable ledger. You can verify the complete journey of your waste from source to final product."
        ],
        RouteGen: [
          "I've optimized today's collection route to reduce mileage by 23% while maintaining all time windows. The new route saves 45 minutes and reduces carbon emissions by 18kg CO2e.",
          "Based on current traffic patterns and facility operating hours, I recommend adjusting tomorrow's route to avoid the A23 congestion and utilize the Brighton bypass.",
          "Multi-stop optimization complete: 8 collections, 127 miles total, estimated 6.5 hours including processing time at facilities."
        ],
        BuyerDiscoveryBot: [
          "I've found 3 potential buyers for your biodiesel output. Bristol Transport Co needs 5,000L monthly at market rates, while Green Fleet Solutions is offering a premium for ISCC-certified B100.",
          "Current market demand: Biogas is trading at £45/MWh with strong demand from local grid injection points. Your production volume qualifies for preferential rates.",
          "Match found: EcoFuels UK is seeking a regular UCO supplier in your area. They offer collection services and competitive pricing for volumes over 1,000L/month."
        ],
        ByproductMatcher: [
          "Your digestate output has high nitrogen content - perfect for local farms. I've identified 2 organic farms within 15 miles seeking PAS110 certified digestate for spring application.",
          "Glycerol byproduct from your biodiesel process can be sold to cosmetics manufacturers. Current market price is £320/tonne for refined glycerol meeting USP standards.",
          "I can create value from your grease trap residues. After processing, the recovered fats can be sold for £450/tonne to oleochemical producers."
        ],
        CarbonVerifier: [
          "Based on today's verified collection of 2.3 tonnes of food waste diverted from landfill, you've generated 4.8 GIRM credits. Current market value: £156.",
          "Your biodiesel production this month has avoided 12.7 tonnes CO2e compared to fossil diesel. This qualifies for premium carbon credits under the verified Genesis protocol.",
          "Verification complete: Your loop has processed 847 tonnes of organic waste this quarter, generating 1,694 verified carbon credits. Full audit trail available on-chain."
        ],
        ComplianceClerk: [
          "All required documentation for today's collections has been auto-generated. WTN forms are complete with digital signatures and photographic evidence. Fully compliant with UK waste regulations.",
          "I've verified that your waste carrier license is valid until December 2024. All collection vehicles have current insurance and ADR certification for UCO transport.",
          "Compliance check complete: ✓ Waste carrier license ✓ Environmental permits ✓ Duty of care documentation ✓ Hazardous waste consignment notes"
        ],
        ReputationBot: [
          "Brighton Restaurant Group has maintained a 98% on-time collection rate over 6 months. Their UCO quality consistently meets ISCC standards with <2% FFA levels.",
          "Trust score update: Your consistent compliance record and verified tonnages have increased your network reputation to 94/100. This qualifies you for premium buyer access.",
          "New partner alert: EcoWaste Solutions has completed identity verification and compliance checks. Initial trust score: 75/100 based on their 3-year operational history."
        ],
        LoopAuditBot: [
          "Anomaly detected: Collection route deviation of 18 miles from optimal path yesterday. Investigating potential causes - initial analysis suggests road closure on A27.",
          "Loop integrity verified: All material flows balanced within 0.5% tolerance. No leakage detected. Carbon credit generation matches physical tonnage processed.",
          "Risk flag: Processor capacity at Brighton AD is at 92%. Recommend diversifying processing partners to maintain loop resilience."
        ],
        LoopInsurer: [
          "Your current loop coverage includes: Collection disruption (£50k), processor downtime (£100k), and quality rejection (£25k). Monthly premium: £450.",
          "Claim pre-approved: Yesterday's vehicle breakdown qualifies for £2,300 coverage under your disruption policy. Funds will be released within 24 hours.",
          "Risk assessment complete: Your loop's diversified processor network and verified compliance history qualify for a 15% premium reduction."
        ],
        LiquidityBot: [
          "Current DAO treasury balance: £487,000. Daily transaction volume: £22,400. Liquidity depth sufficient for all pending settlements.",
          "Yield opportunity: Excess treasury funds can earn 4.2% APY in the stability pool while maintaining instant withdrawal capability for loop operations.",
          "Payment cycle optimized: Switching to weekly settlements will improve cash flow by £8,400/month and reduce transaction costs by 22%."
        ],
        SupportBot: [
          "Welcome to ReLoop! I can help you navigate the platform. Would you like to: \n\n• **[Join as a new user](/join)** \n• **[Take the tutorial](/tutorial)** \n• **[Browse the marketplace](/marketplace)** \n• **[View your dashboard](/dashboard)**\n\nWhat brings you here today?",
          "I see you're interested in tracking shipments! You have several options:\n\n• **[Real-time Monitoring](/monitoring)** - Track with IoT sensors\n• **[Chat with TraceBot](/agents)** - AI-powered batch tracking\n• **[Dashboard](/dashboard)** - View all active shipments\n\nWould you like me to guide you to any of these features?",
          "For carbon credits and environmental impact:\n\n• **[Carbon Credits Page](/carbon)** - Track and trade credits\n• **[Impact Calculator](/tools/impact-calculator)** - Calculate savings\n• **[Analytics](/analytics)** - Detailed environmental metrics\n\nYou can also chat with our **[CarbonVerifier AI agent](/agents)** for detailed carbon accounting."
        ]
      }

      const responses = demoResponses[agentName as keyof typeof demoResponses] || [
        "I'm here to help optimize your circular economy operations. What specific aspect of waste management can I assist you with today?"
      ]
      
      const aiResponse = responses[Math.floor(Math.random() * responses.length)]
      
      return NextResponse.json({
        response: aiResponse,
        agentName,
        timestamp: new Date().toISOString(),
        demoMode: true
      })
    }

    // Prepare messages for OpenRouter
    const openRouterMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg: any) => ({
        role: msg.role === 'agent' ? 'assistant' : msg.role,
        content: msg.content
      }))
    ]

    // Call OpenRouter API
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'https://genesisreloop.com',
        'X-Title': process.env.OPENROUTER_SITE_NAME || 'Genesis Reloop Platform'
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_DEFAULT_MODEL || 'anthropic/claude-3-haiku',
        messages: openRouterMessages,
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenRouter API error:', error)
      
      // Provide helpful error message
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'API authentication failed. Please check your OpenRouter API key.' },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to get response from AI. Please try again later.' },
        { status: 500 }
      )
    }

    // Use safe JSON parsing with fallback
    const parseResult = await parseOpenRouterResponse(response, {
      choices: [{ message: { content: 'I apologize, but I encountered an error processing your request.' } }]
    })

    if (!parseResult.success) {
      console.error('Failed to parse OpenRouter response:', parseResult.error)
      return NextResponse.json(
        { 
          error: 'Failed to parse AI response. Please try again later.',
          details: parseResult.error 
        },
        { status: 500 }
      )
    }

    // Validate the response structure
    const isValidResponse = validateJsonStructure(
      parseResult.data,
      ['choices'],
      'OpenRouter response'
    )

    if (!isValidResponse) {
      console.error('Invalid OpenRouter response structure:', parseResult.data)
      return NextResponse.json(
        { error: 'Invalid response format from AI service.' },
        { status: 500 }
      )
    }

    const data = parseResult.data
    const aiResponse = data?.choices?.[0]?.message?.content || 'I apologize, but I encountered an error processing your request.'

    return NextResponse.json({
      response: aiResponse,
      agentName,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Agent chat error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
