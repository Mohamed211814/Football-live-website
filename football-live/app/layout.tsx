import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";

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
  title: "Yacine TV | ياسين تيفي - مباريات اليوم بث مباشر",
  description:
    "Watch today's live football matches free. Full schedule with scores, lineups, and events. | مشاهدة مباريات اليوم بث مباشر مجاناً.",
  keywords: "football live, مباريات اليوم, بث مباشر, ياسين تيفي, كرة القدم",
  openGraph: {
    title: "Yacine TV | ياسين تيفي",
    description: "Live football matches today / مباريات اليوم بث مباشر",
    locale: "ar_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${notoArabic.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#f0f0f0] font-arabic antialiased flex flex-col">
        <LanguageProvider>
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
