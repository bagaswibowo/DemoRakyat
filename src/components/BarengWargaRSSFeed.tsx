'use client'

import { useState, useEffect, useCallback } from 'react'
import { ClientOnly } from './ClientOnly'
import { TwitterPost } from '@/types'
import { formatDate, cleanTweetText, API_ENDPOINTS, REFRESH_INTERVALS } from '@/lib'
import {
  Twitter,
  Loader,
  AlertCircle,
  MessageSquare,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react'

interface BarengWargaFeedProps {
  limit?: number
  className?: string
  showHeader?: boolean
}

export function BarengWargaFeed({
  limit = 10,
  className = '',
  showHeader = true,
}: BarengWargaFeedProps) {
  const [posts, setPosts] = useState<TwitterPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_ENDPOINTS.BARENGWARGA_RSS}?limit=${limit}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON')
      }

      const text = await response.text()
      if (!text.trim()) {
        throw new Error('Empty response')
      }

      const data = JSON.parse(text)

      if (data.success) {
        setPosts(data.posts || [])
        setLastUpdated(data.lastUpdated)
      } else {
        setError(data.message || 'Failed to fetch posts')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
      console.error('Error fetching @barengwarga posts:', err)
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchPosts()

    const interval = setInterval(fetchPosts, REFRESH_INTERVALS.TWITTER_FEED)
    return () => clearInterval(interval)
  }, [fetchPosts])

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showHeader && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Twitter className="w-5 h-5 text-blue-500" />
              Update dari @barengwarga
            </h2>
            <Loader className="animate-spin text-blue-600 w-5 h-5" />
          </div>
        )}
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showHeader && (
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Twitter className="w-5 h-5 text-blue-500" />
            Update dari @barengwarga
          </h2>
        )}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Gagal memuat postingan Twitter</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={fetchPosts}
                className="mt-2 text-sm text-red-800 underline hover:text-red-900"
              >
                Coba lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showHeader && (
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Twitter className="w-5 h-5 text-blue-500" />
            Update dari @barengwarga
          </h2>
        )}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500">Belum ada postingan terbaru</p>
        </div>
      </div>
    )
  }

  return (
    <ClientOnly>
      <div className={`space-y-4 ${className}`}>
        {showHeader && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Twitter className="w-5 h-5 text-blue-500" />
              Update @barengwarga
            </h2>
            {lastUpdated && (
              <span className="text-xs text-gray-500">Update: {formatDate(lastUpdated)}</span>
            )}
          </div>
        )}

        <div className="grid gap-4">
          {posts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Twitter className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 mb-3">
                    <p className="text-sm leading-relaxed mb-3">{cleanTweetText(post.title)}</p>

                    {post.image && (
                      <div className="rounded-lg overflow-hidden border border-gray-200 mb-3">
                        <img
                          src={post.image}
                          alt="Media dari tweet"
                          className="w-full h-auto max-h-64 object-cover"
                          onError={e => {
                            ;(e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      </div>
                    )}

                    {!post.image && post.hasMedia && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <div className="flex items-center space-x-2 text-blue-700">
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">Media tersedia</span>
                        </div>
                        <p className="text-xs text-blue-600 mt-1">
                          Klik &ldquo;Lihat di X&rdquo; untuk melihat gambar/video
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-blue-600">@barengwarga</span>
                      <span>•</span>
                      <time dateTime={post.pubDate}>{formatDate(post.pubDate)}</time>
                    </div>

                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <span>Lihat di X</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-400">RSS feed @barengwarga • Update setiap 5 menit</p>
        </div>
      </div>
    </ClientOnly>
  )
}
