"use client";

import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";
import api from "@/app/api/api";

export const useBoards = () => {
  const { data: user } = useCurrentUser();

  const userId = user?.id;

  return useQuery({
    queryKey: ["boards"],
    queryFn: () => api.getBoards(userId),
    enabled: !!userId,
  });
};
