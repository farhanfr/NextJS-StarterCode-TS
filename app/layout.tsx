import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import ProviderNextAuth from './ProviderNextAuth';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS Starter by Reacts',
  description: 'Starter code nextjs with TS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderNextAuth>
          {children}
          <ToastContainer />
        </ProviderNextAuth>

      </body>

    </html>
  )
}
