import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Questionnaire App',
  description: 'A beautiful questionnaire application for collecting personal interests and preferences',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
