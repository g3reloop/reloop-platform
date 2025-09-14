// Site Context for AI Agents - Complete Platform Knowledge Base

export interface SiteFeature {
  path: string
  name: string
  description: string
  keywords: string[]
  userTypes: string[]
  relatedAgents: string[]
}

export interface SiteSection {
  name: string
  description: string
  features: SiteFeature[]
}

export const siteContext: SiteSection[] = [
  {
    name: "Core Platform",
    description: "Main platform features for waste management and circular economy",
    features: [
      {
        path: "/",
        name: "Home",
        description: "Main landing page with overview of ReLoop platform, hero section, and quick access to key features",
        keywords: ["home", "start", "overview", "landing"],
        userTypes: ["all"],
        relatedAgents: ["SupportBot"]
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        description: "User dashboard showing waste tracking, transactions, carbon credits, and real-time analytics",
        keywords: ["dashboard", "overview", "stats", "analytics", "metrics"],
        userTypes: ["supplier", "processor", "collector"],
        relatedAgents: ["InsightEngine", "CarbonVerifier", "TraceBot"]
      },
      {
        path: "/marketplace",
        name: "Marketplace",
        description: "Buy and sell waste materials, browse listings, create offers, manage transactions",
        keywords: ["marketplace", "buy", "sell", "trade", "listings", "offers"],
        userTypes: ["all"],
        relatedAgents: ["FeedstockMatcher", "BuyerBot", "PriceOptimax"]
      },
      {
        path: "/agents",
        name: "AI Agents",
        description: "Interactive AI agents for various platform functions - matching, routing, compliance, etc.",
        keywords: ["ai", "agents", "bots", "automation", "assistance"],
        userTypes: ["all"],
        relatedAgents: ["all"]
      }
    ]
  },
  {
    name: "Waste Management",
    description: "Features for waste collection, processing, and tracking",
    features: [
      {
        path: "/collection",
        name: "Collection Management",
        description: "Schedule and manage waste collection, track pickups, optimize routes",
        keywords: ["collection", "pickup", "schedule", "waste collection"],
        userTypes: ["collector", "supplier"],
        relatedAgents: ["RouteGen", "FeedstockMatcher"]
      },
      {
        path: "/processors",
        name: "Processors",
        description: "Find and connect with waste processors, view capabilities and certifications",
        keywords: ["processors", "processing", "facilities", "treatment"],
        userTypes: ["supplier", "processor"],
        relatedAgents: ["FeedstockMatcher", "ComplianceGuard"]
      },
      {
        path: "/logistics",
        name: "Logistics Hub",
        description: "Manage transportation, carriers, and delivery tracking",
        keywords: ["logistics", "transport", "shipping", "delivery", "carriers"],
        userTypes: ["all"],
        relatedAgents: ["RouteGen", "TraceBot"]
      },
      {
        path: "/logistics/route-planner",
        name: "Route Planner",
        description: "AI-powered route optimization for waste collection and delivery",
        keywords: ["routes", "routing", "optimization", "planning", "navigation"],
        userTypes: ["collector", "carrier"],
        relatedAgents: ["RouteGen"]
      }
    ]
  },
  {
    name: "Tracking & Compliance",
    description: "Traceability, monitoring, and regulatory compliance features",
    features: [
      {
        path: "/monitoring",
        name: "Real-time Monitoring",
        description: "Live tracking of waste streams, IoT sensor data, and system alerts",
        keywords: ["monitoring", "tracking", "sensors", "iot", "real-time"],
        userTypes: ["all"],
        relatedAgents: ["TraceBot", "InsightEngine"]
      },
      {
        path: "/compliance",
        name: "Compliance Center",
        description: "Regulatory compliance, documentation, certifications, and audit trails",
        keywords: ["compliance", "regulations", "documents", "audit", "legal"],
        userTypes: ["all"],
        relatedAgents: ["ComplianceGuard", "RiskShield"]
      },
      {
        path: "/reputation",
        name: "Reputation System",
        description: "View and manage reputation scores, reviews, and trust metrics",
        keywords: ["reputation", "trust", "scores", "reviews", "ratings"],
        userTypes: ["all"],
        relatedAgents: ["ReputeX"]
      }
    ]
  },
  {
    name: "Environmental Impact",
    description: "Carbon credits, sustainability metrics, and environmental impact tracking",
    features: [
      {
        path: "/carbon",
        name: "Carbon Credits",
        description: "Track carbon savings, generate credits, trade on carbon markets",
        keywords: ["carbon", "credits", "emissions", "sustainability", "green"],
        userTypes: ["all"],
        relatedAgents: ["CarbonVerifier", "InsightEngine"]
      },
      {
        path: "/tools/impact-calculator",
        name: "Impact Calculator",
        description: "Calculate environmental impact, carbon savings, and sustainability metrics",
        keywords: ["calculator", "impact", "environment", "savings", "metrics"],
        userTypes: ["all"],
        relatedAgents: ["CarbonVerifier"]
      },
      {
        path: "/analytics",
        name: "Analytics Dashboard",
        description: "Detailed analytics on waste flows, environmental impact, and system performance",
        keywords: ["analytics", "reports", "data", "insights", "statistics"],
        userTypes: ["all"],
        relatedAgents: ["InsightEngine", "PredictFlow"]
      }
    ]
  },
  {
    name: "Community & Governance",
    description: "DAO governance, community features, and collaborative tools",
    features: [
      {
        path: "/dao",
        name: "DAO Governance",
        description: "Participate in decentralized governance, vote on proposals, stake tokens",
        keywords: ["dao", "governance", "voting", "proposals", "democracy"],
        userTypes: ["all"],
        relatedAgents: ["DAOCoordinator", "ReputeX"]
      },
      {
        path: "/community",
        name: "Community Hub",
        description: "Connect with other members, share knowledge, participate in discussions",
        keywords: ["community", "forum", "discussion", "network", "social"],
        userTypes: ["all"],
        relatedAgents: ["LoopBuilder", "ConsumerLink"]
      },
      {
        path: "/partners",
        name: "Partner Network",
        description: "Explore partner ecosystem, find collaborators, view success stories",
        keywords: ["partners", "network", "collaboration", "ecosystem"],
        userTypes: ["all"],
        relatedAgents: ["LoopBuilder", "FeedstockMatcher"]
      }
    ]
  },
  {
    name: "Financial Services",
    description: "Financial tools, pricing, and investment features",
    features: [
      {
        path: "/treasury",
        name: "Treasury",
        description: "DAO treasury management, token economics, financial reports",
        keywords: ["treasury", "finance", "tokens", "funds", "economics"],
        userTypes: ["all"],
        relatedAgents: ["FinanceFlow", "DAOCoordinator"]
      },
      {
        path: "/tools/roi-calculator",
        name: "ROI Calculator",
        description: "Calculate return on investment for waste management operations",
        keywords: ["roi", "calculator", "investment", "returns", "profit"],
        userTypes: ["all"],
        relatedAgents: ["PriceOptimax", "FinanceFlow"]
      },
      {
        path: "/rfq",
        name: "Request for Quote",
        description: "Create and manage RFQs, get competitive pricing, compare offers",
        keywords: ["rfq", "quote", "pricing", "bidding", "tender"],
        userTypes: ["supplier", "buyer"],
        relatedAgents: ["PriceOptimax", "FeedstockMatcher"]
      }
    ]
  },
  {
    name: "Onboarding & Support",
    description: "User onboarding, documentation, and support resources",
    features: [
      {
        path: "/join",
        name: "Join Platform",
        description: "Sign up as supplier, processor, collector, or investor",
        keywords: ["join", "signup", "register", "onboard", "start"],
        userTypes: ["new"],
        relatedAgents: ["SupportBot"]
      },
      {
        path: "/tutorial",
        name: "Interactive Tutorial",
        description: "Step-by-step guide to using the platform features",
        keywords: ["tutorial", "guide", "help", "learn", "howto"],
        userTypes: ["new"],
        relatedAgents: ["SupportBot"]
      },
      {
        path: "/docs",
        name: "Documentation",
        description: "Comprehensive platform documentation, API guides, and technical resources",
        keywords: ["docs", "documentation", "api", "technical", "reference"],
        userTypes: ["all"],
        relatedAgents: ["SupportBot", "ComplianceGuard"]
      },
      {
        path: "/learn/faq",
        name: "FAQ",
        description: "Frequently asked questions and answers about the platform",
        keywords: ["faq", "questions", "help", "support", "answers"],
        userTypes: ["all"],
        relatedAgents: ["SupportBot"]
      }
    ]
  },
  {
    name: "Specialized Features",
    description: "Advanced and specialized platform features",
    features: [
      {
        path: "/micro-collection",
        name: "Micro-collection",
        description: "Small-scale waste collection for households and small businesses",
        keywords: ["micro", "small", "household", "residential"],
        userTypes: ["supplier", "collector"],
        relatedAgents: ["FeedstockMatcher", "RouteGen"]
      },
      {
        path: "/secondary",
        name: "Secondary Markets",
        description: "Trade in secondary materials, byproducts, and processed outputs",
        keywords: ["secondary", "byproducts", "materials", "processed"],
        userTypes: ["processor", "buyer"],
        relatedAgents: ["ByproductBot", "BuyerBot"]
      },
      {
        path: "/loops",
        name: "Circular Loops",
        description: "Explore and create circular economy loops, connect supply chains",
        keywords: ["loops", "circular", "economy", "chains", "cycles"],
        userTypes: ["all"],
        relatedAgents: ["LoopBuilder", "FeedstockMatcher"]
      }
    ]
  }
]

// Get relevant site features for a specific agent
export function getAgentRelevantFeatures(agentName: string): SiteFeature[] {
  const features: SiteFeature[] = []
  
  siteContext.forEach(section => {
    section.features.forEach(feature => {
      if (feature.relatedAgents.includes(agentName) || feature.relatedAgents.includes('all')) {
        features.push(feature)
      }
    })
  })
  
  return features
}

// Search features by keywords
export function searchFeatures(query: string): SiteFeature[] {
  const normalizedQuery = query.toLowerCase()
  const features: SiteFeature[] = []
  
  siteContext.forEach(section => {
    section.features.forEach(feature => {
      const matchesName = feature.name.toLowerCase().includes(normalizedQuery)
      const matchesDescription = feature.description.toLowerCase().includes(normalizedQuery)
      const matchesKeywords = feature.keywords.some(keyword => 
        keyword.toLowerCase().includes(normalizedQuery)
      )
      
      if (matchesName || matchesDescription || matchesKeywords) {
        features.push(feature)
      }
    })
  })
  
  return features
}

// Get all features organized by section
export function getAllFeaturesBySection(): SiteSection[] {
  return siteContext
}

// Support agent specific context
export const supportAgentContext = {
  name: "SupportBot",
  description: "Your friendly ReLoop platform assistant. I can help you navigate the site, understand features, and troubleshoot issues.",
  capabilities: [
    "Navigate to any page or feature",
    "Explain how to use platform features",
    "Help with account and profile setup",
    "Troubleshoot common issues",
    "Guide through onboarding process",
    "Answer questions about waste management",
    "Explain DAO governance and voting",
    "Help with marketplace transactions",
    "Provide information about carbon credits",
    "Connect you with the right AI agent for specific tasks"
  ],
  commonQuestions: [
    "How do I get started?",
    "Where can I list my waste materials?",
    "How do carbon credits work?",
    "What is DAO governance?",
    "How do I track my shipments?",
    "Where can I find processors?",
    "How do I calculate my impact?",
    "What compliance documents do I need?"
  ]
}
