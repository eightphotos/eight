import { Header } from "@/components/header"
import { Background } from "@/components/background"
import { Hero } from "@/components/hero"
import { WaitlistForm } from "@/components/waitlist-form"
import { WaitlistStats } from "@/components/waitlist-stats"
import { DemoSection } from "@/components/demo-section"

export default function Page() {
  return (
    <div className="min-h-screen relative">
      <Background />
      <Header isScrolled={false} />
      
      <main>
        {/* Hero Section */}
        <div className="relative">
          <Hero />
          <div className="absolute bottom-32 left-0 right-0 px-6">
            <WaitlistForm />
            <WaitlistStats />
          </div>
        </div>
        
        {/* Demo Section
        <DemoSection /> */}
      </main>
    </div>
  )
}
