"use client";

import ResendVerificationEmail from "@/app/(pages)/auth/_components/resend-verification-email";
import PasswordInput from "@/app/(pages)/auth/_components/form/password-input";
import FormError from "@/app/(pages)/auth/_components/form/form-error";
import FormWarning from "@/app/(pages)/auth/_components/form/form-warning";
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
import { type TLoginSchema } from "@/server/api/routers/auth/schemas";
import { type UseFormReturn } from "react-hook-form";
import { type RouterOutput } from "@/types/trpc";

type LoginFormProps = {
  onSubmit: (values: TLoginSchema) => void;
  form: UseFormReturn<TLoginSchema, any, undefined>;
  message: RouterOutput["auth"]["login"] | null;
};

export default function LoginForm({ form, message, onSubmit }: LoginFormProps) {
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
