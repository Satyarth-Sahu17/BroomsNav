"use client"

import { forwardRef, useEffect, useRef, useState } from "react"

interface MapComponentProps {
  startLocation: { lat: number; lng: number } | null
  endLocation: { lat: number; lng: number } | null
  selectedRoute: any
}

const MapComponent = forwardRef<HTMLDivElement, MapComponentProps>(
  ({ startLocation, endLocation, selectedRoute }, ref) => {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<any>(null)
    const startMarker = useRef<any>(null)
    const endMarker = useRef<any>(null)
    const routeLine = useRef<any>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
      const loadMap = async () => {
        const L = (await import("leaflet")).default
        await import("leaflet/dist/leaflet.css")

        if (!mapContainer.current) return

        // Initialize map
        if (!map.current) {
          map.current = L.map(mapContainer.current).setView([20.5937, 78.9629], 5)

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
            maxZoom: 19,
          }).addTo(map.current)

          setIsLoaded(true)
        }
      }

      loadMap()
    }, [])

    useEffect(() => {
      if (!isLoaded || !map.current) return

      const L = require("leaflet").default

      // Add start marker
      if (startLocation) {
        if (startMarker.current) {
          map.current.removeLayer(startMarker.current)
        }
        const greenIcon = L.icon({
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4IiBmaWxsPSIjMjJjNTVlIi8+PC9zdmc+",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })
        startMarker.current = L.marker([startLocation.lat, startLocation.lng], {
          icon: greenIcon,
        }).addTo(map.current)
      }

      // Add end marker
      if (endLocation) {
        if (endMarker.current) {
          map.current.removeLayer(endMarker.current)
        }
        const redIcon = L.icon({
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4IiBmaWxsPSIjZWYxMDEwIi8+PC9zdmc+",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })
        endMarker.current = L.marker([endLocation.lat, endLocation.lng], {
          icon: redIcon,
        }).addTo(map.current)
      }

      // Draw route
      if (selectedRoute && startLocation && endLocation) {
        if (routeLine.current) {
          map.current.removeLayer(routeLine.current)
        }

        const routeColor =
          selectedRoute.safetyScore >= 7 ? "#22c55e" : selectedRoute.safetyScore >= 4 ? "#eab308" : "#ef1010"

        routeLine.current = L.polyline(
          [
            [startLocation.lat, startLocation.lng],
            [endLocation.lat, endLocation.lng],
          ],
          {
            color: routeColor,
            weight: 4,
            opacity: 0.8,
          },
        ).addTo(map.current)

        // Fit bounds
        const bounds = L.latLngBounds([
          [startLocation.lat, startLocation.lng],
          [endLocation.lat, endLocation.lng],
        ])
        map.current.fitBounds(bounds, { padding: [50, 50] })
      }
    }, [isLoaded, startLocation, endLocation, selectedRoute])

    return (
      <div
        ref={mapContainer}
        className="w-full h-full rounded-xl border-2 border-purple-600/30 overflow-hidden"
        style={{ minHeight: "400px" }}
      />
    )
  },
)

MapComponent.displayName = "MapComponent"
export default MapComponent
