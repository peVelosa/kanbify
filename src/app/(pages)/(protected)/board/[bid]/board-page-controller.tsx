import BoardPageView from "./board-page-view";
import { api } from "@/app/_trpc/server";

type BoardPageControllerProps = {
  bid: string;
};

const BoardPageController = async ({ bid }: BoardPageControllerProps) => {
  const board = await api.boards.byId({ bid });

  if (!board) return null;

  return (
    <>
      <BoardPageView boardInitialParamas={board} />
    </>
  );
};

export default BoardPageController;
