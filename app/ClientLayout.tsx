"use client"

import type React from "react"

import { useEffect, useState } from "react"

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    // Check if the screen width is mobile-sized
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        {isMobile ? (
          children
        ) : (
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
              <h1 className="text-2xl font-bold text-green-500 mb-4">guli</h1>
              <p className="mb-4">This application is designed for mobile devices only.</p>
              <p className="text-sm text-gray-500">
                Please access this site from a mobile device or resize your browser window.
              </p>
            </div>
          </div>
        )}
      </body>
    </html>
  )
}

