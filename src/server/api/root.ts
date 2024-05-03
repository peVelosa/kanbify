import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRoutes, boardsRouters, authRoutes } from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  boards: boardsRouters,
  auth: authRoutes,
  user: userRoutes,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
