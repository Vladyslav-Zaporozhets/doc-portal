import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LaSalina - Interaktives DocPortal",
  description: "Show, Don't Tell - Interaktive Geschäftsdokumentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${inter.className} flex h-screen overflow-hidden antialiased`}
      >
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto p-10">{children}</main>
      </body>
    </html>
  );
}
