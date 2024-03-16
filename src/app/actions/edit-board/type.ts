import * as z from "zod";
import { EditBoardSchema } from "./schema";

export type TEditBoardSchema = z.infer<typeof EditBoardSchema>;
