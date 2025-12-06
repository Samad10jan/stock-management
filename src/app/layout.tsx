import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/contexts/theme-context";



export const metadata: Metadata = {
  title: "Stock Manager",
  description: "Stock Management Application",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>

        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
