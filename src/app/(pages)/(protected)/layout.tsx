import type { Metadata } from "next";
import Navbar from "./_components/navbar";
import { auth } from "@/server/auth";

export async function generateMetadata(): Promise<Metadata> {
  const user = await auth();

  return {
    title: `Kanbify | ${user?.user?.name}`,
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
}

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="h-full w-full overflow-hidden pt-4">{children}</main>
      {/* <main className="flex w-full flex-1 overflow-hidden pt-4">{children}</main> */}
    </>
  );
}
