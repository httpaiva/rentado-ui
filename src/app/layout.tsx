import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import StyledComponentsRegistry from "@/hooks/useStyledComponents";

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
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
