import type { AppRouter } from "@/server/api/root";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;

export type InviteGet = RouterOutput["boards"]["invite"]["get"];
export type Board = NonNullable<RouterOutput["boards"]["byId"]>;
export type Boards = RouterOutput["boards"]["all"] | null | undefined;
