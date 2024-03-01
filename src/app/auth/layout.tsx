export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full bg-gradient-to-br from-sky-600 to-indigo-600">
      <div className="container pt-20">{children}</div>
    </main>
  );
}
