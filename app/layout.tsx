import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexevo - Fotovoltaico Conveniente | Preventivo Gratuito",
  description: "Scopri quanto puoi risparmiare con un impianto fotovoltaico. Preventivo gratuito in 2 minuti, installazione in 30 giorni. Garanzia 25 anni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
