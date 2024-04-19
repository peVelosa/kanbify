import Logo from "@/components/elements/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <header className="container">
        <nav className="flex items-center justify-between py-4">
          <Logo href="/" />
          <Button asChild>
            <Link href={"/auth/login"}>Sign In</Link>
          </Button>
        </nav>
        <Separator />
      </header>
    </>
  );
}
