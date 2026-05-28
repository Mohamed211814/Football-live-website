import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider, Locale } from "./context/LanguageContext";
import { cookies } from "next/headers";

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kooraza - مباريات اليوم بث مباشر",
  description:
    "Watch today's live football matches free. Full schedule with scores, lineups, and events. | مشاهدة مباريات اليوم بث مباشر مجاناً.",
  keywords: "football live, مباريات اليوم, بث مباشر, Kooraza, كرة القدم",
  openGraph: {
    title: "Kooraza - مباريات اليوم بث مباشر",
    description: "Live football matches today / مباريات اليوم بث مباشر",
    locale: "ar_EG",
    type: "website",
    siteName: "Kooraza",
    url: "https://football-live-yacine.com",
    images: [
      {
        url: "https://football-live-yacine.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kooraza Live Football",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kooraza - مباريات اليوم بث مباشر",
    description: "Watch today's live football matches free.",
    images: ["https://football-live-yacine.com/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("football-locale")?.value as Locale) || "ar";

  return (
    <html lang={locale === 'ar' ? 'ar-u-nu-latn' : 'en'} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${notoArabic.variable} ${inter.variable}`}>
      <body className={`min-h-screen bg-[#f0f0f0] ${locale === 'ar' ? 'font-arabic' : 'font-sans'} antialiased flex flex-col`}>
        <LanguageProvider initialLocale={locale}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
