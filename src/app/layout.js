import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FavoritesProvider from "@/components/FavoritesProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Taste Matcher",
  description: "Find what to watch, together.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {/* FavoritesProvider shares the favorites list with every page */}
        <FavoritesProvider>
          <Navbar />
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}