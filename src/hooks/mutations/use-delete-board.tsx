import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const useDeleteBoard = () => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useUtils();

  return trpc.board.delete.useMutation({
    mutationKey: ["delete-board"],
    onMutate: async (data) => {
      await utils.boards.cancel();
      const previousBoards = utils.boards.getData();

      utils.boards.setData(undefined, (old: typeof previousBoards) => ({
        ...old!,
        boardsOwned: [...old?.boardsOwned!].filter((b) => b.id !== data.bid),
      }));

      return { previousBoards };
    },
    onError: (error, variables, context) => {
      utils.boards.setData(undefined, context?.previousBoards);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Board deleted",
        description: data.message,
        variant: "default",
      });
      router.replace("/dashboard");
    },
    onSettled: () => {
      utils.boards.invalidate();
    },
  });
};

export default useDeleteBoard;
