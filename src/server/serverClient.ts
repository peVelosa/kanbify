import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from ".";
import { type Context } from "./trpc";

export const serverClient = createServerSideHelpers({
  router: appRouter,
  ctx: {} as Context,
});
