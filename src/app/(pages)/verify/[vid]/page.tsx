import VerifyEmailView from "./verify-email-view";
import { fetchVerification, fetchAlreadyVerified, verifyEmail } from "../services/api";

export type Verification = Awaited<ReturnType<typeof fetchVerification>>;

export default async function VerificationPage({ params: { vid } }: { params: { vid: string } }) {
  const verification = await fetchVerification(vid);

  if (!verification) return <VerifyEmailView verification={verification} />;

  const alreadyVerified = await fetchAlreadyVerified(verification.identifier);

  if (alreadyVerified?.emailVerified)
    return (
      <VerifyEmailView
        alreadyVerified
        verification={verification}
        callbackEmail={verification.identifier}
      />
    );

  await verifyEmail(verification.identifier);

  return <VerifyEmailView verification={verification} callbackEmail={verification.identifier} />;
}
