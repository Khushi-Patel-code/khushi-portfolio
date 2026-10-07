import type { Metadata } from "next";
import { Rajdhani, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khushi Patel | Software Engineering, UX & Product",
  description:
    "Khushi Patel, fourth-year Software Engineering student at Ontario Tech University, working across software, UX, and product.",
  keywords: ["Software Engineer", "UX Design", "Product", "Frontend Developer", "Ontario Tech", "Portfolio"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{children}</body>
    </html>
  );
}
