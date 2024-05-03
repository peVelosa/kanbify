"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PasswordInput from "@/app/(pages)/auth/_components/form/password-input";
import { signIn } from "@/app/actions/login";
import FormError from "@/app/(pages)/auth/_components/form/form-error";
import FormWarning from "@/app/(pages)/auth/_components/form/form-warning";
import { useState } from "react";
import ResendVerificationEmail from "../_components/resend-verification-email";
import { useSearchParams } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { LoginSchema, type TLoginSchema } from "@/server/api/routers/auth/schemas";

export default function LoginForm() {
  const searchParams = useSearchParams();

  const callbackEmail = searchParams.get("callbackEmail");

  const { mutateAsync: login } = trpc.auth.login.useMutation();

  const [message, setMessage] = useState<any>(null);

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: callbackEmail || "",
      password: "",
    },
  });

  const onSubmit = async (values: TLoginSchema) => {
    const result = await login(values);
    if (!result.success) return setMessage(result);
    await signIn(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <ResendVerificationEmail
                  warning={message?.warning}
                  email={field.value}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError error={message?.error} />
          <FormWarning warning={message?.warning} />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
