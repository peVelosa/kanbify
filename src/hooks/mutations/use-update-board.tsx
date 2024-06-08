import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";

type UseUpdateBoardProps = {
  bid: string;
};

const useUpdateBoard = ({ bid }: UseUpdateBoardProps) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  return trpc.boards.update.useMutation({
    mutationKey: ["edit-board", bid],
    onMutate: async (data) => {
      await utils.boards.byId.cancel({ bid });

      const previousInformation = utils.boards.byId.getData({ bid });

      utils.boards.byId.setData(
        { bid: data.bid },
        (old: typeof previousInformation) =>
          ({
            ...old!,
            title: data.title,
            description: data.description,
          }) as typeof previousInformation,
      );

      return { previousInformation };
    },
    onError: (error, variables, context) => {
      utils.boards.byId.setData({ bid }, context?.previousInformation);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Board edited",
        description: data.message,
        variant: "default",
      });
    },
    onSettled: () => {
      utils.boards.byId.invalidate({ bid });
    },
  });
};

export default useUpdateBoard;
