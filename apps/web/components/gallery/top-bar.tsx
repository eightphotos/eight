import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  Bell,
  Calendar,
  Filter,
  Grid2X2,
  Grid3X3,
  Settings,
  Upload,
  Import as ImportIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

type ViewMode = "compact" | "comfortable" | "timeline"

interface TopBarProps {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

export default function TopBar({ viewMode, setViewMode }: TopBarProps) {
  return (
    <header className="h-16 border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <h1 className="text-lg font-semibold text-gray-900">All Photos</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
          <Filter className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <ModeButton
            active={viewMode === "compact"}
            onClick={() => setViewMode("compact")}
            title="Compact view"
          >
            <Grid3X3 className="w-4 h-4" />
          </ModeButton>
          <ModeButton
            active={viewMode === "comfortable"}
            onClick={() => setViewMode("comfortable")}
            title="Comfortable view"
          >
            <Grid2X2 className="w-4 h-4" />
          </ModeButton>
          <ModeButton
            active={viewMode === "timeline"}
            onClick={() => setViewMode("timeline")}
            title="Timeline view"
          >
            <Calendar className="w-4 h-4" />
          </ModeButton>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>

        <Button className="bg-black hover:bg-gray-800 text-white">
          <ImportIcon className="w-4 h-4 mr-2" />
          Import
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
          <Bell className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Mardav Gandhi" />
                <AvatarFallback className="bg-black text-white">MG</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-gray-700">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function ModeButton({ active, onClick, title, children }: { active: boolean; onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      className={active ? "bg-black text-white hover:bg-gray-800" : "hover:bg-gray-200 text-gray-600"}
      title={title}
    >
      {children}
    </Button>
  )
} 