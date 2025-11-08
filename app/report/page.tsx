"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import FloatingGhosts from "@/components/floating-ghosts"
import { AlertTriangle, Send } from "lucide-react"

export default function ReportPage() {
  const [formData, setFormData] = useState({
    location: "",
    type: "unsafe",
    description: "",
    time: "night",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ location: "", type: "unsafe", description: "", time: "night" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-black text-white relative overflow-hidden">
      <FloatingGhosts />

      <div className="border-b border-purple-700/20 backdrop-blur-md sticky top-0 z-40 bg-black/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">⚠️ Report Paranormal Activity</h1>
            <Link href="/" className="text-slate-300 hover:text-purple-300 transition">
              ← Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <div className="bg-slate-900/40 border-2 border-purple-600/30 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-300">Location *</label>
              <input
                type="text"
                placeholder="Enter location or area name"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-300">Report Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-600/30 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                >
                  <option value="unsafe">Unsafe Area</option>
                  <option value="spooky">Spooky/Eerie</option>
                  <option value="poor-lighting">Poor Lighting</option>
                  <option value="accident">Accident Zone</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-300">Time Observed *</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-600/30 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                >
                  <option value="day">Day</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                  <option value="always">Always</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-300">Description *</label>
              <textarea
                placeholder="Describe what makes this area unsafe or spooky..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 rounded-lg font-semibold transition flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg shadow-purple-500/50"
            >
              <Send className="w-5 h-5" />
              Submit Report
            </button>
          </form>

          {submitted && (
            <div className="mt-6 p-4 bg-purple-900/30 border border-purple-500/50 rounded-lg flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-purple-300" />
              <span className="text-purple-300">
                Thank you! Your haunting report has been recorded and will help protect fellow travelers.
              </span>
            </div>
          )}
        </div>

        <div className="mt-8 bg-slate-900/40 border border-purple-600/30 rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-3 text-purple-300">Why Report?</h2>
          <ul className="space-y-2 text-slate-300">
            <li>✓ Help other travelers avoid dangerous areas</li>
            <li>✓ Contribute to real-time safety data</li>
            <li>✓ Improve routing algorithms</li>
            <li>✓ Make communities safer together</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
