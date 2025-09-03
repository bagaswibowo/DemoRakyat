/**
 * Constants used throughout the application
 */

export const API_ENDPOINTS = {
  NEWS: '/api/news',
  BARENGWARGA_RSS: '/api/barengwarga-rss',
} as const

export const REFRESH_INTERVALS = {
  NEWS_FEED: 5 * 60 * 1000, // 5 minutes
  TWITTER_FEED: 5 * 60 * 1000, // 5 minutes
  COUNTDOWN_TIMER: 1000, // 1 second
} as const

export const LIMITS = {
  NEWS_HOMEPAGE: 8,
  NEWS_PAGE: 15,
  TWITTER_HOMEPAGE: 8,
  TWITTER_PAGE: 12,
} as const

export const EXTERNAL_LINKS = {
  BARENGWARGA_TWITTER: 'https://twitter.com/barengwarga',
  GITHUB_REPO: 'https://github.com/tuntutan-rakyat/website',
} as const

export const META = {
  SITE_NAME: '17+8 Tuntutan Rakyat',
  SITE_DESCRIPTION:
    'Platform digital untuk memantau dan mengorganisir tuntutan rakyat terkait reformasi politik dan sosial di Indonesia',
  SITE_URL: 'https://tuntutanrakyat.vercel.app',
} as const
