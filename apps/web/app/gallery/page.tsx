"use client"

import { useState } from "react"
import Sidebar from "@/components/gallery/sidebar"
import TopBar from "@/components/gallery/top-bar"
import PhotoGrid from "@/components/gallery/photo-grid"
import type { Photo } from "@/components/gallery/photo-grid"
import {
  Clock,
  Folder,
  Heart,
  ImageIcon,
  MapPin,
  Package,
  UserCheck,
  Users,
  Video,
} from "lucide-react"

export default function EightPhotosDashboard() {
  const [viewMode, setViewMode] = useState<"compact" | "comfortable" | "timeline">("comfortable")

  const photos: Photo[] = [
    {
      id: "1",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-08",
      title: "Mountain Sunset",
      type: "image",
      size: "2.4MB",
      location: "Swiss Alps",
    },
    {
      id: "2",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-08",
      title: "City Lights",
      type: "image",
      size: "3.1MB",
      location: "New York",
    },
    {
      id: "3",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-07",
      title: "Beach Walk",
      type: "video",
      size: "15.2MB",
      location: "Malibu",
    },
    {
      id: "4",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-07",
      title: "Forest Path",
      type: "image",
      size: "1.8MB",
      location: "Oregon",
    },
    {
      id: "5",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-06",
      title: "Urban Architecture",
      type: "image",
      size: "2.9MB",
      location: "Tokyo",
    },
    {
      id: "6",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-06",
      title: "Street Art",
      type: "image",
      size: "2.2MB",
      location: "Berlin",
    },
    {
      id: "7",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-05",
      title: "Coffee Shop",
      type: "image",
      size: "1.5MB",
      location: "Paris",
    },
    {
      id: "8",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-05",
      title: "Night Sky",
      type: "image",
      size: "4.1MB",
      location: "Arizona",
    },
    {
      id: "9",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-04",
      title: "Morning Coffee",
      type: "image",
      size: "1.9MB",
      location: "Home",
    },
    {
      id: "10",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-04",
      title: "Sunset Drive",
      type: "video",
      size: "22.1MB",
      location: "California",
    },
    {
      id: "11",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-03",
      title: "Garden Flowers",
      type: "image",
      size: "3.2MB",
      location: "Garden",
    },
    {
      id: "12",
      src: "/placeholder.svg?height=500&width=500",
      date: "2025-01-03",
      title: "City Skyline",
      type: "image",
      size: "2.8MB",
      location: "Dubai",
    },
  ]

  const libraryItems = [
    { name: "All Photos", icon: ImageIcon, count: 1247, active: true },
    { name: "Favorites", icon: Heart, count: 89 },
    { name: "Recently Added", icon: Clock, count: 23 },
    { name: "Videos", icon: Video, count: 67 },
    { name: "Shared", icon: Users, count: 34 },
  ]

  const categories = [
    { name: "People & Pets", icon: UserCheck, count: 456 },
    { name: "Places", icon: MapPin, count: 234 },
    { name: "Things", icon: Package, count: 189 },
  ]

  const albums = [
    { name: "Travel 2024", count: 234, icon: Folder },
    { name: "Family", count: 156, icon: Folder },
    { name: "Nature", count: 78, icon: Folder },
  ]

  const groupedPhotos = photos.reduce<Record<string, Photo[]>>((acc, photo) => {
    (acc[photo.date] ||= []).push(photo)
    return acc
  }, {})

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F5F5F5" }}>
      <Sidebar libraryItems={libraryItems} categories={categories} albums={albums} />
      <div className="flex-1 p-6 h-screen">
        <div
          className="h-full rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden"
          style={{ backgroundColor: "#FAFAFA" }}
        >
          <TopBar viewMode={viewMode} setViewMode={setViewMode} />
          <PhotoGrid groupedPhotos={groupedPhotos} viewMode={viewMode} />
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}