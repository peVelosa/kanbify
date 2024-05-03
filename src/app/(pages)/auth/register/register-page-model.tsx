import FormCard from "../_components/form/form-card";
import RegisterPageView from "./register-page-view";

export default function RegisterPageModel() {
  return (
    <>
      <FormCard
        btnHref="/auth/login"
        btnLabel="Already have an account?"
        subtitle="Create your account!"
      >
        <RegisterPageView />
      </FormCard>
    </>
  );
}
