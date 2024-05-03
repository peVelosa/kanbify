import { Button } from "@/components/ui/button";
import Link from "next/link";

type VerifyEmailViewProps = {
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
};

const VerifyEmailView = ({ title, message, buttonText, buttonLink }: VerifyEmailViewProps) => {
  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p>{message}</p>
      </div>
      <Button
        asChild
        className="w-full"
      >
        <Link href={buttonLink}>{buttonText}</Link>
      </Button>
    </div>
  );
};

export default VerifyEmailView;
