import Navbar from "./_components/navbar";

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
