import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from './providers';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Hair Boutique twenty four | ご予約',
  description: 'Hair Boutique twenty four（吹田市千里山東）のお客様向け LIFF 予約サイト',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, minHeight: '100vh', background: '#ede6db' }}>
        <Providers>
          <div
            style={{
              maxWidth: 440,
              margin: '0 auto',
              minHeight: '100vh',
              background: '#faf7f2',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
            }}
          >
            <main style={{ flex: 1 }}>{children}</main>
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
