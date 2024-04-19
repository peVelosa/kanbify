import { redirect } from "next/navigation";
import BoardPageView from "./board-page-view";
import { getBoard } from "@/app/actions/get-board-info";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";

type BoardPageProps = {
  params: {
    bid: string;
  };
};

export default async function BoardPage({ params: { bid } }: BoardPageProps) {
  if (!bid) return redirect("/dashboard");

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["boards", bid],
    queryFn: () => getBoard({ bid }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <BoardPageView />
      </HydrationBoundary>
    </>
  );
}
