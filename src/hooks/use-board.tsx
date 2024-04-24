"use client";

import api from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useBoard = () => {
  const params = useParams() as { bid: string };

  return useQuery({
    queryKey: ["boards", params.bid],
    queryFn: () => api.getBoard(params.bid),
    enabled: !!params.bid,
  });
};
