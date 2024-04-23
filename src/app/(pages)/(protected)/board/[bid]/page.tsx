import { redirect } from "next/navigation";
import { getBoard } from "@/app/actions/get-board-info";
import BoardPageController from "./board-page-controller";
import HydrationBoundary from "@/components/elements/hydration-boundary.";

type BoardPageProps = {
  params: {
    bid: string;
  };
};

export default async function BoardPage({ params: { bid } }: BoardPageProps) {
  if (!bid) return redirect("/dashboard");

  return (
    <>
      <HydrationBoundary
        queryKey={["boards", bid]}
        queryFn={() => getBoard({ bid })}
      >
        <BoardPageController />
      </HydrationBoundary>
    </>
  );
}
