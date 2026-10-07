import type { Metadata } from "next";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource/krub/400.css";
import "@fontsource/krub/500.css";
import "@fontsource/krub/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khushi Patel | Software Engineering, UX & Product",
  description:
    "Khushi Patel, fourth-year Software Engineering student at Ontario Tech University, working across software, UX, and product.",
  keywords: ["Software Engineer", "UX Design", "Product", "Frontend Developer", "Ontario Tech", "Portfolio"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
