import { NextRequest, NextResponse } from 'next/server'
import Parser from 'rss-parser'

// Force dynamic rendering untuk API route
export const dynamic = 'force-dynamic'
export const revalidate = 0

const parser = new Parser({
  customFields: {
    item: ['media:content', 'content:encoded', 'description'],
  },
})

// RSS feeds untuk berita terkait demo/tuntutan rakyat
const RSS_FEEDS = [
  {
    name: 'Google News - Demo & Tuntutan',
    url: 'https://news.google.com/rss/search?q=demo+OR+tuntutan+OR+demonstrasi+OR+"unjuk+rasa"+OR+"aksi+massa"+OR+protes&hl=id&gl=ID&ceid=ID:id',
    source: 'Google News',
    priority: 1,
  },
  {
    name: 'Google News - Mahasiswa',
    url: 'https://news.google.com/rss/search?q=mahasiswa+demo+OR+mahasiswa+tuntutan+OR+mahasiswa+unjuk+rasa&hl=id&gl=ID&ceid=ID:id',
    source: 'Google News Mahasiswa',
    priority: 1,
  },
  {
    name: 'Tempo',
    url: 'https://www.tempo.co/rss',
    source: 'Tempo.co',
    priority: 2,
  },
  {
    name: 'CNN Indonesia',
    url: 'https://www.cnnindonesia.com/rss',
    source: 'CNN Indonesia',
    priority: 3,
  },
]

interface NewsItem {
  id: string
  title: string
  description: string
  link: string
  pubDate: string
  source: string
  author?: string
  thumbnail?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    // Note: keywords parameter available but we use predefined priority-based keywords
    // const keywords = searchParams.get('keywords') || 'demo,tuntutan,demonstrasi...'

    console.log('Fetching RSS feeds...')

    const allNews: NewsItem[] = []

    // Fetch dari semua RSS feeds
    for (const feed of RSS_FEEDS) {
      try {
        console.log(`Fetching from ${feed.source}...`)

        const response = await fetch(feed.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
          },
          // Cache untuk 5 menit
          next: { revalidate: 300 },
        })

        if (!response.ok) {
          console.warn(`Failed to fetch ${feed.source}: ${response.status}`)
          continue
        }

        const xml = await response.text()
        const parsed = await parser.parseString(xml)

        if (parsed.items) {
          // Filter berita yang relevan berdasarkan keywords dengan scoring
          // Keywords dengan prioritas tinggi
          const highPriorityKeywords = [
            'demo',
            'tuntutan',
            'demonstrasi',
            'unjuk rasa',
            'aksi massa',
            'protes',
          ]
          const mediumPriorityKeywords = ['mahasiswa', 'aktivis', 'reformasi']
          const lowPriorityKeywords = ['buruh', 'petani']

          const relevantNews = parsed.items
            .map((item: any) => {
              const title = String(item.title || '').toLowerCase()
              const description = String(item.description || item.summary || '').toLowerCase()
              const content = title + ' ' + description

              // Scoring system
              let score = 0

              // Check high priority keywords
              highPriorityKeywords.forEach(keyword => {
                if (content.includes(keyword)) score += 3
              })

              // Check medium priority keywords
              mediumPriorityKeywords.forEach(keyword => {
                if (content.includes(keyword)) score += 2
              })

              // Check low priority keywords
              lowPriorityKeywords.forEach(keyword => {
                if (content.includes(keyword)) score += 1
              })

              return { item, score, content }
            })
            .filter(news => news.score > 0) // Only include relevant news
            .sort((a, b) => b.score - a.score) // Sort by relevance score
            .slice(0, limit) // Limit results
            .map(({ item }) => ({
              id: `${feed.source}-${Date.now()}-${Math.random()}`,
              title: String(item.title || 'Tanpa Judul'),
              description: String(item.description || item.summary || item.contentSnippet || 'Tidak ada deskripsi'),
              link: String(item.link || item.guid || ''),
              pubDate: String(item.pubDate || item.isoDate || new Date().toISOString()),
              source: feed.source,
              author: item.author || item.creator,
              thumbnail: item['media:content']?.$?.url || undefined,
            }))

          allNews.push(...relevantNews)
          console.log(`Found ${relevantNews.length} relevant articles from ${feed.source}`)
        }
      } catch (error) {
        console.error(`Error fetching ${feed.source}:`, error)
        continue
      }
    }

    // Sort by priority feed first, then by date (newest first) dan limit hasil
    const sortedNews = allNews
      .sort((a, b) => {
        // First sort by source priority (Google News first)
        const aPriority = RSS_FEEDS.find(feed => feed.source === a.source)?.priority || 999
        const bPriority = RSS_FEEDS.find(feed => feed.source === b.source)?.priority || 999

        if (aPriority !== bPriority) {
          return aPriority - bPriority
        }

        // Then sort by date
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      })
      .slice(0, limit)

    console.log(`Total news found: ${sortedNews.length}`)

    return NextResponse.json({
      success: true,
      count: sortedNews.length,
      news: sortedNews,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error in news API:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch news',
        message: error instanceof Error ? error.message : 'Unknown error',
        news: [],
        count: 0,
      },
      { status: 500 }
    )
  }
}
