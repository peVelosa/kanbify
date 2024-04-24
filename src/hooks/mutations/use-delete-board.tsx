import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type useDeleteBoardProps = {
  bid: string;
};

const useDeleteBoard = ({ bid }: useDeleteBoardProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useUtils();

  return trpc.deleteBoard.useMutation({
    mutationKey: ["delete-board", bid],
    onMutate: async (data) => {
      await utils.getBoards.cancel();
      const previousBoards = utils.getBoards.getData({ uid: data.uid });

      utils.getBoards.setData({ uid: data.uid }, (old: typeof previousBoards) => ({
        ...old!,
        boardsOwned: [...old?.boardsOwned!].filter((b) => b.id !== bid),
      }));

      return { previousBoards };
    },
    onError: (error, variables, context) => {
      utils.getBoards.setData({ uid: variables.uid }, context?.previousBoards);
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
    },
    onSettled: () => {
      utils.getBoards.invalidate();
      router.replace("/dashboard");
    },
  });
};

export default useDeleteBoard;
