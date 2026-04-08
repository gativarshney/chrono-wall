import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chrono Wall — Interactive Calendar",
  description:
    "A 3D interactive wall calendar with cosmic scenes, range selection, and notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
