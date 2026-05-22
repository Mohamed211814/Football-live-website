import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ياسين تيفي - مباريات اليوم بث مباشر",
  description:
    "ياسين تيفي - مشاهدة مباريات اليوم بث مباشر مجاناً. جدول مباريات كرة القدم اليوم مع التفاصيل والقنوات الناقلة.",
  keywords: "مباريات اليوم, بث مباشر, ياسين تيفي, كرة القدم, يلا شوت",
  openGraph: {
    title: "ياسين تيفي - مباريات اليوم بث مباشر",
    description: "مشاهدة مباريات اليوم بث مباشر مجاناً",
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
    <html lang="ar" dir="rtl" className={`${notoArabic.variable}`}>
      <body className="min-h-screen bg-[#f0f0f0] font-arabic antialiased flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
