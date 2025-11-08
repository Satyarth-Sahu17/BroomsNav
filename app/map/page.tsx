"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import FloatingGhosts from "@/components/floating-ghosts"

interface MapPoint {
  lat: number
  lng: number
  label: string
  type: "start" | "end"
}

export default function MapPage() {
  const [startLocation, setStartLocation] = useState<MapPoint | null>(null)
  const [endLocation, setEndLocation] = useState<MapPoint | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [distance, setDistance] = useState<number | null>(null)

  const indianCities = [
    { name: "Delhi", lat: 28.7041, lng: 77.1025 },
    { name: "Mumbai", lat: 19.076, lng: 72.8777 },
    { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas with haunted gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#0a0e27")
    gradient.addColorStop(0.5, "#1a0033")
    gradient.addColorStop(1, "#0a0e27")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid with purple glow
    ctx.strokeStyle = "rgba(168, 85, 247, 0.1)"
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw map center glow
    const centerGlow = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      400,
    )
    centerGlow.addColorStop(0, "rgba(168, 85, 247, 0.15)")
    centerGlow.addColorStop(1, "transparent")
    ctx.fillStyle = centerGlow
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Plot cities
    indianCities.forEach((city) => {
      const x = ((city.lng - 68) / 32) * canvas.width
      const y = ((35 - city.lat) / 20) * canvas.height

      if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
        // City glow
        const cityGlow = ctx.createRadialGradient(x, y, 0, x, y, 40)
        cityGlow.addColorStop(0, "rgba(200, 100, 255, 0.3)")
        cityGlow.addColorStop(1, "transparent")
        ctx.fillStyle = cityGlow
        ctx.beginPath()
        ctx.arc(x, y, 40, 0, Math.PI * 2)
        ctx.fill()

        // City dot
        ctx.fillStyle = "#c864ff"
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()

        // City label
        ctx.fillStyle = "#e0d5ff"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(city.name, x, y - 20)
      }
    })

    // Draw start location
    if (startLocation) {
      const x = ((startLocation.lng - 68) / 32) * canvas.width
      const y = ((35 - startLocation.lat) / 20) * canvas.height

      const startGlow = ctx.createRadialGradient(x, y, 0, x, y, 60)
      startGlow.addColorStop(0, "rgba(100, 255, 100, 0.6)")
      startGlow.addColorStop(1, "transparent")
      ctx.fillStyle = startGlow
      ctx.beginPath()
      ctx.arc(x, y, 60, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#22c55e"
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw end location
    if (endLocation) {
      const x = ((endLocation.lng - 68) / 32) * canvas.width
      const y = ((35 - endLocation.lat) / 20) * canvas.height

      const endGlow = ctx.createRadialGradient(x, y, 0, x, y, 60)
      endGlow.addColorStop(0, "rgba(255, 100, 100, 0.6)")
      endGlow.addColorStop(1, "transparent")
      ctx.fillStyle = endGlow
      ctx.beginPath()
      ctx.arc(x, y, 60, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#ff6b6b"
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw route line
    if (startLocation && endLocation) {
      const x1 = ((startLocation.lng - 68) / 32) * canvas.width
      const y1 = ((35 - startLocation.lat) / 20) * canvas.height
      const x2 = ((endLocation.lng - 68) / 32) * canvas.width
      const y2 = ((35 - endLocation.lat) / 20) * canvas.height

      // Route glow
      ctx.strokeStyle = "rgba(100, 255, 100, 0.3)"
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // Route line
      ctx.strokeStyle = "#22c55e"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // Calculate distance
      const R = 6371 // Earth's radius in km
      const lat1 = (startLocation.lat * Math.PI) / 180
      const lat2 = (endLocation.lat * Math.PI) / 180
      const deltaLat = ((endLocation.lat - startLocation.lat) * Math.PI) / 180
      const deltaLng = ((endLocation.lng - startLocation.lng) * Math.PI) / 180
      const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const dist = R * c
      setDistance(Math.round(dist))
    }
  }, [startLocation, endLocation])

  const selectCity = (type: "start" | "end", city: (typeof indianCities)[0]) => {
    const point: MapPoint = {
      lat: city.lat,
      lng: city.lng,
      label: city.name,
      type,
    }

    if (type === "start") {
      setStartLocation(point)
    } else {
      setEndLocation(point)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-black text-white relative overflow-hidden">
      <FloatingGhosts />

      <div className="border-b border-purple-700/20 backdrop-blur-md sticky top-0 z-40 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent"
          >
            BroomNav
          </Link>
          <div className="flex gap-8">
            <Link href="/" className="text-slate-300 hover:text-purple-300 transition">
              Home
            </Link>
            <Link href="/map" className="text-purple-300">
              Map
            </Link>
            <Link href="/report" className="text-slate-300 hover:text-purple-300 transition">
              Report
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-purple-300 transition">
              About
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-slate-900/40 border-2 border-purple-600/30 rounded-xl p-4 animate-glow-pulse">
              <h3 className="font-semibold mb-4 text-purple-300 glow-text">Start Point</h3>
              <div className="space-y-2">
                {indianCities.map((city) => (
                  <button
                    key={`start-${city.name}`}
                    onClick={() => selectCity("start", city)}
                    className="w-full text-left px-4 py-2 rounded border border-purple-500/50 bg-purple-900/20 hover:bg-purple-700/40 hover:border-purple-400 transition text-slate-300"
                  >
                    {city.name}
                  </button>
                ))}
              </div>
              {startLocation && (
                <div className="mt-4 p-3 bg-green-900/30 border border-green-500/50 rounded text-green-300 text-sm">
                  ✓ {startLocation.label}
                </div>
              )}
            </div>

            <div
              className="bg-slate-900/40 border-2 border-purple-600/30 rounded-xl p-4 animate-glow-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              <h3 className="font-semibold mb-4 text-purple-300 glow-text">End Point</h3>
              <div className="space-y-2">
                {indianCities.map((city) => (
                  <button
                    key={`end-${city.name}`}
                    onClick={() => selectCity("end", city)}
                    className="w-full text-left px-4 py-2 rounded border border-purple-500/50 bg-purple-900/20 hover:bg-purple-700/40 hover:border-purple-400 transition text-slate-300"
                  >
                    {city.name}
                  </button>
                ))}
              </div>
              {endLocation && (
                <div className="mt-4 p-3 bg-orange-900/30 border border-orange-500/50 rounded text-orange-300 text-sm">
                  ✓ {endLocation.label}
                </div>
              )}
            </div>

            {startLocation && endLocation && distance && (
              <div
                className="bg-slate-900/40 border-2 border-green-600/50 rounded-xl p-4 animate-glow-pulse"
                style={{ animationDelay: "1s" }}
              >
                <h3 className="font-semibold mb-3 text-green-300">Route Calculated</h3>
                <p className="text-sm text-slate-300 mb-2">Distance: ~{distance} km</p>
                <p className="text-sm text-green-300 font-semibold">Safety Score: 8.5/10</p>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <canvas
              ref={canvasRef}
              className="w-full border-2 border-purple-600/50 rounded-xl shadow-2xl shadow-purple-900/50"
              style={{ minHeight: "600px", display: "block" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
