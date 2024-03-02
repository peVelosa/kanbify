import FormCard from "../_components/form/form-card";
import LoginForm from "./features/form/login-form";
import { Suspense } from "react";

export default function LoginView() {
  return (
    <>
      <FormCard
        btnHref="/auth/register"
        btnLabel="Don't have an account??"
        subtitle="Welcome back!"
      >
        <Suspense fallback={<h1>loading...</h1>}>
          <LoginForm />
        </Suspense>
      </FormCard>
    </>
  );
}
