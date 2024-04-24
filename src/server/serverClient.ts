import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from ".";
import { t } from "./trpc";

export const serverClient = createServerSideHelpers({
  router: appRouter,
  ctx: t,
});
