"use client";

import { newBoard } from "@/actions/create-board";
import { TCreateBoardSchema } from "@/actions/create-board/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";
import { useToast } from "@/components/ui/use-toast";

export default function useNewBoard() {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["new-board"],
    mutationFn: (data: TCreateBoardSchema) =>
      newBoard({ ...data, userId: user?.id }),
    onMutate: (data) => {
      const previousBoards = queryClient.getQueryData(["boards"]);

      queryClient.setQueryData(["boards"], (old: any) => [
        { ...data, id: "temp-id", _count: { collaborators: 0 } },
        ...old,
      ]);

      return { previousBoards };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(["boards"], context?.previousBoards);
      toast({
        title: "Error",
        description: "An error occurred while creating your board",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Board created",
        description: "Your board has been created successfully",
        variant: "default",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
