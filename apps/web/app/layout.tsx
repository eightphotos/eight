import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Eight",
  description:
    "Find your memories instantly with AI-powered photo search that actually understands what's in your pictures. Join the waitlist today.",
  keywords: [
    "photo search",
    "AI photos",
    "image search",
    "photo management",
    "visual search",
  ],
  authors: [{ name: "Eight Team" }],
  creator: "Eight",
  publisher: "Eight",
  openGraph: {
    title: "Eight - Photos you can actually search",
    description:
      "Find your memories instantly with AI-powered photo search that actually understands what's in your pictures. Join the waitlist today.",
    url: "https://eight.photos", 
    siteName: "Eight",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eight - Photos you can actually search",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eight - Photos you can actually search",
    description:
      "Find your memories instantly with AI-powered photo search that actually understands what's in your pictures. Join the waitlist today.",
    images: ["/images/og-image.png"], 
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontJakartaSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
