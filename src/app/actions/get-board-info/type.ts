import { getBoard } from ".";

export type TBoardInfo = Awaited<ReturnType<typeof getBoard>>;
