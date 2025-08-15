import { Analytics } from "@vercel/analytics/next";

import FONTS from "@/assets/fonts";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

import type { Metadata, Viewport } from "next";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#080f17",
};

export const metadata: Metadata = {
  title: {
    default: "Blog | Brian Newton👀",
    template: "%s | Brian Newton",
  },
  description: "Brian Newton's personal blog",
  metadataBase: new URL("https://blog.cozybrian.dev"),
  keywords: [
    "Blog",
    "Brian Newton",
    "CozyBrian",
    "Software Development",
    "Web Development",
    "Frontend Development",
    "Software Engineer",
  ],
  openGraph: {
    title: "Blog | Brian Newton👀",
    description:
      "Explore my thoughts and insights on software development and more.",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    other: {
      rel: "canonical",
      url: "https://blog.cozybrian.dev",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${FONTS.variable}`}>
      <head>
        <link rel="canonical" href="https://blog.cozybrian.dev" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
