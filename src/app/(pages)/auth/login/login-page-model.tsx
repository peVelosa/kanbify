"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/app/actions/login";
import { trpc } from "@/app/_trpc/client";
import FormCard from "../_components/form/form-card";
import LoginPageView from "./login-page-view";
import { useSearchParams } from "next/navigation";
import { LoginSchema, type TLoginSchema } from "@/server/api/routers/auth/schemas";
import { type RouterOutput } from "@/types/trpc";

export default function LoginPageModel() {
  const searchParams = useSearchParams();

  const callbackEmail = searchParams.get("callbackEmail");

  const { mutateAsync: login } = trpc.auth.login.useMutation();

  const [message, setMessage] = useState<RouterOutput["auth"]["login"] | null>(null);

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: callbackEmail || "",
      password: "",
    },
  });

  const onSubmit = async (values: TLoginSchema) => {
    const result = await login(values);
    if (!result.success) {
      setMessage(result);
      return;
    }
    await signIn(values);
  };

  return (
    <>
      <FormCard
        btnHref="/auth/register"
        btnLabel="Don't have an account?"
        subtitle="Welcome back!"
      >
        <LoginPageView
          form={form}
          message={message}
          onSubmit={onSubmit}
        />
      </FormCard>
    </>
  );
}
