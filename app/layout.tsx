import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SolarPro - Fotovoltaico Conveniente | Preventivo Gratuito",
  description: "Scopri quanto puoi risparmiare con un impianto fotovoltaico. Preventivo gratuito in 2 minuti, installazione in 30 giorni. Garanzia 25 anni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
