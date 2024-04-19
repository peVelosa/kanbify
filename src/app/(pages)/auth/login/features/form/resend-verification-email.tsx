import { verificationEmail } from "@/actions/send-emails/verification-email";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useResendEmail from "./use-resend-email";

type ResendVerificationEmailProps = {
  warning?: string;
  email: string;
};

export default function ResendVerificationEmail({ warning, email }: ResendVerificationEmailProps) {
  const { countDown, updateTargetDate } = useResendEmail();

  if (!warning) return null;

  const sendEmail = async () => {
    const result = await verificationEmail({ email });
    if (result instanceof Date) {
      updateTargetDate(result);
    }
  };

  return (
    <div>
      <Button
        variant={"link"}
        onClick={sendEmail}
        className="pl-0"
        disabled={!!countDown && countDown > 0}
      >
        Resend Verification Email
      </Button>
      {countDown && countDown > 0 ? (
        <>
          <span className="block text-neutral-900">
            Try again in:{" "}
            {new Intl.DateTimeFormat("en-US", {
              second: "2-digit",
              minute: "2-digit",
            }).format(countDown < 0 ? 0 : countDown)}
          </span>
        </>
      ) : null}
    </div>
  );
}
