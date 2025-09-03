export interface Tuntutan {
  id: number
  title: string
  category: string
  deadline: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'high' | 'medium' | 'low'
  description?: string
}

export interface DemonstrationGuide {
  id: string
  category: 'kontak-darurat' | 'persiapan' | 'saat-demo' | 'setelah' | 'hak-hukum'
  title: string
  content: string
  isImportant?: boolean
}

export interface NewsArticle {
  id: string
  title: string
  description: string
  link: string
  pubDate: string
  source: string
  author?: string
  thumbnail?: string
  category?: 'demo' | 'tuntutan' | 'politik' | 'ekonomi'
}

export interface TwitterPost {
  id: string
  title: string
  link: string
  pubDate: string
  description?: string
  author?: string
  image?: string
  hasMedia?: boolean
}
