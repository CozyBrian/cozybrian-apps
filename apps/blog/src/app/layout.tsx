import type { Metadata, Viewport } from "next";

import FONTS from "@/assets/fonts";
import Header from "@/components/layout/header";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#080f17",
};

export const metadata: Metadata = {
  title: {
    default: "Brian Newton | Hey 👀",
    template: "%s | Brian Newton",
  },
  description: "Brian Newton's personal blog",
  metadataBase: new URL("https://blog.cozybrian.dev"),
  keywords: [
    "Brian Newton",
    "CozyBrian",
    "Software Development",
    "Web Development",
    "Frontend Development",
    "Software Engineer",
  ],
  openGraph: {
    title: "Brian Newton | Hey 👀",
    description:
      "A showcase of my passion for Software Development—view my work here.",
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
        <link rel="canonical" href="https://www.cozybrian.dev" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
