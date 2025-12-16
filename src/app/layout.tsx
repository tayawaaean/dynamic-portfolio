import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://agdtayawa.xyz"),
  title: "Aean Gabrielle D. Tayawa - Full Stack Developer",
  description:
    "Portfolio of Aean Gabrielle D. Tayawa, a Full Stack Developer based in Ilocos Norte, Philippines, working remotely with international clients worldwide.",
  keywords: [
    "Aean Gabrielle D. Tayawa",
    "Aean Tayawa",
    "Full Stack Developer",
    "Remote Full Stack Developer",
    "Philippines Full Stack Developer",
    "Ilocos Norte Full Stack Developer",
    "Laoag City Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "IoT",
    "Web Development",
  ],
  authors: [{ name: "Aean Gabrielle D. Tayawa", url: "https://agdtayawa.xyz" }],
  icons: {
    icon: "/headshot.png",
    shortcut: "/headshot.png",
    apple: "/headshot.png",
  },
  openGraph: {
    title: "Aean Gabrielle D. Tayawa - Full Stack Developer",
    description:
      "Full Stack Developer based in Ilocos Norte, Philippines, building modern web and IoT solutions for international clients.",
    type: "website",
    locale: "en_US",
    url: "https://agdtayawa.xyz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aean Gabrielle D. Tayawa - Full Stack Developer",
    description:
      "Remote Full Stack Developer based in Ilocos Norte, Philippines, working with clients worldwide.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://agdtayawa.xyz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TMQWZVXB');`}
        </Script>
        <Script
          id="ld-json-person"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Aean Gabrielle D. Tayawa",
            url: "https://agdtayawa.xyz",
            jobTitle: "Full Stack Developer",
            description:
              "Full Stack Developer based in Ilocos Norte, Philippines, building modern web and IoT solutions for international clients.",
            address: {
              "@type": "PostalAddress",
              addressCountry: "PH",
              addressRegion: "Ilocos Norte",
              addressLocality: "Laoag City",
            },
            sameAs: [
              "https://github.com",
              "https://linkedin.com",
            ],
            worksFor: {
              "@type": "Organization",
              name: "Freelance / Independent",
            },
            hasOccupation: {
              "@type": "Occupation",
              name: "Full Stack Developer",
              occupationalCategory: "15-1254.00",
            },
            availability: "Available for remote work worldwide",
          })}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TMQWZVXB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}