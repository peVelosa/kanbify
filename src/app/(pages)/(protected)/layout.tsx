import { Metadata } from "next";
import Navbar from "./_components/navbar";
import { auth } from "@/auth";

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
      <main className="h-full overflow-hidden pt-4">{children}</main>
    </>
  );
}
