import type { Metadata } from 'next';
import { ABeeZee } from 'next/font/google';
import './globals.css';

const abeezee = ABeeZee({
  variable: '--font-abeezee',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Meetus Task',
  description: 'Frontend Quick Tests',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${abeezee.variable} antialiased`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
