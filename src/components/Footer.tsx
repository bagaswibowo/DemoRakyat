import { Facebook, Twitter, Instagram, MessageCircle, Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Sumber Tuntutan Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Sumber Tuntutan</h2>
          <h3 className="text-xl font-semibold mb-4 text-center">Dirangkum Dari Berbagai Suara</h3>

          <p className="text-gray-300 mb-6 text-center max-w-4xl mx-auto">
            17+8 tuntutan ini adalah rangkuman<span className="text-red-400">*</span> atas berbagai
            tuntutan dan desakan yang beredar di media sosial dalam beberapa hari terakhir, di
            antaranya:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-6xl mx-auto">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-200 text-sm">
                • Tuntutan 7 hari{' '}
                <a
                  href="https://www.instagram.com/salsaer"
                  className="text-blue-400 hover:underline"
                >
                  @salsaer
                </a>{' '}
                <a
                  href="https://www.instagram.com/jeromepolin"
                  className="text-blue-400 hover:underline"
                >
                  @jeromepolin
                </a>{' '}
                <a
                  href="https://www.instagram.com/cherylmarella"
                  className="text-blue-400 hover:underline"
                >
                  @cherylmarella
                </a>{' '}
                hasil rembukan jutaan suara rakyat di kolom komentar & Instagram Story.
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-200 text-sm">
                • Desakan 211 organisasi masyarakat sipil yang dipublikasi melalui website YLBHI
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-200 text-sm">
                • Siaran Pers Pusat Studi Hukum dan Kebijakan Indonesia (PSHK)
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-200 text-sm">
                • Pernyataan Sikap Ikatan Mahasiswa Magister Kenotariatan UI
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-200 text-sm">
                • Pernyataan Sikap Center for Environmental Law & Climate Justice Universitas
                Indonesia
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-200 text-sm">• Tuntutan Demo Buruh 28 Agustus 2025</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 md:col-span-2">
              <p className="text-gray-200 text-sm">
                • 12 Tuntutan Rakyat Menuju Reformasi Transparansi & Keadilan oleh Reformasi
                Indonesia di Change.org yang sudah menerima lebih dari 40.000 dukungan
              </p>
            </div>
          </div>

          <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-sm text-gray-300">
              <span className="text-red-400">*</span>Rangkuman ini berupaya menangkap esensi dari
              berbagai sumber referensi di atas dan mungkin tidak mengikutsertakan seluruh detil
              secara utuh. Rangkuman ini juga tidak bermaksud mengesampingkan tuntutan-tuntutan lain
              yang mungkin juga beredar di waktu yang sama.
            </p>
          </div>
        </div>

        {/* Share Section */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-4">Bagikan:</h3>
          <div className="flex justify-center space-x-2 md:space-x-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Facebook className="w-4 h-4" />
              <span className="hidden md:inline">Facebook</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors text-sm">
              <Twitter className="w-4 h-4" />
              <span className="hidden md:inline">Twitter</span>
            </button>
            <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors text-sm">
              <Instagram className="w-4 h-4" />
              <span className="hidden md:inline">Instagram</span>
            </button>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">WhatsApp</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
              <Send className="w-4 h-4" />
              <span className="hidden md:inline">Telegram</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">17+8 Tuntutan Rakyat</h3>
            <p className="text-gray-300 mb-4">Transparansi. Reformasi. Empati.</p>
            <p className="text-gray-300">
              Tuntutan rakyat untuk perubahan menuju Indonesia yang lebih baik. Bersama kita
              wujudkan tuntutan rakyat untuk masa depan bangsa.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Aksi Utama</h4>
            <ul className="space-y-2">
              <li>
                <a href="/tuntutan" className="text-gray-300 hover:text-white transition-colors">
                  Tuntutan Rakyat
                </a>
              </li>
              <li>
                <a
                  href="/panduan-demo"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Panduan Demonstrasi
                </a>
              </li>
              <li>
                <a href="/progress" className="text-gray-300 hover:text-white transition-colors">
                  Progress Tracker
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Informasi Penting</h4>
            <ul className="space-y-2">
              <li>
                <a href="/tentang" className="text-gray-300 hover:text-white transition-colors">
                  Tentang Tuntutan
                </a>
              </li>
              <li>
                <a
                  href="/panduan-demo?category=kontak-darurat"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Kontak Darurat
                </a>
              </li>
              <li>
                <a
                  href="/panduan-demo?category=hak-hukum"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Hak Hukum
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 Tuntutan Rakyat. Suara rakyat untuk perubahan.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">#ResetIndonesia</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
