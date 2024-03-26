import { z } from "zod";

export const DeleteBoardSchema = z.object({
  deleteProject: z.string().refine((v) => v === "delete my project", {
    message: "Please type 'delete my project' to enable the delete button",
  }),
});
