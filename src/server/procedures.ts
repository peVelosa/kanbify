import { getRole } from "@/app/actions/get-role";
import { auth } from "@/auth";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "./trpc";

export const publicProcedure = t.procedure;

const isAuthed = t.middleware(async ({ next }) => {
  const data = await auth();
  const isAuth = !!data;

  if (!isAuth) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      user: data.user,
    },
  });
});

export const privateProcedure = t.procedure.use(isAuthed);

const collaboratorProcedure = privateProcedure.input(
  z.object({
    bid: z.string(),
  }),
);

export const adminProcedure = collaboratorProcedure.use(async function isOwnerOrAdmin({
  ctx,
  next,
  input,
}) {
  const { user } = ctx;
  const { bid } = input;

  const role = await getRole({
    user_id: user?.id ?? "",
    bid: bid,
    desiredRole: ["OWNER", "ADMIN"],
  });

  return next({
    ctx: {
      user: user,
      isOwnerOrAdmin: role.success === "Allowed",
    },
  });
});

export const ownerProcedure = collaboratorProcedure.use(async function isOwner({
  ctx,
  next,
  input,
}) {
  const { user } = ctx;
  const { bid } = input;

  const role = await getRole({
    user_id: user?.id ?? "",
    bid: bid,
    desiredRole: ["OWNER"],
  });

  return next({
    ctx: {
      user: user,
      isOwnerOrAdmin: role.success === "Allowed",
    },
  });
});
