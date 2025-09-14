// Comprehensive FAQ Data Structure

export interface FAQ {
  id: string
  question: string
  answer: string
  keywords: string[]
  relatedQuestions?: string[]
}

export interface FAQCategory {
  id: string
  title: string
  icon: string
  description: string
  questions: FAQ[]
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    title: 'General Questions',
    icon: 'HelpCircle',
    description: 'Learn about Genesis ReLoop and how it works',
    questions: [
      {
        id: 'what-is-reloop',
        question: 'What is Genesis ReLoop, and how does it work?',
        answer: 'Genesis ReLoop is a decentralized circular economy platform that connects waste suppliers with processors and buyers. We turn local waste into local fuel through community-owned infrastructure, using blockchain technology for transparency and DAO governance for democratic decision-making. Our platform facilitates waste-to-energy conversion through biogas and biodiesel production while tracking carbon credits.',
        keywords: ['what', 'genesis', 'reloop', 'how', 'works', 'platform', 'about'],
        relatedQuestions: ['platform-fees', 'get-started']
      },
      {
        id: 'platform-fees',
        question: 'Is there a fee to use the platform?',
        answer: 'Genesis ReLoop is free to join with no upfront costs. We operate on a transparent fee structure: transaction fees are 2-3% for marketplace trades, and premium features like advanced analytics and priority support have optional subscription tiers. All fees are clearly displayed before any transaction.',
        keywords: ['fee', 'cost', 'price', 'free', 'charge', 'payment'],
        relatedQuestions: ['payment-methods', 'premium-features']
      },
      {
        id: 'get-started',
        question: 'How do I get started on the platform?',
        answer: 'Getting started is easy! 1) Sign up for free at /join, 2) Choose your role (supplier, processor, buyer, or logistics partner), 3) Complete your profile with business details, 4) Take our interactive tutorial at /tutorial, 5) Start listing materials or browsing opportunities. Our AI agents are available 24/7 to help guide you.',
        keywords: ['start', 'begin', 'join', 'sign up', 'register', 'onboard'],
        relatedQuestions: ['what-is-reloop', 'tutorial']
      },
      {
        id: 'dao-governance',
        question: 'What is DAO governance and how can I participate?',
        answer: 'DAO (Decentralized Autonomous Organization) governance allows all platform participants to vote on important decisions like fee structures, new features, and fund allocation. Token holders can propose and vote on changes. Participate by earning governance tokens through platform activity, then visit /dao to view and vote on proposals.',
        keywords: ['dao', 'governance', 'vote', 'token', 'decision', 'proposal'],
        relatedQuestions: ['earn-tokens', 'voting-power']
      },
      {
        id: 'carbon-credits',
        question: 'How do carbon credits work on Genesis ReLoop?',
        answer: 'When you divert waste from landfills through our platform, you generate verified carbon credits (GIRM credits). These are calculated based on avoided emissions - for example, 1 tonne of food waste diverted generates approximately 2.1 carbon credits. Credits can be traded on our marketplace or retired for sustainability reporting.',
        keywords: ['carbon', 'credits', 'girm', 'emissions', 'sustainability', 'environment'],
        relatedQuestions: ['calculate-carbon', 'trade-credits']
      }
    ]
  },
  {
    id: 'suppliers',
    title: 'For Waste Suppliers',
    icon: 'Factory',
    description: 'Questions for restaurants, hotels, and other waste generators',
    questions: [
      {
        id: 'list-materials',
        question: 'How do I list my waste materials for collection or sale?',
        answer: 'To list materials: 1) Go to your Dashboard, 2) Click "Create Listing" in the Marketplace section, 3) Select material type (food waste, UCO, etc.), 4) Enter quantity, quality details, and location, 5) Set collection schedule and any special requirements, 6) Publish your listing. Our FeedstockMatcher AI can help match you with suitable processors automatically.',
        keywords: ['list', 'sell', 'waste', 'materials', 'collection', 'create', 'listing'],
        relatedQuestions: ['material-types', 'pricing-guidance']
      },
      {
        id: 'material-types',
        question: 'What types of waste materials can I list?',
        answer: 'We accept various organic waste streams including: Used Cooking Oil (UCO), food waste, grease trap waste, expired food products, agricultural residues, and other biodegradable materials. Each material type has specific quality requirements - our system guides you through the classification process.',
        keywords: ['types', 'materials', 'waste', 'uco', 'food', 'accept'],
        relatedQuestions: ['quality-standards', 'list-materials']
      },
      {
        id: 'collection-schedule',
        question: 'How often can I schedule collections?',
        answer: 'Collection frequency depends on your volume and location. Options include: daily (for high-volume generators), weekly (most common), bi-weekly, monthly, or on-demand. Our RouteGen AI optimizes collection routes to minimize costs and carbon footprint while meeting your schedule needs.',
        keywords: ['collection', 'schedule', 'frequency', 'pickup', 'often'],
        relatedQuestions: ['minimum-volume', 'emergency-collection']
      },
      {
        id: 'track-materials',
        question: 'How can I track where my waste goes?',
        answer: 'Every batch receives a unique Waste Transfer Note (WTN) number. Track your materials in real-time through: 1) Dashboard tracking view, 2) Email/SMS notifications at each checkpoint, 3) Blockchain-verified chain of custody, 4) Final processing certificates. Our TraceBot AI provides detailed journey information.',
        keywords: ['track', 'trace', 'monitor', 'where', 'goes', 'follow'],
        relatedQuestions: ['chain-custody', 'certificates']
      },
      {
        id: 'payment-terms',
        question: 'When and how do I get paid for my materials?',
        answer: 'Payment terms vary by material type: UCO typically pays upon collection verification, while other materials may have net 7-30 day terms. Payments are processed via bank transfer, crypto, or platform credits. All transactions are secured by smart contracts ensuring timely payment.',
        keywords: ['payment', 'paid', 'money', 'when', 'how', 'terms'],
        relatedQuestions: ['payment-methods', 'invoice-process']
      }
    ]
  },
  {
    id: 'processors',
    title: 'For Processors & Buyers',
    icon: 'Recycle',
    description: 'Questions for AD plants, biodiesel producers, and material buyers',
    questions: [
      {
        id: 'find-suppliers',
        question: 'How do I find reliable suppliers?',
        answer: 'Find suppliers through: 1) Marketplace browse with filters for material type, location, quantity, and quality, 2) Set up alerts for new listings matching your criteria, 3) Use our FeedstockMatcher AI for intelligent recommendations, 4) Check supplier reputation scores and compliance history. All suppliers are verified before listing.',
        keywords: ['find', 'suppliers', 'source', 'materials', 'reliable', 'search'],
        relatedQuestions: ['supplier-verification', 'quality-assurance']
      },
      {
        id: 'quality-assurance',
        question: 'How is material quality assured?',
        answer: 'Quality is ensured through: 1) Standardized grading systems for each material type, 2) Photo evidence requirements, 3) Lab test results for critical parameters, 4) Reputation system tracking quality consistency, 5) Smart contract penalties for misrepresented quality. Disputes are resolved through our governance system.',
        keywords: ['quality', 'assurance', 'standards', 'testing', 'verification'],
        relatedQuestions: ['dispute-resolution', 'quality-parameters']
      },
      {
        id: 'capacity-planning',
        question: 'Can I reserve materials in advance?',
        answer: 'Yes! Use forward contracts to secure future supply: 1) Browse upcoming availability, 2) Lock in volumes and prices up to 12 months ahead, 3) Set flexible delivery windows, 4) Use our PredictFlow AI to forecast availability. Smart contracts ensure both parties honor agreements.',
        keywords: ['reserve', 'advance', 'forward', 'contract', 'future', 'planning'],
        relatedQuestions: ['contract-terms', 'price-stability']
      },
      {
        id: 'processor-listing',
        question: 'How do I list my processing capacity?',
        answer: 'List your facility by: 1) Completing processor profile with certifications, 2) Specify accepted material types and quality requirements, 3) Set capacity limits and gate fees, 4) Define service area, 5) Upload compliance documents. Your listing appears in searches and receives AI-matched supplier recommendations.',
        keywords: ['list', 'processor', 'capacity', 'facility', 'accept', 'register'],
        relatedQuestions: ['certification-requirements', 'gate-fees']
      },
      {
        id: 'byproduct-sales',
        question: 'Can I sell my processed outputs on the platform?',
        answer: 'Absolutely! List processed products like biogas, biodiesel, digestate, or refined materials. The platform supports the full circular economy chain. Our ByproductMatcher AI helps find buyers for secondary materials, maximizing value from every tonne processed.',
        keywords: ['sell', 'byproduct', 'output', 'digestate', 'biogas', 'biodiesel'],
        relatedQuestions: ['product-certification', 'buyer-network']
      }
    ]
  },
  {
    id: 'logistics',
    title: 'For Logistics Partners',
    icon: 'Truck',
    description: 'Questions for waste carriers and transport companies',
    questions: [
      {
        id: 'carrier-verification',
        question: 'How do I get verified as a carrier?',
        answer: 'Carrier verification requires: 1) Valid waste carrier license/registration, 2) Appropriate insurance coverage (minimum £5M), 3) Vehicle fleet details and compliance certificates, 4) Driver ADR certifications for hazardous materials, 5) Environmental management system documentation. Verification typically takes 2-3 business days.',
        keywords: ['carrier', 'verified', 'transport', 'logistics', 'registration'],
        relatedQuestions: ['required-documents', 'verification-time']
      },
      {
        id: 'route-optimization',
        question: 'How does route optimization work?',
        answer: 'Our RouteGen AI optimizes routes by: 1) Analyzing all pickup/delivery points, 2) Considering time windows and vehicle capacity, 3) Factoring in real-time traffic and weather, 4) Minimizing distance and emissions, 5) Balancing driver hours. Routes typically save 20-30% on fuel costs.',
        keywords: ['route', 'optimization', 'efficient', 'planning', 'logistics'],
        relatedQuestions: ['route-changes', 'multi-stop']
      },
      {
        id: 'job-bidding',
        question: 'How do I bid on collection jobs?',
        answer: 'Access collection opportunities through: 1) Logistics marketplace showing available routes, 2) Set filters for your service area and vehicle types, 3) View job details including volume, distance, and requirements, 4) Submit competitive bids with your timeline, 5) Automated matching for regular routes.',
        keywords: ['bid', 'job', 'collection', 'transport', 'work', 'opportunities'],
        relatedQuestions: ['pricing-guidance', 'job-requirements']
      },
      {
        id: 'compliance-tracking',
        question: 'How are compliance documents managed?',
        answer: 'Platform automates compliance by: 1) Digital WTN generation with QR codes, 2) Automatic regulatory report filing, 3) Document expiry alerts, 4) GPS tracking for audit trails, 5) Integration with EA/SEPA systems. All documents stored securely with blockchain verification.',
        keywords: ['compliance', 'documents', 'wtn', 'regulatory', 'paperwork'],
        relatedQuestions: ['document-retention', 'audit-support']
      },
      {
        id: 'fleet-integration',
        question: 'Can I integrate my fleet management system?',
        answer: 'Yes! We support integration with major fleet management systems via API. Features include: real-time vehicle tracking, automatic job dispatch, driver app for mobile updates, fuel consumption monitoring, and maintenance scheduling. Contact support for integration assistance.',
        keywords: ['fleet', 'integration', 'api', 'system', 'tracking', 'management'],
        relatedQuestions: ['api-documentation', 'supported-systems']
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical & Security',
    icon: 'Shield',
    description: 'Platform technology, security, and integration questions',
    questions: [
      {
        id: 'ai-capabilities',
        question: 'Does Genesis ReLoop use AI?',
        answer: 'Yes, extensively! Our AI agents include: FeedstockMatcher (supplier-processor matching), RouteGen (logistics optimization), TraceBot (material tracking), CarbonVerifier (emissions calculations), PredictFlow (demand forecasting), and more. AI provides predictive insights, automates operations, and continuously improves platform efficiency.',
        keywords: ['ai', 'artificial', 'intelligence', 'automation', 'agents'],
        relatedQuestions: ['ai-agents', 'ai-accuracy']
      },
      {
        id: 'blockchain-use',
        question: 'How does blockchain technology work here?',
        answer: 'Blockchain provides: 1) Immutable transaction records, 2) Smart contracts for automated payments, 3) Transparent chain of custody, 4) Decentralized governance voting, 5) Carbon credit tokenization. We use Polygon for low-cost, eco-friendly transactions while maintaining security.',
        keywords: ['blockchain', 'smart', 'contract', 'crypto', 'distributed'],
        relatedQuestions: ['transaction-security', 'smart-contracts']
      },
      {
        id: 'data-security',
        question: 'How is my business data protected?',
        answer: 'We implement enterprise-grade security: 256-bit encryption for all data, ISO 27001 compliant infrastructure, regular third-party security audits, GDPR compliance with data control rights, role-based access controls, and 24/7 security monitoring. Your competitive information remains confidential.',
        keywords: ['security', 'data', 'protection', 'privacy', 'safe', 'confidential'],
        relatedQuestions: ['gdpr-compliance', 'data-ownership']
      },
      {
        id: 'api-access',
        question: 'Is there an API for integration?',
        answer: 'Yes! Our RESTful API enables: listing management, transaction processing, tracking updates, analytics data access, and webhook notifications. Available for verified accounts with documentation at /docs/api. Rate limits apply based on account tier.',
        keywords: ['api', 'integration', 'developer', 'rest', 'webhook'],
        relatedQuestions: ['api-documentation', 'rate-limits']
      },
      {
        id: 'mobile-apps',
        question: 'Are mobile apps available?',
        answer: 'Mobile apps are available for iOS and Android featuring: full marketplace access, real-time notifications, GPS tracking for drivers, photo upload for verification, offline capability for remote areas. Download from App Store or Google Play.',
        keywords: ['mobile', 'app', 'ios', 'android', 'phone', 'application'],
        relatedQuestions: ['app-features', 'offline-mode']
      }
    ]
  },
  {
    id: 'sustainability',
    title: 'Sustainability & Impact',
    icon: 'Leaf',
    description: 'Environmental impact and sustainability questions',
    questions: [
      {
        id: 'environmental-impact',
        question: 'What is the environmental impact of using Genesis ReLoop?',
        answer: 'Our platform enables significant environmental benefits: preventing methane emissions from landfills (25x more potent than CO2), converting waste to renewable energy, reducing fossil fuel dependence, creating nutrient-rich digestate for agriculture, and building circular economy loops. Members typically reduce carbon footprint by 60-80%.',
        keywords: ['environmental', 'impact', 'sustainability', 'green', 'eco'],
        relatedQuestions: ['carbon-calculation', 'impact-reporting']
      },
      {
        id: 'carbon-calculation',
        question: 'How are carbon savings calculated?',
        answer: 'Carbon calculations follow verified methodologies: baseline emissions from landfill/incineration, minus emissions from collection/processing, equals net carbon saved. Factors include material type, transport distance, processing method. All calculations are third-party verified and blockchain recorded.',
        keywords: ['carbon', 'calculation', 'methodology', 'savings', 'emissions'],
        relatedQuestions: ['verification-process', 'carbon-credits']
      },
      {
        id: 'circular-economy',
        question: 'How does this support the circular economy?',
        answer: 'We enable true circularity by: keeping materials in use longer, extracting maximum value from waste, regenerating natural systems through digestate, eliminating waste through total utilization, designing out pollution via clean processing. Every loop closes resource cycles locally.',
        keywords: ['circular', 'economy', 'sustainable', 'regenerative', 'loop'],
        relatedQuestions: ['local-loops', 'zero-waste']
      },
      {
        id: 'community-benefits',
        question: 'What are the community benefits?',
        answer: 'Communities benefit through: local job creation in green economy, reduced waste management costs, energy independence via local biogas/biodiesel, improved air quality from diverted landfill waste, educational opportunities, and DAO governance giving communities control over their infrastructure.',
        keywords: ['community', 'benefits', 'local', 'jobs', 'social', 'impact'],
        relatedQuestions: ['job-creation', 'community-ownership']
      },
      {
        id: 'impact-reporting',
        question: 'How can I report on sustainability metrics?',
        answer: 'Access comprehensive impact reports showing: total waste diverted, carbon emissions avoided, renewable energy generated, circular materials created, and SDG contributions. Reports are audit-ready with blockchain verification, suitable for ESG reporting and sustainability certifications.',
        keywords: ['report', 'sustainability', 'metrics', 'esg', 'impact', 'measure'],
        relatedQuestions: ['report-formats', 'certification-support']
      }
    ]
  }
]

// Helper function to get all FAQs as a flat array
export function getAllFAQs(): FAQ[] {
  return faqCategories.flatMap(category => category.questions)
}

// Helper function to search FAQs
export function searchFAQs(query: string): FAQ[] {
  const normalizedQuery = query.toLowerCase()
  const results: { faq: FAQ; score: number }[] = []

  getAllFAQs().forEach(faq => {
    let score = 0
    
    // Check question match
    if (faq.question.toLowerCase().includes(normalizedQuery)) {
      score += 10
    }
    
    // Check answer match
    if (faq.answer.toLowerCase().includes(normalizedQuery)) {
      score += 5
    }
    
    // Check keyword matches
    faq.keywords.forEach(keyword => {
      if (normalizedQuery.includes(keyword) || keyword.includes(normalizedQuery)) {
        score += 3
      }
    })
    
    if (score > 0) {
      results.push({ faq, score })
    }
  })
  
  // Sort by score and return FAQs
  return results
    .sort((a, b) => b.score - a.score)
    .map(result => result.faq)
}

// Helper function to get related FAQs
export function getRelatedFAQs(faqId: string): FAQ[] {
  const faq = getAllFAQs().find(f => f.id === faqId)
  if (!faq || !faq.relatedQuestions) return []
  
  return faq.relatedQuestions
    .map(relatedId => getAllFAQs().find(f => f.id === relatedId))
    .filter((f): f is FAQ => f !== undefined)
}

// Helper function to get FAQs by category
export function getFAQsByCategory(categoryId: string): FAQ[] {
  const category = faqCategories.find(cat => cat.id === categoryId)
  return category ? category.questions : []
}
