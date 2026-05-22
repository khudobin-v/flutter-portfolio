import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Худобин Василий · Flutter + AI',
  description: 'Flutter-разработчик, использующий Claude Code, Cursor и Codex. Приложения от идеи до App Store в 2–4 раза быстрее.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  )
}
