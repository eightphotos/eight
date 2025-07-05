export function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-50 leading-tight">
          Photos you{" "}
          <br className="hidden sm:block" />
          can actually{" "}
          <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 bg-clip-text text-transparent">search.</span>
          <span className="text-black"></span>
        </h1>
      </div>
    </section>
  )
} 