import React from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import Navbar from "@/components/navigation/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-poppins',
});

export const metadata = {
  title: "You Ski - Smart Ski Navigation",
  description: "Personalized mountain experience for skiers and snowboarders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans bg-gray-50 text-gray-900 dark:bg-dark-bg dark:text-gray-100 transition-colors duration-200`}>
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
