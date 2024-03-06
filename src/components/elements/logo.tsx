import Link from "next/link";
import { Button } from "@/components/ui/button";

type LogoProps = {
  variant?: "ghost" | "link";
  href: string;
};

export default function Logo({ href, variant = "ghost" }: LogoProps) {
  return (
    <>
      <Button asChild variant={variant} className="text-lg">
        <Link href={href}>Kanbify</Link>
      </Button>
    </>
  );
}
