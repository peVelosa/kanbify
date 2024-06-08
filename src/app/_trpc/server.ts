import { cache } from "react";
import {  createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

import { headers } from "next/headers";

const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

/**
 * Server-side calls for the tRPC API.
 * @example
 * await trpc.boards.all();
 */
export const api = createCaller(createContext);

