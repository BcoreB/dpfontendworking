import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import PMenu from '@/components/Menu/PMenu'
import { Toaster } from 'sonner'
 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BCoreHCM Solution',
  description: 'By BCore Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" 
      // dir='rtl'  // for arabic
      // bg-gradient-to-br from-indigo-500 to-pink-700 via-blue-400  bg-no-repeat relative h-full font-sans antialiased
    className='h-full'>
      <body className={cn('bg-indigo-400',inter.className)}>
          <main className='relative flex flex-col min-h-screen'>
            <div className="flex-grow flex-1">
  
            <PMenu /> 
      
            <Toaster position='top-center' richColors  />
            {children}
            </div>
          </main> 
        </body>
    </html>
  )
}
