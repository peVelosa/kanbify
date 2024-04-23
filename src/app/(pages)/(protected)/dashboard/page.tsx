import { auth } from "@/auth";
import { getBoards } from "@/actions/get-boards";
import HydrationBoundary from "@/components/elements/hydration-boundary.";
import DashboardPageController from "./dashboard-page-controller";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <HydrationBoundary
        queryKey={["boards"]}
        queryFn={() => getBoards(session?.user?.id)}
      >
        <DashboardPageController />
      </HydrationBoundary>
    </>
  );
}
