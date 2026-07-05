import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PORTFOLIO as P } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

// Self-hosted at build time (no render-blocking Google Fonts request, no layout
// shift). These expose CSS variables consumed by globals.css.
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

const title = `${P.name} — ${P.role}`;
const description =
  "Nishal Chandra Reddy — Full Stack Developer & AI/ML enthusiast. Scalable web applications, microservices, and distributed systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "AI/ML",
    "Distributed Systems",
    "Microservices",
    "Spring Boot",
    "Node.js",
    "React",
    "Kafka",
    "AWS",
  ],
  authors: [{ name: P.name }],
  creator: P.name,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: P.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: { canonical: SITE_URL },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: P.name,
  jobTitle: P.role,
  description,
  url: SITE_URL,
  email: `mailto:${P.email}`,
  sameAs: [P.linkedin, P.github],
  alumniOf: P.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  knowsAbout: P.skills.flatMap((s) => s.tags),
};

// Set the theme on <html> before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('ncr-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <a href="#main" className="skip-link">Skip to content</a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
