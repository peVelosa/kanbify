"use client";

import { useBoard } from "@/hooks/use-board";
import BoardInfo from "./_components/board/board-info";

type BoardPageViewProps = {
  initialBoard: any;
};

export default function BoardPageView({ initialBoard }: BoardPageViewProps) {
  const { data: board } = useBoard({ initialBoard, bid: initialBoard.id });

  if (!board) return null;

  const info = {
    id: board.id,
    title: board.title,
    createdAt: board.createdAt,
    description: board?.description,
  };

  return (
    <>
      <BoardInfo {...info} />
      <p>oi</p>
    </>
  );
}
