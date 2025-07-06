"use client"

import { Header } from "./header"
import { WaitlistForm } from "./waitlist-form"
import Image from "next/image"
import { Footer } from "./footer"

export function Hero() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Hero Lower Image positioned behind text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pt-208">
        <Image
          src="/images/lower_bg.png"
          alt="Hero lower section"
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-auto translate-y-2/4 md:translate-y-72 lg:translate-y-1/2"
          priority
        />
      </div>

      <div className="font-sans flex w-full flex-1 flex-col items-center justify-center gap-12 overflow-hidden px-4 py-40 md:gap-16 relative z-10">
        <Header />
        
        <div className="w-full">
          <div className="relative flex w-full flex-col gap-12 px-4 md:px-6">
            <div className="relative mx-auto w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl">
              <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 block h-[60vw] w-[120vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_60%,rgba(255,255,255,0.2)_100%)] blur-[100px] sm:h-[80%] sm:w-[120%] dark:hidden" />

              <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden h-[60vw] w-[120vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(10,10,20,0.7)_60%,rgba(10,10,20,0.2)_100%)] blur-[100px] sm:h-[80%] sm:w-[120%] dark:block" />

              <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center md:gap-12 lg:gap-12">
                <h1 className="text-4xl leading-[1.1] font-bold tracking-[-0.02em] md:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-br from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent">
                    Photos
                  </span>{" "}
                  you <br /> can actually{" "}
                  <span className="bg-gradient-to-br from-red-500 via-yellow-500  to-purple-500 bg-clip-text text-transparent">
                    search.
                  </span>
                </h1>
                <p className="mx-auto max-w-lg text-sm leading-tight sm:text-[16px]">
                  Find your memories instantly with AI-powered photo search that actually understands what&apos;s in your pictures.
                </p>
              </div>
            </div>
            <WaitlistForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 