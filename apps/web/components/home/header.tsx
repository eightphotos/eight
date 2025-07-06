
import { Users } from "lucide-react"
import { EightLogo, Discord, GitHub, XPlatform } from "@/components/icons"
import { Button } from "@workspace/ui/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-4 left-1/2 z-50 mx-auto flex w-full max-w-xs -translate-x-1/2 items-center justify-between rounded-lg border border-gray-200/30 bg-white/20 px-4 py-2 backdrop-blur-md md:max-w-2xl">
      <h1>
        <Link href="/" className="flex items-center gap-2 font-bold transition-colors hover:text-gray-700">
          <EightLogo className="h-9 w-9" aria-label="Eight Logo" />
          <span className="hidden md:inline">Eight</span>
        </Link>
      </h1>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" aria-label="Discord" className="h-9 w-9">
              <a href="https://discord.gg/eightphotos" target="_blank" rel="noopener noreferrer">
                <Discord className="h-5 w-5" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Discord</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" asChild className="h-9 w-9">
              <a href="https://github.com/eightphotos/eight" target="_blank" rel="noopener noreferrer">
                <GitHub className="h-5 w-5" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>GitHub</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" aria-label="X (Twitter)" className="h-9 w-9">
              <a href="https://x.com/breathingcodes" target="_blank" rel="noopener noreferrer">
                <XPlatform className="h-5 w-5" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>X (Twitter)</TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}