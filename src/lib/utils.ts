import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, type ZodSchema } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateFields<TInput, TSchema extends ZodSchema<TInput>>(
  values: TInput,
  schema: TSchema,
): TInput | null {
  const validatedFields = schema.safeParse(values);

  if (!validatedFields.success) return null;

  const validFields = validatedFields.data;

  return { ...validFields };
}
