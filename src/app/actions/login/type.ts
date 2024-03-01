import * as z from "zod";
import { LoginSchema } from "./schema";

export type TLoginSchema = z.infer<typeof LoginSchema>;
