import { redirect } from "next/navigation";
import BoardPageController from "./board-page-controller";
import HydrationBoundary from "@/components/elements/hydration-boundary.";
import api from "@/app/api/api";

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
        queryFn={() => api.getBoard(bid)}
      >
        <BoardPageController />
      </HydrationBoundary>
    </>
  );
}
