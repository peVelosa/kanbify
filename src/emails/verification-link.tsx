import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerificationLinkProps {
  verificationTokenId: string;
  expiresAt: Date;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const VerificationLink = ({
  verificationTokenId,
  expiresAt,
}: VerificationLinkProps) => {
  const url = `${baseUrl}/verify/${verificationTokenId}`;

  return (
    <Html>
      <Head />
      <Preview>Verification link.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>🪄 Your verification link</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Link style={link} href={url}>
                👉 Click here to verify 👈
              </Link>
            </Text>
            <Text style={paragraph}>
              This link will expires at:{" "}
              {new Intl.DateTimeFormat("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(expiresAt)}
            </Text>
            <Text style={paragraph}>
              If you didn&apos;t request this, please ignore this email.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- Kanbify Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationLink;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
