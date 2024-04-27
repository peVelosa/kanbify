import { initTRPC } from "@trpc/server";
import type { User } from "next-auth";

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
export const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

export const createCallerFactory = t.createCallerFactory;
