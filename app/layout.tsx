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
        className={`min-h-screen flex flex-col bg-fixed bg-cover bg-center ${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundImage: "url('/trees.jpg')" }}>
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
