"use client";
import Card from "../card/card";
import { trpc } from "@/app/_trpc/client";
import { Card as SCard, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { type Board } from "@/types/trpc";
import Droppable from "./droppable";
import DropArea from "./drop-area";
import React from "react";

type BoardColumnProps = NonNullable<Board>["columns"][0];

const BoardColumn = ({ id, _count, order, title }: BoardColumnProps) => {
  const { data: cards } = trpc.boards.columns.byId.useQuery({ col_id: id });

  return (
    <>
      <SCard
        key={id}
        className="grid h-fit max-h-full w-[350px] flex-shrink-0 overflow-hidden pr-2"
      >
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <p className="font-bold">{title}</p>
          <p>{_count.cards}</p>
        </CardHeader>

        <Droppable>
          <CardContent className="max-h-full overflow-auto">
            <DropArea />
            {cards?.map((card) => (
              <React.Fragment key={card.id}>
                <Card {...card} />
                <DropArea />
              </React.Fragment>
            ))}
          </CardContent>
        </Droppable>
      </SCard>
    </>
  );
};

export default BoardColumn;
