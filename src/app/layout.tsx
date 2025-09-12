import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aean Gabrielle Tayawa - Full Stack Developer",
  description: "Portfolio of Aean Gabrielle Tayawa - Full Stack Developer specializing in modern web technologies, IoT, and scalable applications.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "IoT", "Web Development"],
  authors: [{ name: "Aean Gabrielle Tayawa" }],
  icons: {
    icon: "/headshot.png",
    shortcut: "/headshot.png",
    apple: "/headshot.png",
  },
  openGraph: {
    title: "Aean Gabrielle Tayawa - Full Stack Developer",
    description: "Portfolio showcasing modern web development projects and expertise",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aean Gabrielle Tayawa - Full Stack Developer",
    description: "Portfolio showcasing modern web development projects and expertise",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}