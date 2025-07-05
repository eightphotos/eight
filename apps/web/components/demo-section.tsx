import { 
  Folder, 
  Image, 
  Video, 
  Music, 
  Share, 
  Plus, 
  Filter,
  MoreHorizontal,
  Search
} from "lucide-react"

export function DemoSection() {
  const files = [
    {
      name: "Images",
      type: "folder",
      date: "Jun 12, 2025",
      owner: "You",
      size: "—",
      tags: ["Work"],
      color: "blue"
    },
    {
      name: "Videos",
      type: "folder", 
      date: "Jun 3, 2025",
      owner: "You",
      size: "—",
      tags: ["Personal", "Important"],
      color: "green"
    },
    {
      name: "Music",
      type: "folder",
      date: "Dec 31, 2024",
      owner: "You", 
      size: "—",
      tags: [],
      color: "purple"
    }
  ]

  const getFileIcon = (type: string, color: string) => {
    const iconProps = { size: 20, className: `text-${color}-500` }
    switch (type) {
      case "folder":
        return <Folder {...iconProps} />
      case "image":
        return <Image {...iconProps} />
      case "video":
        return <Video {...iconProps} />
      case "music":
        return <Music {...iconProps} />
      default:
        return <Folder {...iconProps} />
    }
  }

  return (
    <section className="relative z-10 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Demo Interface */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-white font-medium">Aaron Mathke</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Nimbus</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-400 text-sm">My files</span>
                <span className="text-gray-400 text-sm">Documents</span>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-gray-850 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search your Files"
                  className="bg-gray-800 text-white text-sm px-10 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-800 transition-colors" aria-label="Filter files">
                <Filter size={16} />
              </button>
              <button className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-800 transition-colors" aria-label="Share files">
                <Share size={16} />
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                <Plus size={14} />
                New
              </button>
            </div>
          </div>

          {/* File List Header */}
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Last modified</div>
              <div className="col-span-2">Owner</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Tags</div>
            </div>
          </div>

          {/* File List */}
          <div className="bg-gray-900">
            {files.map((file, index) => (
              <div
                key={index}
                className="px-4 py-3 border-b border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 flex items-center gap-3">
                    {getFileIcon(file.type, file.color)}
                    <span className="text-white text-sm font-medium">{file.name}</span>
                  </div>
                  <div className="col-span-2 text-gray-400 text-sm">{file.date}</div>
                  <div className="col-span-2 text-gray-400 text-sm">{file.owner}</div>
                  <div className="col-span-2 text-gray-400 text-sm">{file.size}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    {file.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tag === "Work" 
                            ? "bg-blue-100 text-blue-800" 
                            : tag === "Personal"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 