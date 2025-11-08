"use client"

import { useState } from "react"
import { MapPin, AlertCircle } from "lucide-react"

interface RouteCalculatorProps {
  onStartChange: (location: { lat: number; lng: number }) => void
  onEndChange: (location: { lat: number; lng: number }) => void
  onRouteCalculated: (routes: any[]) => void
}

// Mock location data for Indian cities
const indianCities = [
  { name: "Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
]

export default function RouteCalculator({ onStartChange, onEndChange, onRouteCalculated }: RouteCalculatorProps) {
  const [startCity, setStartCity] = useState("")
  const [endCity, setEndCity] = useState("")
  const [error, setError] = useState("")

  const handleCalculateRoute = () => {
    setError("")

    if (!startCity || !endCity) {
      setError("Please select both start and end locations")
      return
    }

    if (startCity === endCity) {
      setError("Start and end locations must be different")
      return
    }

    const start = indianCities.find((c) => c.name === startCity)
    const end = indianCities.find((c) => c.name === endCity)

    if (start && end) {
      onStartChange({ lat: start.lat, lng: start.lng })
      onEndChange({ lat: end.lat, lng: end.lng })

      // Mock route calculation
      const mockRoutes = [
        {
          id: 1,
          distance: "150 km",
          duration: "2h 30m",
          safetyScore: 8,
        },
        {
          id: 2,
          distance: "165 km",
          duration: "2h 45m",
          safetyScore: 6,
        },
        {
          id: 3,
          distance: "140 km",
          duration: "2h 20m",
          safetyScore: 4,
        },
      ]

      onRouteCalculated(mockRoutes)
    }
  }

  return (
    <div className="bg-purple-800/40 border-2 border-purple-600/30 rounded-xl p-4 space-y-4">
      <h2 className="font-semibold text-lg">Find Your Route</h2>

      <div>
        <label className="block text-sm font-semibold mb-2">From:</label>
        <select
          value={startCity}
          onChange={(e) => setStartCity(e.target.value)}
          className="w-full px-3 py-2 bg-purple-700/30 border border-purple-600/50 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
        >
          <option value="">Select start city</option>
          {indianCities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">To:</label>
        <select
          value={endCity}
          onChange={(e) => setEndCity(e.target.value)}
          className="w-full px-3 py-2 bg-purple-700/30 border border-purple-600/50 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
        >
          <option value="">Select end city</option>
          {indianCities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <button
        onClick={handleCalculateRoute}
        className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-400 rounded-lg font-semibold transition flex items-center justify-center gap-2"
      >
        <MapPin className="w-4 h-4" />
        Calculate Routes
      </button>
    </div>
  )
}
