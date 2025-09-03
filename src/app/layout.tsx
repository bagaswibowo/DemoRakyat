import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '17+8 Tuntutan Rakyat #ResetIndonesia',
  description:
    'Platform digital untuk menyampaikan dan mengorganisir tuntutan rakyat terkait reformasi politik dan sosial di Indonesia',
  keywords: ['tuntutan rakyat', 'reformasi', 'indonesia', 'demokrasi', 'transparansi'],
  authors: [{ name: 'Tim Tuntutan Rakyat' }],
  openGraph: {
    title: '17+8 Tuntutan Rakyat #ResetIndonesia',
    description: 'Tuntutan rakyat untuk perubahan menuju Indonesia yang lebih baik',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
