'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CountdownTimer } from '@/components/CountdownTimer'
import { TuntutanList } from '@/components/TuntutanList'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function TuntutanPage() {
  const searchParams = useSearchParams()
  const [timeframe, setTimeframe] = useState<'1-minggu' | '1-tahun'>('1-minggu')

  useEffect(() => {
    const jangka = searchParams.get('jangka')
    if (jangka === '1-tahun') {
      setTimeframe('1-tahun')
    } else {
      setTimeframe('1-minggu')
    }
  }, [searchParams])

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <CountdownTimer timeframe={timeframe} onTimeframeChange={setTimeframe} />
        <TuntutanList timeframe={timeframe} />
      </div>
      <Footer />
    </main>
  )
}
