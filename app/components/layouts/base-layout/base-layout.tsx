"use client";

import { Navbar } from "./NavBar";
import { Sidebar } from "./Sidebar";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="main-app">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
