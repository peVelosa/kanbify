import { getBoards } from ".";

export type TBoards = Awaited<ReturnType<typeof getBoards>>;

export type TBoard = {
  id: string;
  title: string;
  description: string | null;
  _count: {
    collaborators: number;
  };
};
