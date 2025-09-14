'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Factory, 
  Recycle, 
  Truck, 
  Shield, 
  Leaf,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { faqCategories, searchFAQs, FAQ, FAQCategory } from '@/lib/data/faqs'

// Icon mapping
const iconMap = {
  HelpCircle,
  Factory,
  Recycle,
  Truck,
  Shield,
  Leaf
}

interface FAQSectionProps {
  className?: string
}

export function FAQSection({ className }: FAQSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('general')
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    return searchFAQs(searchQuery)
  }, [searchQuery])

  // Current display FAQs
  const displayFAQs = searchResults || 
    faqCategories.find(cat => cat.id === selectedCategory)?.questions || []

  // Toggle question expansion
  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  // Handle category selection
  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSearchQuery('')
    setIsMobileMenuOpen(false)
    // Auto-expand first question in category
    const category = faqCategories.find(cat => cat.id === categoryId)
    if (category && category.questions.length > 0) {
      setExpandedQuestions(new Set([category.questions[0].id]))
    }
  }

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-mythic-primary-500 to-mythic-accent-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-mythic-text-muted max-w-3xl mx-auto">
            Find answers to common questions about Genesis ReLoop
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-mythic-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all questions..."
              className="w-full pl-12 pr-12 py-4 bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 focus:border-mythic-primary-500/50 focus:outline-none focus:ring-2 focus:ring-mythic-primary-500/20 text-mythic-text-primary placeholder-mythic-text-muted transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-mythic-dark-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-mythic-text-muted" />
              </button>
            )}
          </div>
          {searchResults && (
            <p className="text-sm text-mythic-text-muted mt-2 text-center">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Navigation - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="sticky top-24 space-y-2">
              {faqCategories.map((category) => {
                const Icon = iconMap[category.icon as keyof typeof iconMap]
                return (
                  <button
                    key={category.id}
                    onClick={() => selectCategory(category.id)}
                    className={cn(
                      "w-full p-4 rounded-xl text-left transition-all flex items-start gap-3 group",
                      selectedCategory === category.id
                        ? "bg-mythic-primary-500/20 border border-mythic-primary-500/50"
                        : "hover:bg-mythic-dark-800 border border-transparent"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 mt-0.5 transition-colors",
                      selectedCategory === category.id
                        ? "text-mythic-primary-500"
                        : "text-mythic-text-muted group-hover:text-mythic-primary-500"
                    )} />
                    <div>
                      <h3 className={cn(
                        "font-semibold transition-colors",
                        selectedCategory === category.id
                          ? "text-mythic-primary-500"
                          : "text-mythic-text-primary"
                      )}>
                        {category.title}
                      </h3>
                      <p className="text-sm text-mythic-text-muted mt-1">
                        {category.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Category Navigation - Mobile */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full p-4 bg-mythic-dark-800 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {(() => {
                  const category = faqCategories.find(cat => cat.id === selectedCategory)
                  const Icon = category ? iconMap[category.icon as keyof typeof iconMap] : HelpCircle
                  return (
                    <>
                      <Icon className="h-5 w-5 text-mythic-primary-500" />
                      <span className="font-semibold text-mythic-text-primary">
                        {category?.title || 'Select Category'}
                      </span>
                    </>
                  )
                })()}
              </div>
              <ChevronDown className={cn(
                "h-5 w-5 text-mythic-text-muted transition-transform",
                isMobileMenuOpen && "rotate-180"
              )} />
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-2 overflow-hidden"
                >
                  {faqCategories.map((category) => {
                    const Icon = iconMap[category.icon as keyof typeof iconMap]
                    return (
                      <button
                        key={category.id}
                        onClick={() => selectCategory(category.id)}
                        className={cn(
                          "w-full p-4 rounded-xl text-left transition-all flex items-start gap-3",
                          selectedCategory === category.id
                            ? "bg-mythic-primary-500/20 border border-mythic-primary-500/50"
                            : "bg-mythic-dark-800 hover:bg-mythic-dark-700 border border-mythic-dark-700"
                        )}
                      >
                        <Icon className={cn(
                          "h-5 w-5 mt-0.5",
                          selectedCategory === category.id
                            ? "text-mythic-primary-500"
                            : "text-mythic-text-muted"
                        )} />
                        <div>
                          <h3 className={cn(
                            "font-semibold",
                            selectedCategory === category.id
                              ? "text-mythic-primary-500"
                              : "text-mythic-text-primary"
                          )}>
                            {category.title}
                          </h3>
                          <p className="text-sm text-mythic-text-muted mt-1">
                            {category.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FAQ Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-4"
          >
            {displayFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-mythic-text-muted">
                  No questions found. Try a different search term.
                </p>
              </div>
            ) : (
              displayFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-mythic-dark-800 rounded-xl overflow-hidden border border-mythic-primary-500/10 hover:border-mythic-primary-500/20 transition-colors"
                >
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 group"
                  >
                    <h3 className="text-lg font-semibold text-mythic-text-primary group-hover:text-mythic-primary-500 transition-colors">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-mythic-text-muted flex-shrink-0 transition-all mt-1",
                        expandedQuestions.has(faq.id) && "rotate-180 text-mythic-primary-500"
                      )}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {expandedQuestions.has(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-mythic-text-muted leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                          
                          {/* Related Questions */}
                          {faq.relatedQuestions && faq.relatedQuestions.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-mythic-primary-500/10">
                              <p className="text-sm text-mythic-text-muted mb-3">
                                Related questions:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {faq.relatedQuestions.map(relatedId => {
                                  const relatedFaq = displayFAQs.find(f => f.id === relatedId) ||
                                    faqCategories.flatMap(c => c.questions).find(f => f.id === relatedId)
                                  
                                  if (!relatedFaq) return null
                                  
                                  return (
                                    <button
                                      key={relatedId}
                                      onClick={() => {
                                        // Find and select the category containing this question
                                        const category = faqCategories.find(cat => 
                                          cat.questions.some(q => q.id === relatedId)
                                        )
                                        if (category) {
                                          selectCategory(category.id)
                                          setTimeout(() => {
                                            setExpandedQuestions(new Set([relatedId]))
                                            // Scroll to question
                                            document.getElementById(`faq-${relatedId}`)?.scrollIntoView({
                                              behavior: 'smooth',
                                              block: 'center'
                                            })
                                          }, 100)
                                        }
                                      }}
                                      className="text-xs px-3 py-1.5 bg-mythic-primary-500/10 hover:bg-mythic-primary-500/20 text-mythic-primary-500 rounded-lg transition-colors"
                                    >
                                      {relatedFaq.question}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-mythic-primary-500/10 to-mythic-accent-500/10 rounded-2xl p-8 md:p-12 border border-mythic-primary-500/20">
            <h3 className="text-2xl md:text-3xl font-bold text-mythic-text-primary mb-4">
              Still have questions?
            </h3>
            <p className="text-mythic-text-muted mb-6 max-w-2xl mx-auto">
              Our support team and AI agents are here to help 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-6 py-3 bg-mythic-primary-500 hover:bg-mythic-primary-400 text-white font-semibold rounded-lg transition-colors"
              >
                Contact Support
              </a>
              <button
                onClick={() => {
                  // Trigger support widget
                  const event = new CustomEvent('openSupportWidget')
                  window.dispatchEvent(event)
                }}
                className="px-6 py-3 bg-mythic-dark-800 hover:bg-mythic-dark-700 text-mythic-text-primary font-semibold rounded-lg transition-colors border border-mythic-primary-500/20"
              >
                Chat with AI Support
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
