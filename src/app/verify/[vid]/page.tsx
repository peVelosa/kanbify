import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function VerificationPage({
  params: { vid },
}: {
  params: { vid: string };
}) {
  const verification = await db.verificationRequest.findFirst({
    where: {
      id: vid,
    },
  });

  if (!verification) {
    return (
      <div className="mx-auto max-w-sm space-y-6">
        <h1 className="text-2xl font-bold">Invalid verification token</h1>
        <p>
          The verification token you used is invalid. Please request a new
          verification email.
        </p>
        <Button asChild>
          <Link href="/">Click here to go to home page</Link>
        </Button>
      </div>
    );
  }

  const alreadyVerified = await db.user.findUnique({
    where: {
      email: verification.identifier,
    },
  });

  if (alreadyVerified?.emailVerified) {
    return (
      <>
        <div className="mx-auto max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Email already verified</h1>
            <p>Your email has been already verified</p>
          </div>
          <div className="space-y-4">
            <Button className="w-full" asChild>
              <Link
                href={`/auth/login?callbackEmail=${verification.identifier}`}
              >
                Login
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  await db.user.update({
    where: {
      email: verification.identifier,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  return (
    <>
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Email Verified</h1>
          <p>Your email has been successfully verified</p>
        </div>
        <div className="space-y-4">
          <Button className="w-full" asChild>
            <Link href={`/auth/login?callbackEmail=${verification.identifier}`}>
              Login
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
