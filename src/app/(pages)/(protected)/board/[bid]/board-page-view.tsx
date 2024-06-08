"use client";

import { useState } from "react";
import BoardInfo from "./_components/board/column/board-info";
import BoardColumn from "./_components/board/column/board-column";
import { Reorder } from "framer-motion";
import { trpc } from "@/app/_trpc/client";
import { redirect } from "next/navigation";
import { type RouterOutput } from "@/types/trpc";

type BoardPageViewProps = {
  boardInitialParamas: NonNullable<RouterOutput["boards"]["byId"]>;
};

export default function BoardPageView({ boardInitialParamas }: BoardPageViewProps) {
  const { data: board } = trpc.boards.byId.useQuery(
    { bid: boardInitialParamas.id },
    {
      initialData: boardInitialParamas,
    },
  );

  const [columns, setColumns] = useState(boardInitialParamas.columns);

  if (!board) redirect("/dashboard");

  const info = {
    id: board.id,
    title: board.title,
    createdAt: board.createdAt,
    description: board?.description,
  };

  return (
    <>
      <BoardInfo {...info} />
      <div className="container relative mt-8 flex h-full max-h-full flex-1">
        <div className="absolute h-full max-h-full w-full pb-4">
          <Reorder.Group
            values={columns}
            onReorder={setColumns}
            axis="x"
            className="flex h-full max-h-full gap-8 overflow-x-auto pb-4"
          >
            {columns.map((column) => (
              <BoardColumn
                key={column.id}
                column={column}
              />
            ))}
          </Reorder.Group>
        </div>
      </div>
    </>
  );
}
