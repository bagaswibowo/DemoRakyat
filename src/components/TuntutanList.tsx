'use client'

import { tuntutan1Minggu, tuntutan1Tahun } from '@/data/tuntutan'
import { Tuntutan } from '@/types'

interface TuntutanListProps {
  timeframe: '1-minggu' | '1-tahun'
}

export function TuntutanList({ timeframe }: TuntutanListProps) {
  const currentTuntutan = timeframe === '1-minggu' ? tuntutan1Minggu : tuntutan1Tahun
  const titleText =
    timeframe === '1-minggu' ? 'TUNTUTAN RAKYAT DALAM 1 MINGGU' : 'TUNTUTAN RAKYAT DALAM 1 TAHUN'
  const deadlineText =
    timeframe === '1-minggu' ? 'Deadline: 5 September 2025' : 'Deadline: 31 Agustus 2026'
  const totalCount = timeframe === '1-minggu' ? '17' : '8'

  const groupedTuntutan = currentTuntutan.reduce(
    (acc, tuntutan) => {
      if (!acc[tuntutan.category]) {
        acc[tuntutan.category] = []
      }
      acc[tuntutan.category].push(tuntutan)
      return acc
    },
    {} as Record<string, Tuntutan[]>
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-red-100 text-red-800'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴'
      case 'medium':
        return '🟡'
      default:
        return '🟢'
    }
  }

  return (
    <div id="tuntutan-section" className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{totalCount}+8 TUNTUTAN RAKYAT</h1>
        <p className="text-xl text-red-600 font-semibold mb-6">{titleText}</p>
        <p className="text-gray-600 mb-8">{deadlineText}</p>
      </div>

      {Object.entries(groupedTuntutan).map(([category, tuntutans]) => (
        <div key={category} className="bg-white rounded-xl shadow-lg p-6 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
            {timeframe === '1-minggu' ? `Tugas ${category}` : category}
          </h2>

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
                    <div className="flex-grow pr-4">
                      <p className="text-gray-800 font-medium leading-relaxed mb-2">
                        {tuntutan.title}
                      </p>
                      {tuntutan.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {tuntutan.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-lg">{getPriorityIcon(tuntutan.priority)}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tuntutan.status)}`}
                      >
                        {tuntutan.status === 'pending'
                          ? 'Belum Dipenuhi'
                          : tuntutan.status === 'in-progress'
                            ? 'Dalam Proses'
                            : 'Selesai'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
