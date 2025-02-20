
import './globals.css'
import { Inter, Playwrite_IN, Open_Sans } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })
const playwrite = Playwrite_IN()
const os = Open_Sans({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Calendar',
  description: 'A booking and scheduling tool that\'s superior',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <html data-theme="light">
        <body className={os.className}>
         {children}
        </body>
        </html>
  )
}

