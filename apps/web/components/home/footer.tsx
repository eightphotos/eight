import { EightLogo, XPlatform } from "@/components/icons"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="fixed bottom-4 left-1/2 z-50 mx-auto flex w-full max-w-xs -translate-x-1/2 items-center justify-between rounded-lg border border-gray-200/30 bg-white/20 px-4 py-2 backdrop-blur-md md:max-w-2xl">
      <div className="flex items-center gap-2 text-sm">
        <span className="hidden sm:inline">Made by</span>
        <a
          href="https://twitter.com/breathingcodes"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-medium transition-colors hover:text-gray-700"
        >
          <XPlatform className="h-4 w-4" />
          breathingcode
        </a>
      </div>

      <Link href="/" className="flex items-center gap-2 font-bold transition-colors hover:text-gray-700">
        <EightLogo className="h-6 w-6" aria-label="Eight Logo" />
        <span className="hidden md:inline">Eight</span>
      </Link>
    </footer>
  )
}
