import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.happyendpoint.com'),
  title: {
    default: 'Happy Endpoint API Documentation',
    template: '%s | Happy Endpoint Docs',
  },
  description:
    'Developer documentation and API reference pages for Happy Endpoint APIs sold on RapidAPI.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
