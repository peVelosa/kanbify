import * as z from "zod";
import { RegisterSchema } from "./schema";

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
