import { TBoards } from "@/app/actions/get-boards/type";
import api from "@/app/api/api";
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
      await api.deleteBoard({
        user_id: values.user_id,
        bid,
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
      toast({
        title: "Error",
        description: "Error deleting board",
        variant: "destructive",
      });
    },
    onSuccess: (message) => {
      toast({
        title: "Board deleted",
        description: message,
        variant: "default",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      router.replace("/dashboard");
    },
  });

  return { ...mutation };
};

export default useDeleteBoard;
