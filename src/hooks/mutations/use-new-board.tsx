"use client";

import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/app/_trpc/client";

export default function useNewBoard() {
  const { toast } = useToast();
  const utils = trpc.useUtils();

  return trpc.boards.create.useMutation({
    mutationKey: ["new-board"],
    onMutate: async (data) => {
      await utils.boards.all.cancel();
      const previousBoards = utils.boards.all.getData();

      utils.boards.all.setData(
        undefined,
        (old: typeof previousBoards) =>
          ({
            boardsCollaborated: [...old?.boardsCollaborated!],
            boardsOwned: [
              ...old?.boardsOwned!,
              {
                id: "temp-id",
                title: data.title,
                description: data.description,
                _count: {
                  collaborators: 1,
                },
              },
            ],
          }) as typeof previousBoards,
      );

      return { previousBoards };
    },
    onError(error, variables, context) {
      utils.boards.all.setData(undefined, context?.previousBoards);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: ({ message }) => {
      toast({
        title: "Board created",
        description: message,
        variant: "default",
      });
    },
    onSettled: () => {
      console.log("refetching");
      utils.boards.all.invalidate();
    },
  });
}
