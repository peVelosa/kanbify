import FormCard from "../_components/form/form-card";
import LoginForm from "./features/form/login-form";

export default function LoginView() {
  return (
    <>
      <FormCard
        btnHref="/auth/register"
        btnLabel="Don't have an account??"
        subtitle="Welcome back!"
      >
        <LoginForm />
      </FormCard>
    </>
  );
}
