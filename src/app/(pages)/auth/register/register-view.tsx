import FormCard from "../_components/form/form-card";
import RegisterForm from "./features/form/register-form";

export default function RegisterView() {
  return (
    <>
      <FormCard
        btnHref="/auth/login"
        btnLabel="Already have an account?"
        subtitle="Create your account!"
      >
        <RegisterForm />
      </FormCard>
    </>
  );
}
