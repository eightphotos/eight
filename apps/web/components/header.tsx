import { Users, MessageCircle, Github, X, Moon } from "lucide-react"

interface NavbarProps {
  isScrolled: boolean;
}

export function Header({ isScrolled }: NavbarProps) {
  // Icon links as shown in the image, in order: Users, Discord, Github, X, Moon
  const navLinks = [
    {
      name: "Community",
      icon: Users,
      href: "#",
      ariaLabel: "Community"
    },
    {
      name: "Discord",
      icon: MessageCircle,
      href: "https://discord.com/invite/your-invite", // Replace with actual Discord invite
      ariaLabel: "Discord"
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/breathingcode", // Replace with actual GitHub
      ariaLabel: "GitHub"
    },
    {
      name: "X",
      icon: X,
      href: "https://x.com/your-x-handle", // Replace with actual X (Twitter) link
      ariaLabel: "X"
    },
    {
      name: "Theme",
      icon: Moon,
      href: "#",
      ariaLabel: "Toggle dark mode"
    }
  ];

  return (
    <nav
      className={`fixed top-2 border-2 border-gray-200 left-100 right-100 z-50 rounded-3xl transition-all duration-200 backdrop-blur-md ${
        isScrolled 
          ? 'bg-white/90' 
          : 'bg-transparent'
      }`}
      style={{ minHeight: 64 }}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
        {/* Logo
        <div className="flex items-center">
          <div className="w-11 h-11 flex items-center justify-center">
            <img src="/logo.svg" alt="BreathingCode" className="w-9 h-9" />
          </div>
        </div> */}
        {/* Center Nav */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center backdrop-blur-md rounded-full px-8 py-3 gap-10 m-2 border border-gray-200">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-black hover:text-gray-300 transition-colors "
                  aria-label={link.ariaLabel}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <IconComponent size={20} strokeWidth={2} />
                </a>
              );
            })}
          </div>
        </div>
        {/* Right Side
        <div className="flex items-center">
          <a
            href="https://stories.breathingcode.org/"
            className="text-sm text-white transition-colors px-4 py-2 bg-[#4e664e] rounded-full hover:bg-[#4e664e]/90"
            style={{ fontWeight: 400 }}
          >
            Start Breathing
          </a>
        </div> */}
      </div>
    </nav>
  );
}