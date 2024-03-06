"use client";

import { useBoards } from "@/hooks/use-boards";
import BoardCard from "./_components/board/board-card";
import NewBoardDialog from "./_components/new-board-dialog";
import type { TBoards } from "@/app/actions/get-boards/type";

type TDashboardViewProps = {
  initialBoards: TBoards;
};

export default function DashboardView({ initialBoards }: TDashboardViewProps) {
  const { data: boards } = useBoards({ initialBoards });

  return (
    <>
      <div className="container">
        <NewBoardDialog />
      </div>
      <section className="mx-auto mt-8 grid max-w-[1500px] grid-cols-[repeat(auto-fill_,minmax(250px_,1fr))] gap-4 px-4">
        {boards?.map((board) => <BoardCard key={board.id} {...board} />)}
      </section>
    </>
  );
}
