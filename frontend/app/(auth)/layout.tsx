import type { Metadata } from 'next';
import { Noto_Sans_JP, Roboto } from 'next/font/google';
import '../globals.css';
import AuthContainer from '@/components/layout/container/AuthContainer';
import { Toaster } from '@/components/ui/sonner';
import { getCurrentUser } from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';


// const noto = Noto_Sans_JP({
//   weight: ['400', '700'],
//   style: 'normal',
//   subsets: ['latin'],
// });

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Habit Battle',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  if (currentUser && currentUser.success) {
    redirect('/');
  }

  return (
    <html lang="ja">
      <body className={roboto.className}>
        <main className="min-h-screen bg-gray-100">
          <AuthContainer>
            {children}
          </AuthContainer>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
