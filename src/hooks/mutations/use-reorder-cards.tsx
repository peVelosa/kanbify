"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/app/_trpc/client";

type MutationProps = {
  sourceColumnId: string;
  targetColumnId: string;
  isSameColumn: boolean;
};

export default function useReoderCards() {
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const [columnsId, setColumnsId] = useState<MutationProps>({
    sourceColumnId: "",
    targetColumnId: "",
    isSameColumn: false,
  });

  return trpc.boards.cards.reorder.useMutation({
    mutationKey: ["reorder-cards"],
    onMutate: async ({ targetColumn, sourceColumn, isSameColumn }) => {
      setColumnsId({
        sourceColumnId: sourceColumn.id,
        targetColumnId: targetColumn.id,
        isSameColumn,
      });

      await Promise.all([
        utils.boards.cards.byColumnId.cancel({ col_id: targetColumn.id }),
        utils.boards.cards.byColumnId.cancel({ col_id: sourceColumn.id }),
      ]);

      const previousCardsSourceColumn = utils.boards.cards.byColumnId.getData({
        col_id: targetColumn.id,
      });
      const previousCardsTargetColumn = utils.boards.cards.byColumnId.getData({
        col_id: targetColumn.id,
      });
      if (!isSameColumn) {
        utils.boards.cards.byColumnId.setData(
          {
            col_id: sourceColumn.id,
          },
          (_: typeof previousCardsSourceColumn) => [...sourceColumn.cards],
        );
      }

      utils.boards.cards.byColumnId.setData(
        {
          col_id: targetColumn.id,
        },
        (_: typeof previousCardsTargetColumn) => [...targetColumn.cards],
      );

      return { previousCardsSourceColumn, previousCardsTargetColumn };
    },
    onError(error, variables, context) {
      utils.boards.cards.byColumnId.setData(
        { col_id: columnsId.sourceColumnId },
        context?.previousCardsSourceColumn,
      );
      utils.boards.cards.byColumnId.setData(
        { col_id: columnsId.targetColumnId },
        context?.previousCardsTargetColumn,
      );

      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Cards reordered",
        variant: "default",
      });
    },
    onSettled: () => {
      if (!columnsId.isSameColumn) {
        utils.boards.cards.byColumnId.invalidate({ col_id: columnsId.sourceColumnId });
      }
      utils.boards.cards.byColumnId.invalidate({ col_id: columnsId.targetColumnId });
    },
  });
}
