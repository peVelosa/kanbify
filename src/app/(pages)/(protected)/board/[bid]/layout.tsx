export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-full w-full flex-1 overflow-hidden pt-4">
        <div className="flex max-h-full w-full flex-col">{children}</div>
      </div>
    </>
  );
}
