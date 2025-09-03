'use client'

import { useState, useEffect, useCallback } from 'react'
import { ClientOnly } from './ClientOnly'
import { TwitterPost } from '@/types'
import { formatDate, cleanTweetText, API_ENDPOINTS, REFRESH_INTERVALS } from '@/utils'

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

    // Auto refresh setiap 5 menit
    const interval = setInterval(fetchPosts, REFRESH_INTERVALS.TWITTER_FEED)
    return () => clearInterval(interval)
  }, [fetchPosts])

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showHeader && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">🐦 Update dari @barengwarga</h2>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
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
          <h2 className="text-xl font-bold text-gray-900">🐦 Update dari @barengwarga</h2>
        )}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
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
          <h2 className="text-xl font-bold text-gray-900">🐦 Update dari @barengwarga</h2>
        )}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-2">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
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
            <h2 className="text-xl font-bold text-gray-900">🐦 Update @barengwarga</h2>
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
                {/* Twitter Icon */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Content */}
                  <div className="text-gray-900 mb-3">
                    <p className="text-sm leading-relaxed mb-3">{cleanTweetText(post.title)}</p>

                    {/* Media Preview */}
                    {post.image && (
                      <div className="rounded-lg overflow-hidden border border-gray-200 mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.image}
                          alt="Media dari tweet"
                          className="w-full h-auto max-h-64 object-cover"
                          onError={e => {
                            // Hide image if it fails to load
                            ;(e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      </div>
                    )}

                    {/* Media Indicator for pic.twitter.com */}
                    {!post.image && post.hasMedia && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <div className="flex items-center space-x-2 text-blue-700">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm font-medium">Media tersedia</span>
                        </div>
                        <p className="text-xs text-blue-600 mt-1">
                          Klik &ldquo;Lihat di X&rdquo; untuk melihat gambar/video
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
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
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-400">RSS feed @barengwarga • Update setiap 5 menit</p>
        </div>
      </div>
    </ClientOnly>
  )
}
