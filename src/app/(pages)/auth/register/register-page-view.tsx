"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import PasswordInput from "@/app/(pages)/auth/_components/form/password-input";
import { useEffect, useState } from "react";
import Requirements from "../_components/form/requirements";
import FormError from "@/app/(pages)/auth/_components/form/form-error";
import FormSuccess from "@/app/(pages)/auth/_components/form/form-success";
import FormWarning from "@/app/(pages)/auth/_components/form/form-warning";
import { trpc } from "@/app/_trpc/client";
import {
  RegisterSchema,
  type TRegisterSchema,
  RegexEspecialCharacter,
  RegexLowerCase,
  RegexNumber,
  RegexUpperCase,
} from "@/server/api/routers/auth/schemas";

export default function RegisterPageView() {
  const { mutateAsync: register } = trpc.auth.register.useMutation();

  const [message, setMessage] = useState<any>(null);
  const [requirements, setRequirements] = useState({
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
    setMessage({ error: "", success: "" });
    const result = await register(values);
    setMessage(result);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {form.formState.isSubmitted && !form.formState.isSubmitSuccessful && (
          <Requirements {...requirements} />
        )}
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError error={message?.error} />
        <FormWarning warning={message?.warning} />
        <FormSuccess success={message?.success} />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
