"use client";

import Logo from "@/components/elements/logo";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  return (
    <>
      <header className="container py-4">
        <nav className="flex items-center justify-between gap-2">
          <div className="mr-auto">
            <Logo href="/dashboard" variant="link" />
          </div>
          <div>
            <Button variant={"ghost"} size={"icon"}>
              <FaUserCircle size={16} />
            </Button>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div>
            <Button onClick={() => signOut()} variant={"ghost"}>
              <FaSignOutAlt size={16} />
            </Button>
          </div>
        </nav>
      </header>
      <Separator />
    </>
  );
}
