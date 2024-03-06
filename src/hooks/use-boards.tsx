"use client";

import { getBoards } from "@/actions/get-boards";
import { TBoards } from "@/app/actions/get-boards/type";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type useBoardsProps = {
  initialBoards?: TBoards;
};

export const useBoards = ({ initialBoards }: useBoardsProps) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(session?.user?.id),
    initialData: initialBoards,
    enabled: !session?.user?.id,
  });
};
