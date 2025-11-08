"use client"
import Link from "next/link"
import { MapPin, AlertTriangle, Zap } from "lucide-react"
import FloatingGhosts from "@/components/floating-ghosts"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-black text-white relative overflow-hidden">
      <FloatingGhosts />

      <nav className="border-b border-purple-700/20 backdrop-blur-md sticky top-0 z-40 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
              👻
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
              BroomNav
            </h1>
          </div>
          <div className="hidden md:flex gap-8">
            <Link href="#" className="hover:text-purple-300 transition text-slate-300">
              Home
            </Link>
            <Link href="/map" className="hover:text-purple-300 transition text-slate-300">
              Map
            </Link>
            <Link href="/report" className="hover:text-purple-300 transition text-slate-300">
              Report
            </Link>
            <Link href="/about" className="hover:text-purple-300 transition text-slate-300">
              About
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold leading-tight text-balance">
              Escape the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500">
                Haunted Paths
              </span>
            </h2>
            <p className="text-lg text-slate-300">
              Navigate through India with supernatural guidance. BroomNav helps you avoid paranormal hotspots and find
              the safest routes with real-time danger analysis.
            </p>
            <div className="flex gap-4 pt-4">
              <Link
                href="/map"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg shadow-purple-500/50"
              >
                Begin Journey
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 border-2 border-purple-500/50 hover:border-purple-400 hover:bg-purple-400/10 rounded-lg font-semibold transition text-purple-300"
              >
                Read Lore
              </Link>
            </div>
          </div>

          <div className="relative h-80 bg-gradient-to-br from-purple-900/20 to-slate-900/20 border-2 border-purple-600/40 rounded-2xl overflow-hidden group hover:border-purple-400/80 transition shadow-2xl shadow-purple-900/30">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-slate-900/40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="w-24 h-24 text-purple-400 opacity-40 group-hover:opacity-80 transition blur-sm group-hover:blur-none" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="bg-slate-900/40 border border-purple-600/30 p-6 rounded-xl hover:border-purple-400/80 transition hover:shadow-lg hover:shadow-purple-500/20 group">
            <MapPin className="w-8 h-8 text-purple-400 mb-3 group-hover:text-purple-300 transition" />
            <h3 className="text-xl font-semibold mb-2 text-slate-100">Paranormal Route Planning</h3>
            <p className="text-slate-400">
              Get real-time routes with danger zones mapped and supernatural hotspot avoidance.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-purple-600/30 p-6 rounded-xl hover:border-purple-400/80 transition hover:shadow-lg hover:shadow-purple-500/20 group">
            <Zap className="w-8 h-8 text-purple-400 mb-3 group-hover:text-purple-300 transition" />
            <h3 className="text-xl font-semibold mb-2 text-slate-100">Spirit Danger Scores</h3>
            <p className="text-slate-400">
              Analyze routes based on reported hauntings, entity activity, and community warnings.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-purple-600/30 p-6 rounded-xl hover:border-purple-400/80 transition hover:shadow-lg hover:shadow-purple-500/20 group">
            <AlertTriangle className="w-8 h-8 text-purple-400 mb-3 group-hover:text-purple-300 transition" />
            <h3 className="text-xl font-semibold mb-2 text-slate-100">Spectral Reports</h3>
            <p className="text-slate-400">
              Warn fellow travelers by reporting ghostly encounters and cursed locations in real-time.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-purple-700/20 bg-black/40 backdrop-blur-md mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-slate-400">&copy; 2025 BroomNav. Navigate the darkness. Survive the supernatural.</p>
        </div>
      </footer>
    </div>
  )
}
