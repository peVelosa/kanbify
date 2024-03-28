export default function VerifyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full bg-gradient-to-b from-red-100 to-blue-500 pt-40">
      {children}
    </main>
  );
}
