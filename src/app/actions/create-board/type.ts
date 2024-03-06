import * as z from "zod";
import { CreateBoardSchema } from "./schema";

export type TCreateBoardSchema = z.infer<typeof CreateBoardSchema>;
