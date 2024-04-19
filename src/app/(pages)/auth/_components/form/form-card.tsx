import { Card, CardContent, CardFooter } from "@/components/ui/card";
import FormHeader from "./form-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type FormCardProps = {
  children: React.ReactNode;
  btnHref: string;
  btnLabel: string;
  subtitle?: string;
};

export default function FormCard({
  children,
  btnHref,
  btnLabel,
  subtitle,
}: FormCardProps) {
  return (
    <Card className="mx-auto max-w-[500px]">
      <FormHeader subtitle={subtitle} />
      <CardContent>{children}</CardContent>
      <CardFooter className="justify-center">
        <Button asChild variant={"link"}>
          <Link href={btnHref}>{btnLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
