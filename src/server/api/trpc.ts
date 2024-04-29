import { isAllowedTo } from "@/app/actions/get-role";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { initTRPC, TRPCError } from "@trpc/server";
import { z, ZodError } from "zod";

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

export const privateProcedure = t.procedure.use(ensureAuthentication);

export const desiredRoleProcedure = privateProcedure
  .input(
    z.object({
      bid: z.string().trim().uuid(),
      desiredRole: z.array(z.enum(["OWNER", "ADMIN", "EMPLOYEE", "VISIT"])).default(["VISIT"]),
    }),
  )
  .use(async ({ ctx, next, input }) => {
    const { bid, desiredRole } = input;

    const isDesiredRole = await isAllowedTo({
      user_id: ctx.session.user.id,
      bid,
      desiredRole,
    });

    if (!isDesiredRole) throw new TRPCError({ code: "FORBIDDEN" });

    return next({
      ctx: {
        session: { ...ctx.session },
      },
    });
  });
