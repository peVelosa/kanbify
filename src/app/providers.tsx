"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import TRPCProvider from "./_trpc/provider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <TRPCProvider>
        {children}
        <Toaster />
      </TRPCProvider>
    </SessionProvider>
  );
}
