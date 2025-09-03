# 17+8 Tuntutan Rakyat - Website

Platform digital untuk menyampaikan dan memantau tuntutan rakyat terkait reformasi politik dan sosial di Indonesia, dengan feed berita dan update real-time dari @barengwarga.

## 🚀 Fitur Utama

- **Real-time News Feed**: Berita terkini dari berbagai sumber RSS terkait demo dan tuntutan rakyat
- **Twitter RSS Feed**: Update langsung dari akun @barengwarga melalui RSS feed
- **Countdown Timer**: Menampilkan waktu tersisa hingga deadline tuntutan
- **Progress Tracker**: Memantau perkembangan setiap tuntutan secara real-time
- **Panduan Demonstrasi**: Panduan lengkap keamanan dan prosedur untuk demonstran
- **Responsive Design**: Dapat diakses di berbagai perangkat dengan smooth scrolling
- **Interactive UI**: Interface yang user-friendly dan engaging

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **RSS Parsing**: rss-parser
- **Icons**: Heroicons + Custom SVG
- **Deployment**: Vercel (ready)

## 📦 Installation

1. Clone repository ini:
```bash
git clone <repository-url>
cd DemoRakyat
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes for RSS feeds
│   ├── berita/            # News page
│   ├── panduan-demo/      # Demo guide page  
│   ├── page.tsx           # Homepage with feeds
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── BarengWargaRSSFeed.tsx  # Twitter feed
│   ├── NewsFeed.tsx           # News aggregator
│   ├── TuntutanList.tsx       # Demands list
│   └── ...                    # Other components
├── data/                  # Static data
│   └── tuntutan.ts        # Demands configuration
├── types/                 # TypeScript definitions
│   └── index.ts           # All interfaces
└── utils/                 # Utility functions
    ├── dateUtils.ts       # Date formatting
    ├── textUtils.ts       # Text processing
    ├── constants.ts       # App constants
    └── index.ts          # Utility exports
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
│   │   ├── news/          # RSS news aggregator
│   │   └── barengwarga-rss/ # Twitter RSS feed
│   ├── tuntutan/          # Halaman daftar tuntutan
│   ├── panduan-demo/      # Panduan demonstrasi lengkap
│   ├── progress/          # Progress tracker
│   ├── berita/            # Halaman berita & update
│   └── tentang/           # Tentang tuntutan
├── components/            # Reusable components
│   ├── BarengWargaRSSFeed.tsx # Twitter RSS feed component
│   ├── NewsFeed.tsx       # News aggregator component
│   ├── TuntutanList.tsx   # Daftar tuntutan
│   ├── CountdownTimer.tsx # Timer component
│   ├── Navigation.tsx     # Header navigation
│   └── Footer.tsx         # Footer component
├── data/                  # Static data
│   └── tuntutan.ts        # Data tuntutan 1 minggu & 1 tahun
├── types/                 # TypeScript interfaces
│   └── index.ts           # Global types
└── globals.css            # Global styles
```
│   ├── CountdownTimer.tsx
│   ├── TuntutanList.tsx
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   └── Footer.tsx
├── data/                  # Data sources
│   └── tuntutan.ts        # Data tuntutan
└── types/                 # TypeScript types
    └── index.ts
```

## 📋 Halaman yang Tersedia

1. **Homepage** (`/`) - Beranda dengan hero section dan countdown
2. **Tuntutan** (`/tuntutan`) - Daftar lengkap 17+8 tuntutan
3. **Progress Tracker** (`/progress`) - Monitoring progress tuntutan
4. **Panduan Demo** (`/panduan-demo`) - Panduan keamanan demonstrasi
5. **Tentang** (`/tentang`) - Informasi tentang sumber tuntutan

## 🎨 Design Features

- **Modern UI**: Desain clean dengan gradien merah yang mencerminkan semangat
- **Animations**: Smooth animations untuk better UX
- **Color Coding**: Status tuntutan dengan warna yang mudah dipahami
- **Mobile First**: Responsive design yang mobile-friendly

## 🚀 Deployment

Project ini sudah dikonfigurasi untuk deployment ke Vercel:

```bash
npm run build
```

Atau deploy langsung ke Vercel:
```bash
npx vercel
```

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Project ini dibuat untuk kepentingan publik dan transparansi demokratis.

## 🔗 Links

- Website: [https://tuntutan-rakyat.vercel.app](https://tuntutan-rakyat.vercel.app)
- Original Reference: [https://tuntutanrakyat.vercel.app](https://tuntutanrakyat.vercel.app)

---

**#ResetIndonesia** - Transparansi. Reformasi. Empati.
