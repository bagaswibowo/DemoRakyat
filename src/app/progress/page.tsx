'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { tuntutan1Minggu, tuntutan1Tahun } from '@/data/tuntutan'
import { Tuntutan } from '@/types'

export default function ProgressPage() {
  const [timeframe, setTimeframe] = useState<'1-minggu' | '1-tahun'>('1-minggu')
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')

  const currentTuntutan = timeframe === '1-minggu' ? tuntutan1Minggu : tuntutan1Tahun

  const filteredTuntutan =
    filter === 'all' ? currentTuntutan : currentTuntutan.filter(t => t.status === filter)

  const getProgressStats = () => {
    const total = currentTuntutan.length
    const completed = currentTuntutan.filter(t => t.status === 'completed').length
    const inProgress = currentTuntutan.filter(t => t.status === 'in-progress').length
    const pending = currentTuntutan.filter(t => t.status === 'pending').length

    return {
      total,
      completed,
      inProgress,
      pending,
      completedPercentage: Math.round((completed / total) * 100),
      inProgressPercentage: Math.round((inProgress / total) * 100),
    }
  }

  const stats = getProgressStats()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesai'
      case 'in-progress':
        return 'Dalam Proses'
      default:
        return 'Belum Dipenuhi'
    }
  }

  const groupedTuntutan = filteredTuntutan.reduce(
    (acc, tuntutan) => {
      if (!acc[tuntutan.category]) {
        acc[tuntutan.category] = []
      }
      acc[tuntutan.category].push(tuntutan)
      return acc
    },
    {} as Record<string, Tuntutan[]>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Navigation />

      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Progress Tracker Tuntutan</h1>
          <p className="text-xl opacity-90">Pantau perkembangan tuntutan rakyat secara real-time</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Timeframe Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setTimeframe('1-minggu')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              timeframe === '1-minggu'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tuntutan 1 Minggu
          </button>
          <button
            onClick={() => setTimeframe('1-tahun')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              timeframe === '1-tahun'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tuntutan 1 Tahun
          </button>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-gray-800 mb-2">{stats.total}</div>
            <div className="text-gray-600">Total Tuntutan</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.completed}</div>
            <div className="text-gray-600">Selesai</div>
            <div className="text-sm text-green-600 font-medium">{stats.completedPercentage}%</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.inProgress}</div>
            <div className="text-gray-600">Dalam Proses</div>
            <div className="text-sm text-yellow-600 font-medium">{stats.inProgressPercentage}%</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{stats.pending}</div>
            <div className="text-gray-600">Belum Dipenuhi</div>
            <div className="text-sm text-red-600 font-medium">
              {Math.round((stats.pending / stats.total) * 100)}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Progress Keseluruhan</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${stats.completedPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>0%</span>
            <span className="font-medium">{stats.completedPercentage}% Selesai</span>
            <span>100%</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Semua ({stats.total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-red-600 text-white'
                : 'bg-white border border-red-300 text-red-700 hover:bg-red-50'
            }`}
          >
            Belum Dipenuhi ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'in-progress'
                ? 'bg-yellow-600 text-white'
                : 'bg-white border border-yellow-300 text-yellow-700 hover:bg-yellow-50'
            }`}
          >
            Dalam Proses ({stats.inProgress})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-white border border-green-300 text-green-700 hover:bg-green-50'
            }`}
          >
            Selesai ({stats.completed})
          </button>
        </div>

        {/* Tuntutan List */}
        <div className="space-y-8">
          {Object.entries(groupedTuntutan).map(([category, tuntutans]) => (
            <div key={category} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">{category}</h2>

              <div className="space-y-4">
                {tuntutans.map(tuntutan => (
                  <div
                    key={tuntutan.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {tuntutan.id}
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-gray-800 font-medium leading-relaxed">
                          {tuntutan.title}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(tuntutan.status)} ml-4`}
                        >
                          {getStatusText(tuntutan.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Deadline: {new Date(tuntutan.deadline).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTuntutan.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Tidak ada tuntutan dengan status ini
            </h3>
            <p className="text-gray-600">Coba pilih filter lain untuk melihat tuntutan</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
