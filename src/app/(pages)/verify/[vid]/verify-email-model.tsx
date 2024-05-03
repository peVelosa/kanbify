import VerifyEmailView from "./verify-email-view";

type VerifyEmailModelProps = {
  status: "invalid" | "alreadyVerified" | "firstTimeVerified";
  callbackEmail?: string;
};

const VerifyEmailModel = ({ status, callbackEmail }: VerifyEmailModelProps) => {
  const data =
    status === "invalid"
      ? {
          title: "Invalid verification token",
          message:
            "The verification token you used is invalid. Please request a new verification email.",
          buttonText: "Click here to go to home page",
          buttonLink: "/",
        }
      : status === "alreadyVerified"
        ? {
            title: "Email already verified",
            message: "Your email has been already verified",
            buttonText: "Login",
            buttonLink: `/auth/login?callbackEmail=${callbackEmail}`,
          }
        : {
            title: "Email Verified",
            message: "Your email has been successfully verified",
            buttonText: "Login",
            buttonLink: `/auth/login?callbackEmail=${callbackEmail}`,
          };

  return <VerifyEmailView {...data} />;
};

export default VerifyEmailModel;
