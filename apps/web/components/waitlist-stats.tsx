"use client"

import { useState, useEffect } from "react"

export function WaitlistStats() {
  const [count, setCount] = useState(1121)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center gap-2 text-gray-600 mt-6">
      {/* <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span className="text-sm md:text-base">
        <span className="font-medium text-black">{count.toLocaleString()}</span>{" "}
        people already joined the waitlist
      </span> */}
    </div>
  )
} 