import api from "@/app/api/api";

export type Boards = Awaited<ReturnType<typeof api.getBoards>> | undefined;
export type Board = {
  id: string;
  title: string;
  description: string | null;
  _count: {
    collaborators: number;
  };
};
