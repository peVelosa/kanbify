"use client";

import { getBoards } from "@/actions/get-boards";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";


export const useBoards = () => {
  const { data:user } = useCurrentUser()

  const userId = user?.id

  return useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(userId),
    enabled: !!userId,
  });
};
