"use client";

import { useBoard } from "@/hooks/use-board";
import BoardPageView from "./board-page-view";
import { redirect } from "next/navigation";

const BoardPageController = () => {
  const { data: board, isError } = useBoard();

  if (isError) redirect("/dashboard");
  if (!board) return null;

  return (
    <>
      <BoardPageView board={board} />
    </>
  );
};

export default BoardPageController;
