"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  RegexUpperCase,
  RegexLowerCase,
  RegexNumber,
  RegexEspecialCharacter,
  type TRegisterSchema,
  type TPasswordRequirements,
} from "@/server/api/routers/auth/schemas";
import { trpc } from "@/app/_trpc/client";
import FormCard from "../_components/form/form-card";
import RegisterPageView from "./register-page-view";
import type { RouterOutput } from "@/types/trpc";

export default function RegisterPageModel() {
  const { mutateAsync: register } = trpc.auth.register.useMutation();

  const [message, setMessage] = useState<RouterOutput["auth"]["register"] | null>(null);
  const [requirements, setRequirements] = useState<TPasswordRequirements>({
    upperCase: false,
    lowerCase: false,
    number: false,
    specialCharacter: false,
  });

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const password = form.watch("password");

  useEffect(() => {
    setRequirements({
      upperCase: RegexUpperCase.test(password),
      lowerCase: RegexLowerCase.test(password),
      number: RegexNumber.test(password),
      specialCharacter: RegexEspecialCharacter.test(password),
    });
  }, [password]);

  const onSubmit = async (values: TRegisterSchema) => {
    setMessage(null);
    const result = await register(values);
    setMessage(result);
  };

  return (
    <>
      <FormCard
        btnHref="/auth/login"
        btnLabel="Already have an account?"
        subtitle="Create your account!"
      >
        <RegisterPageView
          onSubmit={onSubmit}
          message={message}
          requirements={requirements}
          form={form}
        />
      </FormCard>
    </>
  );
}
