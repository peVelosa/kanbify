import { RouterOutput } from "./trpc";

export type Board = NonNullable<RouterOutput["board"]["byId"]>;
export type Boards = NonNullable<RouterOutput["boards"]>;
