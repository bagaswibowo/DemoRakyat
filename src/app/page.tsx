'use client'

import { useState } from 'react'
import { CountdownTimer } from '@/components/CountdownTimer'
import { TuntutanList } from '@/components/TuntutanList'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/HeroSection'
import { NewsFeed } from '@/components/NewsFeed'
import { BarengWargaFeed } from '@/components/BarengWargaRSSFeed'

export default function Home() {
  const [timeframe, setTimeframe] = useState<'1-minggu' | '1-tahun'>('1-minggu')

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Navigation />
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <CountdownTimer timeframe={timeframe} onTimeframeChange={setTimeframe} />
        <TuntutanList timeframe={timeframe} />

        {/* Real-time News & Social Media Feeds */}
        <div className="mt-16 mb-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Live News Feed */}
          <NewsFeed
            limit={8}
            keywords="demo,tuntutan,rakyat,mahasiswa,aksi,transparansi,DPR,pemerintah"
            className="h-fit"
          />

          {/* Twitter Feed */}
          <BarengWargaFeed limit={8} className="h-fit" showHeader={true} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
