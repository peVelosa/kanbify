import { z } from "zod";

export const RegexUpperCase = /[A-Z]+/;
export const RegexLowerCase = /[a-z]+/;
export const RegexNumber = /\d+/;
export const RegexEspecialCharacter = /[&=\?@#\|'<>\*%!-]+/;

export const PasswordSchema = z
  .string()
  .min(6)
  .superRefine((password, ctx) => {
    if (
      !RegexUpperCase.test(password) ||
      !RegexLowerCase.test(password) ||
      !RegexNumber.test(password) ||
      !RegexEspecialCharacter.test(password)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must satisfy the following requirements",
      });
    }
  });

export const RegisterSchema = z
  .object({
    email: z.string().email().trim().toLowerCase(),
    name: z.string().min(3),
    password: PasswordSchema,
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.password === data["confirm_password"], {
    message: "Password must match",
    path: ["confirm_password"],
  });

export type TPasswordRequirements = {
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
  specialCharacter: boolean;
};
export type TRegisterSchema = z.infer<typeof RegisterSchema>;
export type TPasswordSchema = z.infer<typeof PasswordSchema>;
