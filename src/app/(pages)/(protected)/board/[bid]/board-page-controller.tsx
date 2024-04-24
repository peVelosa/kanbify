"use client";
import { useBoard } from "@/hooks/use-board";
import BoardPageView from "./board-page-view";

const BoardPageController = () => {
  const { data: board } = useBoard();

  if (!board) return null;

  return (
    <>
      <BoardPageView board={board} />
    </>
  );
};

export default BoardPageController;
