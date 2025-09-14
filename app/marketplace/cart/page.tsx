'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'

interface CartItem {
  id: string
  title: string
  quantity: number
  unit: string
  price: number
  priceUnit: string
  type: string
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    // Navigate to checkout process
    router.push('/checkout')
  }

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
    toast.success('Item removed from cart')
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <Link
          href="/marketplace/browse"
          className="inline-flex items-center gap-2 text-mythic-text-muted hover:text-mythic-text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold text-mythic-text-primary mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-8 text-center">
            <ShoppingCart className="h-16 w-16 text-mythic-text-muted mx-auto mb-4" />
            <p className="text-xl text-mythic-text-primary mb-2">Your cart is empty</p>
            <p className="text-mythic-text-muted mb-6">
              Browse our marketplace to find waste streams and recycled products.
            </p>
            <Link
              href="/marketplace/browse"
              className="inline-flex items-center gap-2 px-6 py-3 bg-mythic-primary-500 text-white rounded-lg hover:bg-mythic-primary-600 transition-all font-medium"
            >
              Browse Listings
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-mythic-text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-mythic-text-muted mb-3">
                        Type: <span className="text-mythic-primary-500">{item.type}</span>
                      </p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-mythic-primary-500/20 rounded transition-colors"
                          >
                            <Minus className="h-4 w-4 text-mythic-text-muted" />
                          </button>
                          <span className="text-mythic-text-primary font-medium px-3">
                            {item.quantity} {item.unit}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-mythic-primary-500/20 rounded transition-colors"
                          >
                            <Plus className="h-4 w-4 text-mythic-text-muted" />
                          </button>
                        </div>
                        <div className="text-mythic-accent-300 font-semibold">
                          £{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-mythic-text-primary mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-mythic-text-muted">
                    <span>Subtotal</span>
                    <span>£{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-mythic-text-muted">
                    <span>Transport</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-mythic-text-muted">
                    <span>Carbon Credits</span>
                    <span className="text-green-400">Included</span>
                  </div>
                  <div className="border-t border-mythic-primary-500/20 pt-3">
                    <div className="flex justify-between text-lg font-semibold text-mythic-text-primary">
                      <span>Total</span>
                      <span>£{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-3 bg-mythic-primary-500 text-white rounded-lg hover:bg-mythic-primary-600 transition-all font-medium"
                >
                  Proceed to Checkout
                </button>

                <p className="text-xs text-mythic-text-muted text-center mt-4">
                  Secure transactions powered by smart contracts
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
