import { verificationEmail } from "@/actions/send-emails/verification-email";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type ResendVerificationEmailProps = {
  warning?: string;
  email: string;
};

export default function ResendVerificationEmail({
  warning,
  email,
}: ResendVerificationEmailProps) {
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const [countDown, setCountDown] = useState<number | undefined | null>(null);

  useEffect(() => {
    if (!targetDate || !countDown || countDown < 0) return;

    const timer = setTimeout(() => {
      setCountDown(targetDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown, targetDate]);

  useEffect(() => {
    if (!targetDate) return;
    setCountDown(targetDate.getTime() - new Date().getTime());
  }, [targetDate]);

  if (!warning) return null;

  const sendEmail = async () => {
    const result = await verificationEmail({ email });
    setTargetDate(result);
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
