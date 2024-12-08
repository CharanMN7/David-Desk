import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export const metadata: Metadata = {
  // Change this to your liking:
  title: "David Desk",
  description:
    "David Desk is the ultimate institute management system for smart institutions",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AdminPanelLayout>{children}</AdminPanelLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
