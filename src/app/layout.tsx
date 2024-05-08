import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanbify",
  description: "Kanbify is a simple kanban board app where you can manage your team's tasks.",
  applicationName: "Kanbify",
  authors: {
    name: "Kanbify",
    url: "https://kanbify.vercel.app",
  },
  category: "Productivity",
  keywords: ["kanban", "tasks", "productivity", "teams"],
  creator: "Pedro Velosa",
  publisher: "Pedro Velosa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-svh flex-col overflow-hidden`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
