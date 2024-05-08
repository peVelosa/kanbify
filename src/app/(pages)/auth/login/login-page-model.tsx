import { Suspense } from "react";
import FormCard from "../_components/form/form-card";
import LoginPageView from "./login-page-view";

export default function LoginPageModel() {
  return (
    <>
      <FormCard
        btnHref="/auth/register"
        btnLabel="Don't have an account??"
        subtitle="Welcome back!"
      >
        <Suspense>
        <LoginPageView />
        </Suspense>
      </FormCard>
    </>
  );
}
