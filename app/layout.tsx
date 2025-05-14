import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Magic UI",
  description: "The startup template from Magic UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Link 
            href="https://github.com/hugo-chilemme/nextjs-audio-visualizer"
            className="absolute z-50 flex items-center bottom-4 left-4 p-2 text-black bg-white rounded-lg text-sm border-2 border-white hover:bg-neutral-600 hover:text-white"

          >
            <FaGithub className="mr-2" />
            hugo-chilemme/nextjs-audio-visualizer
          </Link>
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
