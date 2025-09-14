'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Minimize2, Maximize2, HelpCircle, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { searchFeatures, supportAgentContext } from '@/lib/agents/site-context'
import { searchFAQs, FAQ } from '@/lib/data/faqs'

interface Message {
  role: 'user' | 'agent'
  content: string
  timestamp: Date
}

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'agent',
      content: `Hi! I'm ${supportAgentContext.name}. ${supportAgentContext.description}\n\nHow can I help you today?`,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Listen for open event from FAQ section
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true)
    window.addEventListener('openSupportWidget', handleOpenEvent)
    return () => window.removeEventListener('openSupportWidget', handleOpenEvent)
  }, [])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = inputMessage
    setInputMessage('')
    
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }])

    setIsTyping(true)

    try {
      // Check if user is asking about navigation or features
      const lowerMessage = userMessage.toLowerCase()
      let response = ''

      // First, check FAQs for answers
      const faqResults = searchFAQs(userMessage)
      
      if (faqResults.length > 0) {
        const topFAQ = faqResults[0]
        response = `I found this in our FAQ:\n\n**${topFAQ.question}**\n\n${topFAQ.answer}`
        
        // Add related questions if available
        if (faqResults.length > 1) {
          response += '\n\n**Related questions:**\n'
          faqResults.slice(1, 4).forEach(faq => {
            response += `• ${faq.question}\n`
          })
        }
      } else {
        // Search for relevant features
        const features = searchFeatures(userMessage)
        
        if (features.length > 0) {
          response = `I found these relevant features for "${userMessage}":\n\n`
          features.slice(0, 3).forEach(feature => {
            response += `**[${feature.name}](${feature.path})**\n`
            response += `${feature.description}\n\n`
          })
          response += 'Would you like me to explain how to use any of these features?'
        }
      }
      
      if (!response && (lowerMessage.includes('help') || lowerMessage.includes('what can you do'))) {
        response = 'I can help you with:\n\n'
        supportAgentContext.capabilities.forEach(cap => {
          response += `• ${cap}\n`
        })
        response += '\nWhat would you like help with?'
      } else if (lowerMessage.includes('get started') || lowerMessage.includes('new')) {
        response = `Welcome to ReLoop! Here's how to get started:\n\n1. **[Join the platform](/join)** - Sign up as a supplier, processor, collector, or investor\n2. **[Take the tutorial](/tutorial)** - Learn how to use key features\n3. **[Visit the dashboard](/dashboard)** - See your personalized overview\n4. **[Browse the marketplace](/marketplace)** - Find waste materials or processors\n\nWould you like me to guide you through any specific process?`
      } else if (lowerMessage.includes('track') || lowerMessage.includes('shipment')) {
        response = `For tracking shipments and materials:\n\n• **[Real-time Monitoring](/monitoring)** - Live tracking with IoT sensors\n• **[TraceBot AI Agent](/agents)** - Chat with TraceBot for batch tracking\n• **[Dashboard](/dashboard)** - View all your active shipments\n\nYou can also provide a batch ID or WTN number to track a specific shipment.`
      } else if (lowerMessage.includes('carbon') || lowerMessage.includes('credit')) {
        response = `For carbon credits and environmental impact:\n\n• **[Carbon Credits](/carbon)** - Track and trade carbon credits\n• **[Impact Calculator](/tools/impact-calculator)** - Calculate your environmental savings\n• **[CarbonVerifier AI](/agents)** - Chat with our Carbon Verification agent\n\nWould you like to know more about how carbon credits are calculated?`
      } else if (lowerMessage.includes('compliance') || lowerMessage.includes('regulation')) {
        response = `For compliance and regulations:\n\n• **[Compliance Center](/compliance)** - All compliance documentation\n• **[ComplianceGuard AI](/agents)** - Get automated compliance help\n• **[Documentation](/docs/compliance)** - Detailed compliance guides\n\nWhat specific compliance area do you need help with?`
      } else {
        // Call the API for more complex queries
        const res = await fetch('/api/agents/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            agentName: 'SupportBot',
            message: userMessage,
            context: {
              sessionId: 'support-widget',
              conversationHistory: messages.map(m => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                content: m.content,
                timestamp: m.timestamp
              }))
            }
          })
        })

        if (res.ok) {
          const data = await res.json()
          response = data.response
        } else {
          response = `I'm having trouble connecting right now. Here are some quick links that might help:\n\n• **[FAQ](/learn/faq)** - Common questions answered\n• **[Documentation](/docs)** - Complete platform guide\n• **[Contact Support](/contact)** - Get in touch with our team`
        }
      }

      // Add agent response
      setMessages(prev => [...prev, {
        role: 'agent',
        content: response,
        timestamp: new Date()
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'agent',
        content: 'I apologize, but I encountered an error. Please try again or visit our [help center](/docs).',
        timestamp: new Date()
      }])
    } finally {
      setIsTyping(false)
    }
  }

  // Quick action buttons
  const quickActions = [
    { label: 'How do I get started?', action: 'get started' },
    { label: 'Track shipment', action: 'track my shipment' },
    { label: 'Find processors', action: 'find processors near me' },
    { label: 'Carbon credits', action: 'how do carbon credits work' }
  ]

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-mythic-primary-500 hover:bg-mythic-primary-400 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "fixed z-50 bg-mythic-dark-900 border border-mythic-primary-500/20 rounded-2xl shadow-2xl overflow-hidden",
              isMinimized
                ? "bottom-6 right-6 w-80 h-14"
                : "bottom-6 right-6 w-96 h-[600px] max-h-[80vh]"
            )}
          >
            {/* Header */}
            <div className="bg-mythic-dark-800 border-b border-mythic-primary-500/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mythic-primary-500 to-mythic-accent-500 flex items-center justify-center">
                    <HelpCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-mythic-text-primary">
                      ReLoop Support
                    </h3>
                    {!isMinimized && (
                      <p className="text-xs text-mythic-text-muted">
                        Always here to help
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-mythic-dark-700 rounded-lg transition-colors text-mythic-text-muted hover:text-mythic-primary-500"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-mythic-dark-700 rounded-lg transition-colors text-mythic-text-muted hover:text-mythic-primary-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Quick actions */}
                {messages.length === 1 && (
                  <div className="p-4 border-b border-mythic-primary-500/10">
                    <p className="text-sm text-mythic-text-muted mb-3">Quick actions:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setInputMessage(action.action)
                            handleSendMessage()
                          }}
                          className="text-xs px-3 py-2 bg-mythic-dark-800 hover:bg-mythic-dark-700 text-mythic-text-muted hover:text-mythic-primary-500 rounded-lg transition-colors text-left"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100% - 140px)' }}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex",
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3",
                        message.role === 'user'
                          ? "bg-mythic-primary-500/20 text-mythic-text-primary"
                          : "bg-mythic-dark-800 text-mythic-text-muted"
                      )}>
                        {message.role === 'agent' ? (
                          <div className="text-sm prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                li: ({ children }) => <li className="text-sm">{children}</li>,
                                strong: ({ children }) => <strong className="font-semibold text-mythic-primary-500">{children}</strong>,
                                a: ({ href, children }) => (
                                  <a 
                                    href={href} 
                                    className="text-mythic-primary-500 hover:text-mythic-primary-400 underline"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {children}
                                  </a>
                                ),
                                code: ({ children }) => <code className="bg-mythic-dark-700 px-1 py-0.5 rounded text-xs">{children}</code>
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-mythic-dark-800 rounded-2xl px-4 py-3">
                        <Loader2 className="h-4 w-4 animate-spin text-mythic-text-muted" />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-mythic-primary-500/10">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage()
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 px-4 py-2 rounded-lg bg-mythic-dark-800 text-mythic-text-primary placeholder-mythic-text-muted focus:outline-none focus:ring-2 focus:ring-mythic-primary-500/50 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isTyping}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        inputMessage.trim() && !isTyping
                          ? "bg-mythic-primary-500 text-white hover:bg-mythic-primary-400"
                          : "bg-mythic-dark-800 text-mythic-text-muted cursor-not-allowed"
                      )}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
