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
import PasswordInput from "@/app/auth/_components/form/password-input";
import { LoginSchema } from "@/app/actions/login/schema";
import { TLoginSchema } from "@/app/actions/login/type";
import { login } from "@/app/actions/login";
import FormError from "@/app/auth/_components/form/form-error";
import FormWarning from "@/app/auth/_components/form/form-warning";
import { Suspense, useState } from "react";
import ResendVerificationEmail from "./resend-verification-email";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();

  const [message, setMessage] = useState<any>("");

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: searchParams.get("callbackEmail") || "",
      password: "",
    },
  });

  const onSubmit = async (values: TLoginSchema) => {
    const result = await login(values);
    setMessage(result);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@email.com" {...field} />
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
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
