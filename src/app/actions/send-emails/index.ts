"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.EMAIL_SECRET);

type sendProps = {
  to: string;
  subject: string;
  component: JSX.Element;
};

const send = async ({ subject, to, component }: sendProps) => {
  await resend.emails.send({
    from: "Kanbify <onboarding@resend.dev>",
    to: to,
    subject: subject,
    react: component,
  });
};

export default send;
