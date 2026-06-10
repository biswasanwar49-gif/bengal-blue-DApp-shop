import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bengal Blue DApp Shop',
  description: 'A trendy decentralized ecommerce homepage with wallet-ready shopping.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
