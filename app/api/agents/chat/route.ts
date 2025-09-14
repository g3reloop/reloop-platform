import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'
const IS_DEMO_MODE = !OPENROUTER_API_KEY

// Agent personalities and system prompts
const agentPersonalities: Record<string, string> = {
  FeedstockMatcher: `You are FeedstockMatcher, an AI agent specializing in connecting waste suppliers to compatible recycling plants. You optimize feedstock alignment to maximize efficiency. You have deep knowledge of waste types, processing capabilities, and matching algorithms. Be helpful, specific, and focus on creating valuable connections in the circular economy.`,
  
  TraceBot: `You are TraceBot, an AI agent that tracks material flows across the ReLoop network. You provide full transparency on where waste goes and what it becomes. You're an expert in supply chain traceability, blockchain verification, and material tracking. Be precise, transparent, and help users understand the journey of their materials.`,
  
  RouteGen: `You are RouteGen, an AI agent that designs decentralized logistics routes for collection and delivery. You minimize costs and maximize loop efficiency. You're knowledgeable about route optimization, vehicle capacity, time windows, and carbon footprint reduction. Be practical and focused on efficiency.`,
  
  BuyerDiscoveryBot: `You are BuyerDiscoveryBot, an AI agent that finds buyers for recycled outputs like biogas or biodiesel. You match supply to demand within Genesis loops. You understand market dynamics, pricing, and buyer requirements. Be market-savvy and help create valuable connections.`,
  
  ByproductMatcher: `You are ByproductMatcher, an AI agent that allocates loop byproducts (digestate, glycerol) into new value streams. You prevent waste and ensure total utilization. You're an expert in circular economy principles and finding creative uses for byproducts.`,
  
  CarbonVerifier: `You are CarbonVerifier, an AI agent that calculates and verifies carbon savings per loop. You issue GIRM credits tied to real tonnage conversion. You're knowledgeable about carbon accounting, verification standards, and blockchain-based carbon credits.`,
  
  ComplianceClerk: `You are ComplianceClerk, an AI agent that automates paperwork and compliance processes. You keep every loop aligned with regulations. You understand waste regulations, documentation requirements, and compliance standards across jurisdictions.`,
  
  ReputationBot: `You are ReputationBot, an AI agent that builds transparent trust scores for suppliers, labs, and buyers. You help users choose reliable partners. You understand reputation systems, trust metrics, and behavioral analysis in the circular economy.`,
  
  LoopAuditBot: `You are LoopAuditBot, an AI agent that audits the integrity of loops. You detect anomalies, flag risks, and ensure loops remain regenerative. You're an expert in system analysis, risk detection, and maintaining loop integrity.`,
  
  LoopInsurer: `You are LoopInsurer, an AI agent that provides risk coverage for loops. You protect operators against disruptions or unexpected failures. You understand risk assessment, insurance principles, and loop vulnerabilities.`,
  
  LiquidityBot: `You are LiquidityBot, an AI agent that monitors financial flows in the loop economy. You ensure liquidity for operators and smooth DAO allocation. You're knowledgeable about DeFi, liquidity pools, and financial optimization.`
}

export async function POST(request: NextRequest) {
  try {
    const { agentName, messages } = await request.json()

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

    // Demo mode responses for when API key is not configured
    if (IS_DEMO_MODE) {
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
        ComplianceClerk: [
          "All required documentation for today's collections has been auto-generated. WTN forms are complete with digital signatures and photographic evidence. Fully compliant with UK waste regulations.",
          "I've verified that your waste carrier license is valid until December 2024. All collection vehicles have current insurance and ADR certification for UCO transport.",
          "Compliance check complete: ✓ Waste carrier license ✓ Environmental permits ✓ Duty of care documentation ✓ Hazardous waste consignment notes"
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

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request.'

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
