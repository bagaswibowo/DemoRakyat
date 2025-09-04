'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  ListChecks,
  Newspaper,
  Shield,
  Info,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/tuntutan', label: 'Tuntutan', icon: ListChecks },
  { href: '/berita', label: 'Berita', icon: Newspaper },
  { href: '/panduan-demo', label: 'Panduan', icon: Shield },
  { href: '/tentang', label: 'Tentang', icon: Info },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Top Navigation for Desktop */}
      <nav className="hidden md:flex bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-red-600">
              17+8 Tuntutan Rakyat
            </Link>
            <div className="flex items-center space-x-6">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-700 hover:text-red-600 transition-colors ${
                    pathname === item.href ? 'font-semibold text-red-600' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full transition-colors ${
                  isActive ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className={`text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}

