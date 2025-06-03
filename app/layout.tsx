// import localFont from 'next/font/local' // Removed local font import
// import { Inter, Roboto_Mono } from 'next/font/google' // Removed Google Font import
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { Providers } from './providers'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Regular, SemiBold, Bold
  variable: '--font-poppins',
});

// Removed font configurations since we are using system fonts via Tailwind
// const inter = localFont({...})
// const robotoMono = localFont({...})

export const metadata = {
  title: 'href.lol - Modern Bio Links',
  description: 'Create your beautiful bio page with href.lol',
  keywords: ['bio', 'links', 'profile', 'social', 'portfolio'],
  authors: [{ name: 'href.lol' }],
  creator: 'href.lol',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://href.lol',
    title: 'href.lol - Modern Bio Links',
    description: 'Create your beautiful bio page with href.lol',
    siteName: 'href.lol',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'href.lol - Modern Bio Links',
    description: 'Create your beautiful bio page with href.lol',
    creator: '@hrefdotlol',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body className="min-h-screen bg-dark-100 text-white antialiased">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
} 