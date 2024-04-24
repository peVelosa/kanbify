"use client";

import { trpc } from "@/app/_trpc/client";

export const useBoards = () => {
  return trpc.boards.useQuery();
};
