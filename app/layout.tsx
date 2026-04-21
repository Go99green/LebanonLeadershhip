import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lebanon Leadership Project",
  description:
    "A premium MBA group website on culture, leadership, and organizational practice in Lebanon.",
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
