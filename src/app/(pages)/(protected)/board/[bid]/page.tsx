import { redirect } from "next/navigation";
import BoardPageController from "./board-page-controller";
import HydrationBoundary from "@/components/elements/hydration-boundary.";
import { api } from "@/app/_trpc/server";

type BoardPageProps = {
  params: {
    bid: string;
  };
};

export default async function BoardPage({ params: { bid } }: BoardPageProps) {
  const isValidBoard = await api.boards.byId({ bid });

  if (!isValidBoard) redirect("/dashboard");

  return (
    <>
      <HydrationBoundary>
        <BoardPageController bid={bid} />
      </HydrationBoundary>
    </>
  );
}
