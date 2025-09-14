import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'

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
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
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
