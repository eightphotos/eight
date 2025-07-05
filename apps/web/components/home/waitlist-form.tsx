"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Alert, AlertDescription } from "@workspace/ui/components/alert"
import { Card, CardContent } from "@workspace/ui/components/card"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      setEmail("")
    } catch (err) {
      setError(`Something went wrong, please try again. ${err}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError("")
  }

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="example@0.email"
              className={`
                h-12 px-6 text-base backdrop-blur-sm transition-all duration-300
                ${error 
                  ? 'border-red-300 bg-red-50/50' 
                  : 'bg-white/50'
                }
              `}
              disabled={isSubmitting}
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting || !email.trim() || isSubmitted}
            className={`
              h-12 px-8 font-semibold transition-all duration-300 relative overflow-hidden active:scale-95 text-white shadow-lg hover:shadow-xl sm:w-auto w-full
              ${isSubmitted 
                ? 'bg-green-600 hover:bg-green-600' 
                : 'bg-gray-900 hover:bg-gray-800'
              }
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Joining...
              </div>
            ) : isSubmitted ? (
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Joined
              </div>
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex items-center justify-center gap-3 pt-4 text-gray-600">
          <div className="relative">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
          </div>
          <span className="text-sm">
            Join <span className="font-semibold text-gray-900">{isSubmitted ? 128 : 127}</span> others waiting for early access
          </span>
        </div>
      </form>
    </div>
  )
} 