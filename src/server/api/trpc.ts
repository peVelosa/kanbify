import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import superjason from "superjson";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    db,
    session: { ...session },
    ...opts,
  };
};

type createTRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.context<createTRPCContext>().create({
  transformer: superjason,
  errorFormatter: ({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const createTRPCRouter = t.router;

export const createCallerFactory = t.createCallerFactory;

const ensureAuthentication = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user || !ctx.session.user.id)
    throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      session: { ...ctx.session, user: { ...ctx.session.user, id: ctx.session.user.id } },
    },
  });
});

export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(ensureAuthentication);
