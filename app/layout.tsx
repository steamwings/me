import { Metadata } from 'next'
import React from 'react'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Zander',
  description: 'Zander Weather - artist, developer, Jesus-worshipper',
  icons: {
    icon: '/z.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
