import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Sparkles } from "lucide-react"
import type { ElementType } from "react"
import { Progress } from "@workspace/ui/components/progress"

interface NavItem {
  name: string
  icon: ElementType
  count: number
  active?: boolean
}

interface SidebarProps {
  libraryItems: NavItem[]
  categories: NavItem[]
  albums: NavItem[]
}

export default function Sidebar({ libraryItems, categories, albums }: SidebarProps) {
  return (
    <div className="w-64 h-screen flex flex-col" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="Mardav Gandhi" />
            <AvatarFallback className="bg-black text-white font-medium">MG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">Mardav Gandhi</span>
            <span className="text-sm text-gray-500">gandhi.mardav@0.email</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Search with Eight</span>
          </div>
          <Input className="pl-32 border-gray-300 bg-white h-10 rounded-lg" />
        </div>
      </div>
      <div className="flex-1 px-6 space-y-6 overflow-y-auto scrollbar-hide">
        <Section title="Library" items={libraryItems} />
        <Section title="Categories" items={categories} />
        <Section title="Albums" items={albums} />
      </div>
      <div className="p-6 mt-auto">
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Storage</span>
              <span className="text-gray-700 font-medium">8.2 GB of 15 GB</span>
            </div>
            <Progress value={55} className="h-2" />
          </div>
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            Upgrade Storage
          </Button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{title}</h3>
      <nav className="space-y-1">
        {items.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className={`w-full justify-start h-10 ${
              item.active ? "bg-gray-100 text-gray-900 hover:bg-gray-200" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.name}
            <Badge
              variant="secondary"
              className={`ml-auto text-xs ${
                item.active ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600"
              }`}
            >
              {item.count}
            </Badge>
          </Button>
        ))}
      </nav>
    </div>
  )
} 