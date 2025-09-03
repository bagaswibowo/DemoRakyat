'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const panduanCategories = [
  { id: 'rute', name: 'RUTE DEMO', description: 'Pelajari rute dan titik kumpul demonstrasi' },
  { id: 'persiapan', name: 'PERSIAPAN', description: 'Checklist lengkap sebelum demonstrasi' },
  { id: 'saat-demo', name: 'SAAT DEMO', description: 'Panduan keamanan saat demonstrasi' },
  { id: 'setelah', name: 'SETELAH', description: 'Langkah pasca demonstrasi' },
  {
    id: 'kontak-darurat',
    name: 'KONTAK DARURAT',
    description: 'Nomor penting untuk keadaan darurat',
  },
  { id: 'hak-hukum', name: 'HAK HUKUM', description: 'Hak asasi dalam demonstrasi' },
]

const persiapanItems = [
  {
    id: 1,
    text: 'Kenakan pakaian yang nyaman dan tertutup (celana panjang, sepatu tertutup)',
    important: false,
  },
  { id: 2, text: 'Bawa air minum yang cukup (minimal 1 liter)', important: true },
  { id: 3, text: 'Siapkan masker atau kain penutup wajah', important: true },
  { id: 4, text: 'Bawa obat-obatan pribadi yang diperlukan', important: true },
  { id: 5, text: 'Informasikan keluarga/teman tentang keberadaan Anda', important: false },
  { id: 6, text: 'Simpan nomor kontak darurat di ponsel', important: true },
  { id: 7, text: 'Bawa uang tunai secukupnya (hindari membawa barang berharga)', important: true },
  { id: 8, text: 'Pastikan ponsel terisi penuh dan bawa power bank', important: false },
  { id: 9, text: 'Pelajari rute dan titik kumpul demonstrasi', important: false },
  { id: 10, text: 'Siapkan kartu identitas (KTP/SIM) yang masih berlaku', important: true },
]

const kontakDarurat = [
  { name: 'Polda Metro Jaya', number: '(021) 5703001' },
  { name: 'Komnas HAM', number: '(021) 3925230' },
  { name: 'LBH Jakarta', number: '(021) 3190 6910' },
  { name: 'Ambulans Jakarta', number: '119' },
  { name: 'PMI Jakarta', number: '(021) 7992325' },
]

const ruteDemo = [
  {
    title: 'Titik Kumpul',
    description:
      'Identifikasi lokasi berkumpul utama dan alternatif. Pastikan mudah diakses transportasi umum.',
    items: ['Cek aksesibilitas lokasi', 'Siapkan rute alternatif', 'Koordinasi dengan tim'],
  },
  {
    title: 'Jalur Demonstrasi',
    description:
      'Pelajari rute yang akan dilalui, termasuk jalan alternatif jika terjadi situasi darurat.',
    items: ['Peta jalur utama', 'Rute evakuasi darurat', 'Fasilitas umum terdekat'],
  },
  {
    title: 'Navigasi Aman',
    description: 'Gunakan aplikasi navigasi dan simpan koordinat penting untuk kemudahan akses.',
    items: ['Download peta offline', 'Simpan koordinat GPS', 'Bagikan lokasi real-time'],
  },
]

const saatDemoItems = [
  { icon: '👥', title: 'Tetap dalam Kelompok', desc: 'Jangan berpisah dari kelompok demonstrasi' },
  { icon: '🔇', title: 'Hindari Provokasi', desc: 'Jangan merespon tindakan provokatif' },
  { icon: '📹', title: 'Dokumentasi Aman', desc: 'Foto/video untuk keamanan, bukan viral' },
  { icon: '💧', title: 'Hidrasi Teratur', desc: 'Minum air secara teratur' },
  { icon: '🚨', title: 'Waspada Situasi', desc: 'Perhatikan perubahan kondisi sekitar' },
  { icon: '📱', title: 'Komunikasi Aktif', desc: 'Update lokasi ke keluarga/tim' },
]

const setelahDemo = [
  { step: 1, title: 'Evaluasi Kondisi', desc: 'Cek kondisi fisik dan mental setelah demo' },
  { step: 2, title: 'Laporan Kegiatan', desc: 'Dokumentasikan jalannya demonstrasi' },
  { step: 3, title: 'Follow Up', desc: 'Pantau perkembangan tuntutan yang disampaikan' },
  { step: 4, title: 'Refleksi', desc: 'Evaluasi efektivitas dan pembelajaran' },
]

export default function PanduanDemoPage() {
  const [activeCategory, setActiveCategory] = useState('rute')

  const renderContent = () => {
    switch (activeCategory) {
      case 'rute':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pelajari Rute Demonstrasi</h2>
            <p className="text-gray-600 mb-6">
              Memahami rute dan titik kumpul adalah bagian penting dari persiapan demonstrasi yang
              aman
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {ruteDemo.map((item, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-bold text-blue-800 mb-3">{item.title}</h3>
                  <p className="text-blue-700 text-sm mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.items.map((listItem, idx) => (
                      <li key={idx} className="flex items-center text-blue-700 text-sm">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-800 mb-3">Keamanan adalah Prioritas Utama</h3>
              <p className="text-green-700 text-sm mb-4">
                Demonstrasi adalah hak konstitusional setiap warga negara. Namun, keamanan dan
                keselamatan harus selalu menjadi prioritas utama. Ikuti panduan ini dengan seksama
                untuk memastikan partisipasi yang aman dan efektif.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">🛡️</div>
                  <p className="font-semibold text-green-800">Tetap Aman</p>
                  <p className="text-xs text-green-600">Prioritaskan keselamatan pribadi</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🤝</div>
                  <p className="font-semibold text-green-800">Tetap Damai</p>
                  <p className="text-xs text-green-600">Hindari tindakan provokatif</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <p className="font-semibold text-green-800">Tetap Terhubung</p>
                  <p className="text-xs text-green-600">Jaga komunikasi dengan tim</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'persiapan':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Persiapan Sebelum Demonstrasi</h2>
            <p className="text-gray-600 mb-6">
              Hal-hal yang perlu disiapkan sebelum mengikuti demonstrasi
            </p>
            <div className="space-y-4">
              {persiapanItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.id}
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-800">
                      {item.text}
                      {item.important && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">
                          PENTING
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-2">💡 Tips Penting:</h3>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Persiapan yang baik adalah kunci keamanan dalam demonstrasi</li>
                <li>• Prioritaskan item yang ditandai &ldquo;PENTING&rdquo;</li>
                <li>• Koordinasikan dengan kelompok sebelum berangkat</li>
              </ul>
            </div>
          </div>
        )

      case 'kontak-darurat':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kontak Darurat</h2>
            <p className="text-gray-600 mb-6">
              Nomor penting yang perlu dihubungi dalam keadaan darurat
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kontakDarurat.map((kontak, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-red-800 mb-2">{kontak.name}</h3>
                  <p className="text-red-700 text-lg font-mono">{kontak.number}</p>
                  <button className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Hubungi
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case 'saat-demo':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Panduan Saat Demonstrasi</h2>
            <p className="text-gray-600 mb-6">
              Ikuti protokol keamanan ini selama berpartisipasi dalam demonstrasi
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {saatDemoItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="text-center mb-3">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-xs text-center">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-bold text-red-800 mb-3">⚠️ Tindakan Darurat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Jika Situasi Memanas:</h4>
                  <ul className="text-red-600 text-sm space-y-1">
                    <li>• Tetap tenang dan jangan panik</li>
                    <li>• Ikuti instruksi koordinator</li>
                    <li>• Bergerak menjauh dari kerumunan</li>
                    <li>• Cari tempat aman terdekat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Jika Terjadi Bentrokan:</h4>
                  <ul className="text-red-600 text-sm space-y-1">
                    <li>• Segera tinggalkan lokasi</li>
                    <li>• Hubungi kontak darurat</li>
                    <li>• Jauhi area konflik</li>
                    <li>• Prioritaskan keselamatan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 'setelah':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Langkah Setelah Demonstrasi</h2>
            <p className="text-gray-600 mb-6">
              Hal-hal yang perlu dilakukan setelah mengikuti demonstrasi
            </p>

            <div className="space-y-4 mb-8">
              {setelahDemo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-purple-800 mb-1">{item.title}</h3>
                    <p className="text-purple-700 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-yellow-800 mb-3">📝 Dokumentasi Penting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">
                    Yang Perlu Didokumentasikan:
                  </h4>
                  <ul className="text-yellow-600 text-sm space-y-1">
                    <li>• Jumlah peserta demonstrasi</li>
                    <li>• Respons pihak berwenang</li>
                    <li>• Media yang meliput</li>
                    <li>• Reaksi masyarakat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Untuk Evaluasi:</h4>
                  <ul className="text-yellow-600 text-sm space-y-1">
                    <li>• Efektivitas penyampaian pesan</li>
                    <li>• Aspek keamanan yang perlu diperbaiki</li>
                    <li>• Strategi komunikasi selanjutnya</li>
                    <li>• Rencana tindak lanjut</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 'hak-hukum':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hak Hukum Demonstran</h2>
            <p className="text-gray-600 mb-6">
              Ketahui hak-hak Anda sebagai warga negara saat berpartisipasi dalam demonstrasi
            </p>

            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-bold text-yellow-800 mb-4">📜 Hak Dasar Demonstran</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-yellow-700 space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-2"></span>
                      Hak untuk berkumpul dan menyampaikan pendapat
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-2"></span>
                      Hak untuk tidak ditahan tanpa alasan yang jelas
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-2"></span>
                      Hak untuk mendapat perlakuan yang manusiawi
                    </li>
                  </ul>
                  <ul className="text-yellow-700 space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-2"></span>
                      Hak untuk mendapat bantuan medis jika diperlukan
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-2"></span>
                      Hak untuk mendapat bantuan hukum
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-2"></span>
                      Hak untuk melaporkan pelanggaran HAM
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-bold text-orange-800 mb-4">⚖️ Jika Ditahan atau Diamankan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-3">Hak Anda:</h4>
                    <ul className="text-orange-600 space-y-2 text-sm">
                      <li>• Berhak mengetahui alasan penangkapan</li>
                      <li>• Berhak menghubungi keluarga dan pengacara</li>
                      <li>• Berhak mendapat bantuan hukum</li>
                      <li>• Berhak untuk diam atau tidak menjawab</li>
                      <li>• Berhak mendapat perawatan medis</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-3">Yang Harus Dilakukan:</h4>
                    <ul className="text-orange-600 space-y-2 text-sm">
                      <li>• Tetap tenang dan kooperatif</li>
                      <li>• Tanyakan identitas petugas</li>
                      <li>• Minta surat penahanan jika ada</li>
                      <li>• Hubungi LBH atau pengacara</li>
                      <li>• Ingat-ingat kejadian secara detail</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-bold text-red-800 mb-3">🚨 Kontak Bantuan Hukum Darurat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-red-700">LBH Jakarta</h4>
                    <p className="text-red-600 font-mono">(021) 3190 6910</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-red-700">Komnas HAM</h4>
                    <p className="text-red-600 font-mono">(021) 3925230</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Konten tidak ditemukan</div>
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Navigation />

      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Demonstrasi Yang Aman, Aspirasi yang Terdengar
          </h1>
          <p className="text-xl opacity-90">
            Panduan lengkap untuk berpartisipasi dalam demonstrasi dengan aman dan bertanggung jawab
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Pilih Panduan yang Anda Butuhkan
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Panduan terkategorisasi untuk memudahkan navigasi dan fokus
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {panduanCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-lg text-center transition-colors ${
                  activeCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-red-50'
                }`}
              >
                <div className="font-bold text-sm mb-1">{category.name}</div>
                <div className="text-xs opacity-80">{category.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">{renderContent()}</div>
      </div>

      <Footer />
    </main>
  )
}
