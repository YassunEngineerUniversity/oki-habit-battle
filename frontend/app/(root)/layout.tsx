import type { Metadata } from 'next';
import { Noto_Sans_JP, Roboto } from 'next/font/google';
import '../globals.css';
import PageContainer from '@/components/layout/container/PageContainer';
import { Toaster } from '@/components/ui/sonner';
import PageHeader from '@/components/layout/header/PageHeader';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Rails API and Next.js',
  description: 'Create Rails API and Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
    <body className={roboto.className}>
      <main className="min-h-screen bg-gray-100">
        <PageContainer>
          {children}
        </PageContainer>
        <Toaster />
      </main>
    </body>
  </html>
  );
}
