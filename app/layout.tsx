import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leadership Analysis: Lebanon | USD MBA",
  description:
    "A comprehensive analysis of Lebanese leadership through the lens of Hall, Hofstede, and GLOBE frameworks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
