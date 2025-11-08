"use client"

import { useEffect, useState } from "react"

interface Ghost {
  id: number
  left: string
  delay: number
  duration: number
}

export default function FloatingGhosts() {
  const [ghosts, setGhosts] = useState<Ghost[]>([])

  useEffect(() => {
    const ghostArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 15 + Math.random() * 10,
    }))
    setGhosts(ghostArray)
  }, [])

  return (
    <>
      <style>{`
        @keyframes float-vertical {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(30px);
          }
        }

        .ghost-floating {
          position: fixed;
          pointer-events: none;
          user-select: none;
          animation: float-vertical linear infinite;
          filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.6));
        }

        .ghost-sway {
          animation: sway 3s ease-in-out infinite;
        }
      `}</style>

      {ghosts.map((ghost) => (
        <div
          key={ghost.id}
          className="ghost-floating ghost-sway text-5xl opacity-70 hover:opacity-100 transition"
          style={{
            left: ghost.left,
            animationDelay: `${ghost.delay}s`,
            animationDuration: `${ghost.duration}s`,
            bottom: "-50px",
            textShadow: "0 0 20px rgba(168, 85, 247, 0.7), 0 0 40px rgba(168, 85, 247, 0.4)",
          }}
        >
          👻
        </div>
      ))}
    </>
  )
}
