'use client'

import { useState, useEffect, useCallback } from 'react'
import { ClientOnly } from './ClientOnly'
import { NewsArticle } from '@/types'
import { formatDate, truncateText, API_ENDPOINTS, REFRESH_INTERVALS } from '@/lib'
import {
  Newspaper,
  RefreshCw,
  AlertTriangle,
  PenSquare,
  Rss,
  Loader,
  ExternalLink,
} from 'lucide-react'

interface NewsFeedProps {
  limit?: number
  keywords?: string
  className?: string
}

const DEFAULT_KEYWORDS =
  'demo,tuntutan,demonstrasi,unjuk rasa,aksi massa,protes,reformasi,mahasiswa,aktivis'

export function NewsFeed({
  limit = 10,
  keywords = DEFAULT_KEYWORDS,
  className = '',
}: NewsFeedProps) {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `${API_ENDPOINTS.NEWS}?limit=${limit}&keywords=${encodeURIComponent(keywords)}`
      )
      const data = await response.json()

      if (data.success) {
        setNews(data.news || [])
        setLastUpdated(data.lastUpdated)
      } else {
        setError(data.message || 'Failed to fetch news')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }, [limit, keywords])

  useEffect(() => {
    fetchNews()

    const interval = setInterval(fetchNews, REFRESH_INTERVALS.NEWS_FEED)
    return () => clearInterval(interval)
  }, [fetchNews])

  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'tempo.co':
        return 'bg-red-100 text-red-800'
      case 'cnn indonesia':
        return 'bg-blue-100 text-blue-800'
      case 'cnbc indonesia':
        return 'bg-green-100 text-green-800'
      case 'detik.com':
        return 'bg-orange-100 text-orange-800'
      case 'google news':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Newspaper className="w-6 h-6" />
            Berita Terbaru
          </h2>
          <div className="flex items-center gap-2">
            <Loader className="w-4 h-4 animate-spin" />
            <span className="text-sm text-gray-500">Memuat...</span>
          </div>
        </div>

        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Newspaper className="w-6 h-6" />
            Berita Terbaru
          </h2>
          <button
            onClick={fetchNews}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            <RefreshCw className="w-3 h-3" />
            Coba Lagi
          </button>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Gagal memuat berita</span>
          </div>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Newspaper className="w-6 h-6" />
          Berita Terbaru
        </h2>
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500">
            <ClientOnly>{lastUpdated && `Update: ${formatDate(lastUpdated)}`}</ClientOnly>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Live</span>
          </div>
          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-8">
          <Newspaper className="w-12 h-12 mx-auto text-gray-300 mb-2" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">Belum ada berita terbaru</h3>
          <p className="text-gray-600 text-sm">Coba refresh atau periksa koneksi internet Anda</p>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map(item => (
            <article
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(item.source)}`}
                >
                  {item.source}
                </span>
                <span className="text-xs text-gray-500">
                  <ClientOnly>{formatDate(item.pubDate)}</ClientOnly>
                </span>
              </div>

              <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {truncateText(item.description.replace(/<[^>]*>/g, ''), 150)}
              </p>

              <div className="flex items-center justify-between">
                {item.author && (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <PenSquare className="w-3 h-3" /> {item.author}
                  </span>
                )}
                <span className="text-blue-600 text-sm font-medium group-hover:underline flex items-center gap-1">
                  Baca selengkapnya <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
          <Rss className="w-3 h-3" />
          Data diambil secara real-time dari berbagai sumber berita terpercaya
        </p>
        <p className="text-xs text-gray-500 text-center mt-1">
          Auto-refresh setiap 10 menit
        </p>
      </div>
    </div>
  )
}
