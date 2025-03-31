import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import '../globals.css';
import AuthContainer from '@/components/layout/AuthContainer';

const noto = Noto_Sans_JP({
  weight: ['400', '700'],
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Habit Battle',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={noto.className}>
        <main className="min-h-screen bg-gray-100">
          <AuthContainer>
            {children}
          </AuthContainer>
        </main>
      </body>
    </html>
  );
}
