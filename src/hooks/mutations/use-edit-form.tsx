import { editBoardProps } from "@/actions/edit-board";
import { TBoardInfo } from "@/app/actions/get-board-info/type";
import api from "@/app/api/api";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseEditFormProps = {
  bid: string;
};

const useEditForm = ({ bid }: UseEditFormProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationKey: ["edit-board", bid],
    mutationFn: async (values: editBoardProps) =>
      await api.editBoard({
        bid,
        description: values.description,
        title: values.title,
        user_id: values.user_id!,
        titleChanged: values.titleChanged,
      }),
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: ["boards", bid] });

      const previousInformation = queryClient.getQueryData<TBoardInfo>(["boards", bid]);

      queryClient.setQueryData(
        ["boards", bid],
        (old: TBoardInfo): TBoardInfo => ({
          ...old!,
          title: values.title,
          description: values.description,
        }),
      );

      return { previousInformation };
    },
    onError: (err, newInfo, context) => {
      queryClient.setQueryData(["boards", bid], context?.previousInformation);
      toast({
        title: "Error",
        description: "Error editing board",
        variant: "destructive",
      });
    },
    onSuccess: (message) => {
      toast({
        title: "Board edited",
        description: message,
        variant: "default",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", bid] });
    },
  });

  return { ...mutation };
};

export default useEditForm;
