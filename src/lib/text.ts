/**
 * Utility functions for text processing and manipulation
 */

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function cleanTweetText(text: string): string {
  // Remove pic.twitter.com links
  let cleaned = text.replace(/pic\.twitter\.com\/[a-zA-Z0-9]+/g, '').trim()

  // Remove duplicate spaces
  cleaned = cleaned.replace(/\s+/g, ' ')

  // Remove trailing dots if more than 3
  cleaned = cleaned.replace(/\.{4,}$/, '...')

  return cleaned
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

export function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.match(urlRegex) || []
}

export function highlightKeywords(text: string, keywords: string[]): string {
  let highlighted = text
  keywords.forEach(keyword => {
    const regex = new RegExp(`(${keyword})`, 'gi')
    highlighted = highlighted.replace(regex, '<mark>$1</mark>')
  })
  return highlighted
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}
