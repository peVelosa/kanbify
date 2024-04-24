"use client";

import { newBoard } from "@/actions/create-board";
import { TCreateBoardSchema } from "@/schemas/create-board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../use-current-user";
import { useToast } from "@/components/ui/use-toast";
import { TBoards } from "@/app/actions/get-boards/type";
import api from "@/app/api/api";

export default function useNewBoard() {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["new-board"],
    mutationFn: (data: TCreateBoardSchema) => api.createBoard({ ...data, userId: user?.id! }),
    onMutate: (data) => {
      const previousBoards = queryClient.getQueryData(["boards"]);

      queryClient.setQueryData(["boards"], (old: TBoards) => ({
        ...old!,
        boardsOwned: [
          ...old?.boardsOwned!,
          {
            id: "temp-id",
            title: data.title,
            description: data.description,
            _count: {
              collaborators: 0,
            },
          },
        ],
      }));

      return { previousBoards };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(["boards"], context?.previousBoards);
      toast({
        title: "Error",
        description: "An error occurred while editing your board",
        variant: "destructive",
      });
    },
    onSuccess: (message) => {
      toast({
        title: "Board created",
        description: message,
        variant: "default",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
