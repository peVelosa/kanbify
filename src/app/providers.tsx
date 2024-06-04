"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import TRPCProvider from "./_trpc/provider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <TRPCProvider>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        <Toaster />
      </TRPCProvider>
    </SessionProvider>
  );
}
