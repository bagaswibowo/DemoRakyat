'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  timeframe: '1-minggu' | '1-tahun'
  onTimeframeChange: (timeframe: '1-minggu' | '1-tahun') => void
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ timeframe, onTimeframeChange }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isMounted, setIsMounted] = useState(false)

  const targetDate = timeframe === '1-minggu' ? '2025-09-05T23:59:59' : '2026-08-31T23:59:59'
  const targetDateDisplay = timeframe === '1-minggu' ? '5 September 2025' : '31 Agustus 2026'

  useEffect(() => {
    setIsMounted(true)

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Countdown Sampai</h2>
        <p className="text-lg text-red-600 font-semibold">{targetDateDisplay}</p>
      </div>

      {!isMounted ? (
        <div className="grid grid-cols-4 gap-4 text-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-red-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-700 mb-1">--</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                {['Hari', 'Jam', 'Menit', 'Detik'][i]}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-red-700 mb-1">{timeLeft.days}</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Hari</div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-red-700 mb-1">{timeLeft.hours}</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Jam</div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-red-700 mb-1">{timeLeft.minutes}</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Menit</div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-red-700 mb-1">{timeLeft.seconds}</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Detik</div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => onTimeframeChange('1-minggu')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            timeframe === '1-minggu'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          1 MINGGU
        </button>
        <button
          onClick={() => onTimeframeChange('1-tahun')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            timeframe === '1-tahun'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          1 TAHUN
        </button>
      </div>
    </div>
  )
}
