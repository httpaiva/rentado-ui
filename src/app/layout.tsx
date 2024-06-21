import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "@/hooks/useProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rentado",
  description: "App for managing rental properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
