"use client";
import React, { type ElementRef, useRef, type PointerEvent } from "react";
import Card from "../card/card";
import { trpc } from "@/app/_trpc/client";
import { Card as SCard, CardContent, CardHeader } from "@/components/ui/card";
import Droppable from "@/components/elements/drag-and-drop/droppable";
import Draggable from "@/components/elements/drag-and-drop/draggable";
import { Reorder, useDragControls } from "framer-motion";
import { type RouterOutput } from "@/types/trpc";

type BoardColumnProps = {
  column: NonNullable<RouterOutput["boards"]["byId"]>["columns"][0];
};

const BoardColumn = ({ column }: BoardColumnProps) => {
  const { id: col_id, title, order, _count } = column;

  const { data: cards } = trpc.boards.cards.byColumnId.useQuery({ col_id });
  const dragControls = useDragControls();
  const grabberRef = useRef<ElementRef<"div">>(null);

  const handlePointerDown = (e: PointerEvent) => dragControls.start(e);

  return (
    <>
      <Reorder.Item
        key={col_id}
        value={column}
        dragListener={false}
        dragControls={dragControls}
      >
        <SCard
          className="h-fit max-h-full w-[350px] flex-shrink-0 overflow-hidden p-6 pr-8"
          onPointerDown={handlePointerDown}
        >
          <div
            className="mb-4 h-4 w-full cursor-grab rounded-sm bg-slate-700"
            ref={grabberRef}
            onPointerDown={() => {
              if (!grabberRef.current) return;
              grabberRef.current.style.cursor = "grabbing";
            }}
            onPointerUp={() => {
              if (!grabberRef.current) return;
              grabberRef.current.style.cursor = "grab";
            }}
          />
          <CardHeader
            className="mb-4 flex-row items-center gap-4 space-y-0 p-0"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <p className="font-bold">{title}</p>
            <p>{_count.cards}</p>
          </CardHeader>

          <CardContent
            className="max-h-full overflow-auto p-0"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Draggable
              cards={cards ?? null}
              columnId={col_id}
            >
              <Droppable
                index={0}
                cards={cards ?? []}
                columnId={col_id}
              />
              {cards?.map((card, index) => (
                <React.Fragment key={card.id}>
                  <Card card={card} />
                  <Droppable
                    index={index + 1}
                    cards={cards ?? []}
                    columnId={col_id}
                  />
                </React.Fragment>
              ))}
            </Draggable>
          </CardContent>
        </SCard>
      </Reorder.Item>
    </>
  );
};

export default BoardColumn;
