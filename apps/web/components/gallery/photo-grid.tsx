import { Button } from "@workspace/ui/components/button"
import {
  Download,
  Heart,
  Maximize2,
  MoreHorizontal,
  Play,
  Share2,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

type ViewMode = "compact" | "comfortable" | "timeline"

export interface Photo {
  id: string
  src: string
  date: string
  title: string
  type: "image" | "video"
  size: string
  location: string
}

interface PhotoGridProps {
  groupedPhotos: Record<string, Photo[]>
  viewMode: ViewMode
}

export default function PhotoGrid({ groupedPhotos, viewMode }: PhotoGridProps) {
  return (
    <main className="flex-1 p-8 overflow-auto scrollbar-hide" style={{ backgroundColor: "#FAFAFA" }}>
      {viewMode === "timeline" ? (
        <div className="space-y-12">
          {Object.entries(groupedPhotos).map(([date, photos]) => (
            <TimelineSection key={date} date={date} photos={photos} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedPhotos).map(([date, photos]) => (
            <RegularSection key={date} date={date} photos={photos} viewMode={viewMode} />
          ))}
        </div>
      )}
    </main>
  )
}

function TimelineSection({ date, photos, viewMode }: { date: string; photos: Photo[]; viewMode: ViewMode }) {
  return (
    <div className="relative">
      <div className="sticky top-0 z-10 py-2 mb-6" style={{ backgroundColor: "rgba(250, 250, 250, 0.8)" }}>
        <h2 className="text-2xl font-semibold text-gray-900">
          {new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
      </div>
      <div className={`grid ${getGridCols(viewMode)} gap-6`}>
        {photos.map((photo) => (
          <Card key={photo.id} photo={photo} large />
        ))}
      </div>
    </div>
  )
}

function RegularSection({ date, photos, viewMode }: { date: string; photos: Photo[]; viewMode: ViewMode }) {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4 text-gray-900">
        {new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>
      <div className={`grid ${getGridCols(viewMode)} gap-4`}>
        {photos.map((photo) => (
          <Card key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  )
}

function Card({ photo, large = false }: { photo: Photo; large?: boolean }) {
  return (
    <div
      className={`group relative ${
        large ? "bg-white rounded-2xl" : "aspect-square bg-white rounded-xl"
      } overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200`}
    >
      <div className={large ? "aspect-square overflow-hidden" : ""}>
        <img
          src={photo.src || "/placeholder.svg"}
          alt={photo.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {photo.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/60 rounded-full p-4">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      )}
      {!large && <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />}
      {large && (
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1">{photo.title}</h3>
          <p className="text-sm text-gray-500">{photo.location}</p>
        </div>
      )}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/90 hover:bg-white text-gray-700">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem>
              <Maximize2 className="w-4 h-4 mr-2" />
              View Full Size
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="w-4 h-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Heart className="w-4 h-4 mr-2" />
              Add to Favorites
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-gray-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function getGridCols(viewMode: ViewMode) {
  switch (viewMode) {
    case "compact":
      return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
    case "comfortable":
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    case "timeline":
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    default:
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  }
} 