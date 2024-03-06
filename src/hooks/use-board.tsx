"use client";

import { getBoard } from "@/actions/get-board-info";
import { TBoardInfo } from "@/actions/get-board-info/type";
import { useQuery } from "@tanstack/react-query";

type useBoardProps = {
  bid: string;
  initialBoard?: TBoardInfo;
};

export const useBoard = ({ initialBoard, bid }: useBoardProps) => {
  return useQuery({
    queryKey: ["boards", bid],
    queryFn: () => getBoard({ bid }),
    initialData: initialBoard,
    enabled: !bid,
  });
};
