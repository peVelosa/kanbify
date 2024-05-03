import VerifyEmailModel from "./verify-email-model";
import { api } from "@/app/_trpc/server";

export type Verification = Awaited<ReturnType<typeof api.user.verifyEmail.invite>>;

export default async function VerificationPage({ params: { vid } }: { params: { vid: string } }) {
  const verification = await api.user.verifyEmail.invite({ vid });

  if (!verification) return <VerifyEmailModel status={'invalid'} />;

  const user = await api.user.verifyEmail.user({
    email: verification.identifier,
  });

  if (!user.verified)
    return <VerifyEmailModel status={'firstTimeVerified'} callbackEmail={user.email}/>;


  await api.user.verifyEmail.verify({ email: verification.identifier });

  return <VerifyEmailModel status={'alreadyVerified'} callbackEmail={user.email}/>;

