import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BaseLayout from "@/app/components/layouts/base-layout/base-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "David Desk",
  description: "The Ultimate Classroom assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
