import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Lumiere — Medical Intelligence Platform',
  description: 'Unified Golden Record platform for patient data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-neutral-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
