"use client";

import { useCurrentUser } from "./use-current-user";
import { trpc } from "@/app/_trpc/client";

export const useBoards = () => {
  const { data: user } = useCurrentUser();

  const userId = user?.id;

  return trpc.getBoards.useQuery({ uid: userId });
};
