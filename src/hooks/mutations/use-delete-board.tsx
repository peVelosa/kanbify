import { deleteBoard } from "@/app/actions/delete-board";
import { TBoards } from "@/app/actions/get-boards/type";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type useDeleteBoardProps = {
  bid: string;
};

const useDeleteBoard = ({ bid }: useDeleteBoardProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["delete-board", bid],
    mutationFn: async (values: { bid: string; user_id: string }) =>
      await deleteBoard({
        bid: values.bid,
        user_id: values.user_id,
      }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["boards"] });

      const previousBoards = queryClient.getQueryData<TBoards>(["boards"]);

      queryClient.setQueryData(
        ["boards"],
        (old: TBoards): TBoards => ({
          ...old!,
          boardsOwned: [...old?.boardsOwned!].filter((b) => b.id !== bid),
        }),
      );

      return { previousBoards };
    },
    onError: (err, __, context) => {
      queryClient.setQueryData(["boards"], context?.previousBoards);
    },
    onSuccess: (response) => {
      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Board deleted",
          description: response.success,
          variant: "default",
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      router.replace("/dashboard");
    },
  });

  return { ...mutation };
};

export default useDeleteBoard;
