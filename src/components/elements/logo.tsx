import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Logo({ href }: { href: string }) {
  return (
    <>
      <Button asChild variant={"ghost"} className="text-lg">
        <Link href={href}>Kanbify</Link>
      </Button>
    </>
  );
}
