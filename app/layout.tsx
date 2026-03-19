import type {Metadata} from 'next';
import { Kelly_Slab } from 'next/font/google';
import './globals.css'; // Global styles

const vintageFont = Kelly_Slab({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
  variable: '--font-vintage',
});

export const metadata: Metadata = {
  title: 'Cup & Mug VPN',
  description: 'Vintage cartoon style VPN',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={vintageFont.variable}>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
      </head>
      <body className="bg-[#f4ecd8] text-[#1a1a1a] min-h-screen" suppressHydrationWarning>{children}</body>
    </html>
  );
}
