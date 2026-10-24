import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Faishal Nur Firdaus — Web Developer",
  description:
    "Portfolio pribadi Muhammad Faishal Nur Firdaus, Web Developer dan Full-stack Engineer yang membangun pengalaman digital yang bermakna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
