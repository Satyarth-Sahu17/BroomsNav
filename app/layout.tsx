import type React from "react"
import type { Metadata } from "next"
import "./globals.css" // Import globals.css at the top of the file

export const metadata: Metadata = {
  title: "BroomNav - Haunted Route Navigator",
  description: "Navigate safely through the spooky streets",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script async defer src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <nav className="flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold">
            <span className="ghost">👻</span> BroomNav
          </div>
          <div className="flex gap-6">
            <a href="/" className="hover:text-yellow-300 transition">
              Home
            </a>
            <a href="/map" className="hover:text-yellow-300 transition">
              Map
            </a>
            <a href="/report" className="hover:text-yellow-300 transition">
              Report
            </a>
            <a href="/about" className="hover:text-yellow-300 transition">
              About
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
