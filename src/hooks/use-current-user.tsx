"use client";

import { getUserById } from "@/actions/get-user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(session?.user?.id),
    initialData: session?.user,
    enabled: !!session?.user?.id,
  });
};
