'use client'

import { useRouter } from 'next/navigation'

export function HeroSection() {
  const router = useRouter()

  const scrollToTuntutan = () => {
    const tuntutanSection = document.getElementById('tuntutan-section')
    if (tuntutanSection) {
      tuntutanSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const navigateToPanduan = () => {
    router.push('/panduan-demo')
  }

  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in">17+8 Tuntutan Rakyat</h1>
        <p className="text-2xl mb-2 animate-fade-in">#ResetIndonesia</p>
        <p className="text-xl mb-8 opacity-90 animate-slide-up">Transparansi. Reformasi. Empati.</p>
        <p className="text-lg mb-8 max-w-3xl mx-auto animate-slide-up">
          Daftar tuntutan yang harus dipenuhi untuk mewujudkan Indonesia yang lebih adil,
          demokratis, dan sejahtera bagi seluruh rakyat.
        </p>
        <p className="text-base mb-8 max-w-2xl mx-auto animate-slide-up font-medium">
          Tetap kawal hingga tuntutan menjadi kenyataan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <button
            onClick={scrollToTuntutan}
            className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Lihat Tuntutan
          </button>
          <button
            onClick={navigateToPanduan}
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
          >
            Panduan Demo
          </button>
        </div>
      </div>
    </section>
  )
}
