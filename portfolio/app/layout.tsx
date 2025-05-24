import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sabit Can Turunç - Yazılım Mühendisi",
  description: "Frontend ve Uygulama Geliştirici",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-primary text-text-primary`}>
        <Navbar />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
