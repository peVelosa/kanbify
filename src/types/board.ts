import { RouterOutput } from "./trpc";

export type Board = NonNullable<RouterOutput["boards"]["byId"]>;
export type Boards = NonNullable<RouterOutput["boards"]["all"]>;
