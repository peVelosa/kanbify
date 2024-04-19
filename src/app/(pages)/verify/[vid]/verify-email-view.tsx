import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Verification } from "./page";

type VerifyEmailViewProps =
  | { verification: null; callbackEmail?: null; alreadyVerified?: null }
  | {
      verification: Verification;
      callbackEmail: string;
      alreadyVerified?: boolean;
    };

const VerifyEmailView = ({
  verification,
  callbackEmail,
  alreadyVerified,
}: VerifyEmailViewProps) => {
  return (
    <>
      {!verification ? (
        <InvalidVerificationTemplate />
      ) : alreadyVerified ? (
        <AlreadyVerifiedTemplate callbackEmail={callbackEmail} />
      ) : (
        <FirstTimeVerificationTemplate callbackEmail={callbackEmail} />
      )}
    </>
  );
};

const InvalidVerificationTemplate = () => (
  <div className="mx-auto max-w-sm space-y-6">
    <h1 className="text-2xl font-bold">Invalid verification token</h1>
    <p>The verification token you used is invalid. Please request a new verification email.</p>
    <Button asChild>
      <Link href="/">Click here to go to home page</Link>
    </Button>
  </div>
);

const AlreadyVerifiedTemplate = ({ callbackEmail }: { callbackEmail: string }) => (
  <div className="mx-auto max-w-sm space-y-6">
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold">Email already verified</h1>
      <p>Your email has been already verified</p>
    </div>
    <div className="space-y-4">
      <Button className="w-full" asChild>
        <Link href={`/auth/login?callbackEmail=${callbackEmail}`}>Login</Link>
      </Button>
    </div>
  </div>
);

const FirstTimeVerificationTemplate = ({ callbackEmail }: { callbackEmail: string }) => (
  <div className="mx-auto max-w-sm space-y-6">
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold">Email Verified</h1>
      <p>Your email has been successfully verified</p>
    </div>
    <div className="space-y-4">
      <Button className="w-full" asChild>
        <Link href={`/auth/login?callbackEmail=${callbackEmail}`}>Login</Link>
      </Button>
    </div>
  </div>
);

export default VerifyEmailView;
