import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "COCORO",
  description: "COCORO resident app demo",
};

export const viewport: Viewport = {
  themeColor: "#1b2fd1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${kanit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
