import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Navigation />

      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Tentang Tuntutan</h1>
          <p className="text-xl opacity-90">
            17+8 tuntutan ini adalah rangkuman atas berbagai tuntutan dan desakan yang beredar di
            media sosial
          </p>
          <p className="text-lg mt-2 opacity-80">#ResetIndonesia</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Sumber Tuntutan</h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Dirangkum Dari Berbagai Suara
            </h3>

            <p className="text-gray-600 mb-6">
              17+8 tuntutan ini adalah rangkuman<span className="text-red-600">*</span> atas
              berbagai tuntutan dan desakan yang beredar di media sosial dalam beberapa hari
              terakhir, di antaranya:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  • Tuntutan 7 hari
                  <a
                    href="https://www.instagram.com/salsaer"
                    className="text-blue-600 hover:underline"
                  >
                    @salsaer
                  </a>{' '}
                  <a
                    href="https://www.instagram.com/jeromepolin"
                    className="text-blue-600 hover:underline"
                  >
                    @jeromepolin
                  </a>{' '}
                  <a
                    href="https://www.instagram.com/cherylmarella"
                    className="text-blue-600 hover:underline"
                  >
                    @cherylmarella
                  </a>{' '}
                  hasil rembukan jutaan suara rakyat di kolom komentar & Instagram Story.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-gray-700">
                  • Desakan 211 organisasi masyarakat sipil yang dipublikasi melalui website YLBHI
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  • Siaran Pers Pusat Studi Hukum dan Kebijakan Indonesia (PSHK)
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <p className="text-gray-700">
                  • Pernyataan Sikap Ikatan Mahasiswa Magister Kenotariatan UI
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-gray-700">
                  • Pernyataan Sikap Center for Environmental Law & Climate Justice Universitas
                  Indonesia
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                <p className="text-gray-700">• Tuntutan Demo Buruh 28 Agustus 2025</p>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
                <p className="text-gray-700">
                  • 12 Tuntutan Rakyat Menuju Reformasi Transparansi & Keadilan oleh Reformasi
                  Indonesia di Change.org yang sudah menerima lebih dari 40.000 dukungan
                </p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <span className="text-red-600">*</span>Rangkuman ini berupaya menangkap esensi dari
                berbagai sumber referensi di atas dan mungkin tidak mengikutsertakan seluruh detil
                secara utuh. Rangkuman ini juga tidak bermaksud mengesampingkan tuntutan-tuntutan
                lain yang mungkin juga beredar di waktu yang sama.
              </p>
            </div>
          </div>

          {/* Visi Misi */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Visi & Misi</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Transparansi</h3>
                <p className="text-gray-600">
                  Mewujudkan pemerintahan yang transparan dan akuntabel kepada rakyat
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Reformasi</h3>
                <p className="text-gray-600">
                  Mendorong reformasi sistem politik dan hukum yang lebih adil
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Empati</h3>
                <p className="text-gray-600">
                  Membangun kepemimpinan yang berempati terhadap penderitaan rakyat
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Share */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Bagikan Tuntutan Ini
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Semakin banyak yang tahu, semakin kuat suara rakyat
            </p>

            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                📘 Facebook
              </button>
              <button className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors">
                🐦 Twitter
              </button>
              <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
                📷 Instagram
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                💬 WhatsApp
              </button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                ✈️ Telegram
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
