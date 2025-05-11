import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snörsjöaorden",
  description: "Helsingkrona nations bal",
  openGraph: {
    title: "Snörsjöaorden",
    description: "Helsingkrona nations bal",
    type: "website",
    url: "https://bal.helsingkrona.se",
    images: [
      {
        url: "/studiovega_241005_249.jpg", // Ensure this image is in your public folder
        width: 1200,
        height: 630,
        alt: "Event Banner",
      },
    ],
  },

  icons: {
    icon: "/shield_color.png", // Path to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className=" p-0.5">
      </div>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
