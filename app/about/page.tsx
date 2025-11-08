"use client"

import Link from "next/link"
import FloatingGhosts from "@/components/floating-ghosts"
import { Heart, Users, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-black text-white relative overflow-hidden">
      <FloatingGhosts />

      <div className="border-b border-purple-700/20 backdrop-blur-md sticky top-0 z-40 bg-black/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">ℹ️ About BroomNav</h1>
          <Link href="/" className="text-slate-300 hover:text-purple-300 transition">
            ← Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative z-20">
        {/* Mission */}
        <section className="bg-slate-900/40 border-2 border-purple-600/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4 text-purple-300">Our Haunted Mission</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            BroomNav is dedicated to making travel safer through India's supernatural underbelly. We combine real-time
            data, community reports, and advanced routing algorithms to help you navigate confidently, avoiding
            paranormal hotspots and selecting the safest possible routes.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-purple-600/30 rounded-xl p-6 hover:border-purple-400/80 transition hover:shadow-lg hover:shadow-purple-500/20">
            <Heart className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-slate-100">Safety First</h3>
            <p className="text-slate-400">Your safety is our top priority in every route recommendation.</p>
          </div>

          <div className="bg-slate-900/40 border border-purple-600/30 rounded-xl p-6 hover:border-purple-400/80 transition hover:shadow-lg hover:shadow-purple-500/20">
            <Users className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-slate-100">Community Driven</h3>
            <p className="text-slate-400">Real reports from real survivors make our data accurate and current.</p>
          </div>

          <div className="bg-slate-900/40 border border-purple-600/30 rounded-xl p-6 hover:border-purple-400/80 transition hover:shadow-lg hover:shadow-purple-500/20">
            <Target className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-slate-100">Data Focused</h3>
            <p className="text-slate-400">Evidence-based recommendations you can trust.</p>
          </div>
        </div>

        {/* How It Works */}
        <section className="bg-slate-900/40 border-2 border-purple-600/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-300">How It Works</h2>
          <div className="space-y-4">
            {[
              { num: 1, title: "Enter Your Route", desc: "Provide your start and destination locations." },
              {
                num: 2,
                title: "Analyze Supernatural Threats",
                desc: "Our algorithm analyzes paranormal activity, lighting, and community reports.",
              },
              {
                num: 3,
                title: "Get Safe Recommendations",
                desc: "Receive color-coded routes with supernatural threat scores.",
              },
              {
                num: 4,
                title: "Travel Safely",
                desc: "Navigate confidently knowing you took the safest route from the darkness.",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center font-bold flex-shrink-0 shadow-lg shadow-purple-500/50">
                  {item.num}
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-100">{item.title}</h4>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-slate-900/40 border-2 border-purple-600/30 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-purple-300">Get In Touch</h2>
          <p className="text-slate-400 mb-6">Have questions or paranormal reports? We'd love to hear from you!</p>
          <a
            href="mailto:safety@broomnav.com"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 rounded-lg font-semibold transition shadow-lg shadow-purple-500/50"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  )
}
