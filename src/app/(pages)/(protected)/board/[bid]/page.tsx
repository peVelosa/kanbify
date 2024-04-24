import { redirect } from "next/navigation";
import BoardPageController from "./board-page-controller";
import HydrationBoundary from "@/components/elements/hydration-boundary.";
import { auth } from "@/auth";
import getBoard from "@/app/actions/get-board";
import { serverClient } from "@/server/serverClient";

type BoardPageProps = {
  params: {
    bid: string;
  };
};

export default async function BoardPage({ params: { bid } }: BoardPageProps) {
  const session = await auth();

  const isValidBoard = await getBoard(bid, session?.user?.id);

  if (!isValidBoard) redirect("/dashboard");

  await serverClient.getBoard.prefetch({
    uid: session?.user?.id,
    bid: bid,
  });

  return (
    <>
      <HydrationBoundary>
        <BoardPageController />
      </HydrationBoundary>
    </>
  );
}
