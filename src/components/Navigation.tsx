'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-red-600">
            17+8 Tuntutan Rakyat
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
              Beranda
            </Link>
            <Link href="/tuntutan" className="text-gray-700 hover:text-red-600 transition-colors">
              Tuntutan Rakyat
            </Link>
            <Link
              href="/panduan-demo"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Panduan Demonstrasi
            </Link>
            <Link href="/progress" className="text-gray-700 hover:text-red-600 transition-colors">
              Progress Tracker
            </Link>
            <Link href="/berita" className="text-gray-700 hover:text-red-600 transition-colors">
              Berita & Update
            </Link>
            <Link href="/tentang" className="text-gray-700 hover:text-red-600 transition-colors">
              Tentang
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-red-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-700 hover:text-red-600 py-2">
                Beranda
              </Link>
              <Link href="/tuntutan" className="text-gray-700 hover:text-red-600 py-2">
                Tuntutan Rakyat
              </Link>
              <Link href="/panduan-demo" className="text-gray-700 hover:text-red-600 py-2">
                Panduan Demonstrasi
              </Link>
              <Link href="/progress" className="text-gray-700 hover:text-red-600 py-2">
                Progress Tracker
              </Link>
              <Link href="/berita" className="text-gray-700 hover:text-red-600 py-2">
                Berita & Update
              </Link>
              <Link href="/tentang" className="text-gray-700 hover:text-red-600 py-2">
                Tentang
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
