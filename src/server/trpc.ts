import { getRole } from "@/app/actions/get-role";
import { auth } from "@/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { User } from "next-auth";
import { z } from "zod";

export type Context = {
  /**
   * User is nullable
   */
  user: User | null;
  isOwnerOrAdmin?: boolean;
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

export const createCallerFactory = t.createCallerFactory;

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

export const collaboratorProcedure = privateProcedure
  .input(
    z.object({
      bid: z.string(),
    }),
  )
  .use(async ({ ctx, next, input }) => {
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
