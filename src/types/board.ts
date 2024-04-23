import { getBoard } from "@/app/actions/get-board-info";
import { getBoards } from "@/app/actions/get-boards";

export type Boards = Awaited<ReturnType<typeof getBoards>> | undefined;
export type Board = Awaited<ReturnType<typeof getBoard>> | undefined;
