import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/index.css";
import Nav from "@/components/layout/Nav";
import Provider from "@/context/Provider";
import { Suspense } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Promtopia",
  description: "discover and share ai prompts",
  icons: "/assets/images/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            <Suspense>{children}</Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
}
