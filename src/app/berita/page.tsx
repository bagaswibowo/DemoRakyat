'use client'

import { useEffect, useCallback } from 'react'
import { NewsFeed } from '@/components/NewsFeed'
import { BarengWargaFeed } from '@/components/BarengWargaRSSFeed'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { useNotification } from '@/components/Notification'

export default function BeritaPage() {
  const { showNotification, NotificationProvider } = useNotification()

  // Use useCallback to prevent recreation on every render
  const showWelcomeNotification = useCallback(() => {
    showNotification('🔴 Live Feed: Berita real-time dari RSS dan Twitter RSS!', 'info')
  }, [showNotification])

  useEffect(() => {
    // Show welcome notification only once when component mounts
    showWelcomeNotification()
  }, [showWelcomeNotification])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Navigation />
      <NotificationProvider />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">📰 Berita & Update Real-time</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Informasi terkini seputar demonstrasi, tuntutan rakyat, dan update dari @barengwarga.
              Berita dari RSS feed berbagai media + posting Twitter real-time.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="font-semibold text-blue-900">Feed Berita</h3>
              </div>
              <p className="text-sm text-blue-800">
                Berita terkait demo & tuntutan dari Google News, Tempo, CNN Indonesia
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <h3 className="font-semibold text-green-900">Feed @barengwarga</h3>
              </div>
              <p className="text-sm text-green-800">
                Update langsung dari akun Twitter @barengwarga via RSS feed
              </p>
            </div>
          </div>

          {/* Real-time Feeds */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Live News Feed */}
            <div className="space-y-6">
              <NewsFeed
                limit={15}
                keywords="demo,tuntutan,demonstrasi,unjuk rasa,aksi massa,protes,reformasi,mahasiswa,aktivis"
                className=""
              />
            </div>

            {/* Twitter Feed @barengwarga */}
            <div className="space-y-6">
              <BarengWargaFeed limit={12} className="" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
