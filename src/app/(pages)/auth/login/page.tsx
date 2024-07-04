import { Suspense } from "react";
import LoginPageModel from "./login-page-model";

export default function LoginPage() {
  return (
    <>
      <Suspense>
        <LoginPageModel />
      </Suspense>
    </>
  );
}
