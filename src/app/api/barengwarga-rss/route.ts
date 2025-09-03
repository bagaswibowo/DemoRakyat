import { NextRequest, NextResponse } from 'next/server'
import Parser from 'rss-parser'
import { TwitterPost } from '@/types'

// Force dynamic rendering untuk API route
export const dynamic = 'force-dynamic'
export const revalidate = 300 // Cache 5 menit

const parser = new Parser({
  customFields: {
    item: ['media:content', 'content:encoded', 'description', 'media:thumbnail', 'enclosure'],
  },
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    console.log('Fetching @barengwarga RSS feed...')

    const RSS_URL = 'https://rss.app/feeds/NG1eVRtTaxKLm5jj.xml'

    const response = await fetch(RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BarengWargaBot/1.0)',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      // Cache untuk 5 menit
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const xmlText = await response.text()
    const parsed = await parser.parseString(xmlText)

    if (!parsed.items || parsed.items.length === 0) {
      return NextResponse.json({
        success: true,
        posts: [],
        count: 0,
        message: 'No posts found',
        lastUpdated: new Date().toISOString(),
      })
    }

        // Transform RSS items ke format TwitterPost
    const posts: TwitterPost[] = parsed.items
      .slice(0, limit)
      .map((item: any, index: number) => {
        const title = String(item.title || 'Tweet tidak memiliki konten')
        const description = String(item.description || item.summary || item.contentSnippet || '')
        const link = String(item.link || item.guid || '')
        const pubDate = String(item.pubDate || item.isoDate || new Date().toISOString())
        const author = String(item.author || item.creator || 'BarengWarga')

        // Extract image from various sources
        let image: string | undefined
        let hasMedia = false

        try {
          // Check media:content field
          if (item['media:content'] && Array.isArray(item['media:content'])) {
            const mediaContent = item['media:content'][0]
            if (mediaContent && mediaContent.$ && mediaContent.$.url) {
              image = mediaContent.$.url
              hasMedia = true
            }
          } else if (item['media:content'] && typeof item['media:content'] === 'object') {
            const mediaContent = item['media:content']
            if (mediaContent.$ && mediaContent.$.url) {
              image = mediaContent.$.url
              hasMedia = true
            }
          }

          // Check media:thumbnail if no media:content found
          if (!image && item['media:thumbnail'] && Array.isArray(item['media:thumbnail'])) {
            const thumbnail = item['media:thumbnail'][0]
            if (thumbnail && thumbnail.$ && thumbnail.$.url) {
              image = thumbnail.$.url
              hasMedia = true
            }
          } else if (!image && item['media:thumbnail'] && typeof item['media:thumbnail'] === 'object') {
            const thumbnail = item['media:thumbnail']
            if (thumbnail.$ && thumbnail.$.url) {
              image = thumbnail.$.url
              hasMedia = true
            }
          }

          // Check enclosure field
          if (!image && item.enclosure && typeof item.enclosure === 'object') {
            const enclosure = item.enclosure as { url?: string; type?: string }
            if (
              enclosure.url &&
              enclosure.type &&
              enclosure.type.startsWith('image/')
            ) {
              image = enclosure.url
              hasMedia = true
            }
          }

          // Extract image from description HTML
          if (!image && description) {
            const imgRegex = /<img[^>]+src="([^">]+)"/
            const imgMatch = imgRegex.exec(description)
            if (imgMatch && imgMatch[1]) {
              image = imgMatch[1]
              hasMedia = true
            }
          }
        } catch (error) {
          console.warn('Error processing media for item:', error)
        }

        return {
          id: `barengwarga-${index}-${Date.now()}`,
          title,
          link,
          pubDate,
          description,
          author,
          image,
          hasMedia,
        }
      })

    console.log(`Successfully fetched ${posts.length} posts from @barengwarga`)

    return NextResponse.json({
      success: true,
      count: posts.length,
      posts,
      lastUpdated: new Date().toISOString(),
      source: '@barengwarga',
      feedUrl: RSS_URL,
    })
  } catch (error) {
    console.error('Error fetching @barengwarga RSS:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch RSS feed',
        message: error instanceof Error ? error.message : 'Unknown error',
        posts: [],
        count: 0,
      },
      { status: 500 }
    )
  }
}
