import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Hisab",
  description: "Inventory App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
