'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CountdownTimer } from '@/components/CountdownTimer'
import { TuntutanList } from '@/components/TuntutanList'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

function TuntutanPageContent() {
  const searchParams = useSearchParams()
  const initialTimeframe = searchParams.get('timeframe') === '1-tahun' ? '1-tahun' : '1-minggu'
  const [timeframe, setTimeframe] = useState<'1-minggu' | '1-tahun'>(initialTimeframe)

  useEffect(() => {
    setTimeframe(initialTimeframe)
  }, [initialTimeframe])

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-white pb-20 md:pb-0">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Daftar Tuntutan</h1>
        <CountdownTimer timeframe={timeframe} onTimeframeChange={setTimeframe} />
        <TuntutanList timeframe={timeframe} />
      </div>
      <Footer />
    </main>
  )
}

export default function TuntutanPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">Memuat Tuntutan...</div>
      }
    >
      <TuntutanPageContent />
    </Suspense>
  )
}

