"use client";

import { getBoard } from "@/actions/get-board-info";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useBoard = () => {
  const params = useParams() as { bid: string };

  return useQuery({
    queryKey: ["boards", params.bid],
    queryFn: () => getBoard({ bid: params.bid }),
    enabled: !!params.bid,
  });
};
