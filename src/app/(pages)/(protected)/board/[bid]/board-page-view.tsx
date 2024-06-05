"use client";

import BoardInfo from "./_components/board/column/board-info";
import BoardColumn from "./_components/board/column/board-column";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { type Board } from "@/types/trpc";

type BoardPageViewProps = {
  board: NonNullable<Board>;
};

export default function BoardPageView({ board }: BoardPageViewProps) {
  const [columns, setColumns] = useState(board.columns);

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
