import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const useDeleteBoard = () => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useUtils();

  return trpc.boards.delete.useMutation({
    mutationKey: ["delete-board"],
    onMutate: async (data) => {
      await utils.boards.all.cancel();
      const previousBoards = utils.boards.all.getData();

      if (!previousBoards) return { previousBoards };

      utils.boards.all.setData(undefined, (old) => ({
        ...old!,
        boardsOwned: [...old?.boardsOwned!].filter((b) => b.id !== data.bid),
      }));

      return { previousBoards };
    },
    onError: (error, variables, context) => {
      utils.boards.all.setData(undefined, context?.previousBoards);

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
      utils.boards.all.invalidate();
    },
  });
};

export default useDeleteBoard;
