"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitted(true)
    setIsSubmitting(false)
    setEmail("")
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center max-w-md mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-black mb-2">You're on the list!</h3>
          <p className="text-gray-600">We'll notify you when we launch.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@0.email"
          className="w-full px-4 py-3 backdrop-blur-md border border-gray-200 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || !email}
        className="px-4 py-6 backdrop-blur-md text-black font-medium rounded-2xl border border-gray-200 hover:bg-gray-200 transition-colors duration-300"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  )
} 