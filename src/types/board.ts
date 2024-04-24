import { RouterOutput } from "./trpc";

export type Board = NonNullable<RouterOutput["getBoard"]>;
