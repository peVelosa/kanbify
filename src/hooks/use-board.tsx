"use client";

import { useParams } from "next/navigation";
import { useCurrentUser } from "./use-current-user";
import { trpc } from "@/app/_trpc/client";

export const useBoard = () => {
  const params = useParams() as { bid: string };

  return trpc.boards.byId.useQuery({
    bid: params.bid,
  });
};
