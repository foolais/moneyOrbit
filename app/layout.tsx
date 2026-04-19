import type { Metadata } from "next";
import { ABeeZee, Inconsolata } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const abeezee = ABeeZee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Money Orbit",
  description:
    "A personal finance dashboard built with Next.js, Tailwind CSS, and TypeScript. Track your expenses, visualize your spending habits, and manage your budget all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${abeezee.variable} ${inconsolata.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-stars flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
