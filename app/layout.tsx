import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Web5ContextProvider } from '@/providers/Web5Provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
         <Web5ContextProvider>
            {children}
         </Web5ContextProvider>
     </body>
    </html>
  )
}
