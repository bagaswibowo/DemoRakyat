/**
 * Utility functions for API and network operations
 */

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3
): Promise<Response> {
  let lastError: Error

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; TuntutanRakyatBot/1.0)',
          Accept: 'application/json, text/plain, */*',
          ...options.headers,
        },
      })

      if (response.ok) {
        return response
      } else if (response.status >= 500 && i < maxRetries) {
        // Retry on server errors
        await delay(Math.pow(2, i) * 1000) // Exponential backoff
        continue
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')
      if (i < maxRetries) {
        await delay(Math.pow(2, i) * 1000) // Exponential backoff
      }
    }
  }

  throw lastError!
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
}
