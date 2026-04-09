import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Sabit Can Turunç - Portfolio",
    description: locale === 'en' ? "Sabit Can Turunç personal portfolio website" : "Sabit Can Turunç kişisel portfolio web sitesi",
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-primary text-text-primary`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          {children}
          <ScrollToTop />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
