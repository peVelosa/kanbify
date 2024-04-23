import { auth } from "@/auth";
import HydrationBoundary from "@/components/elements/hydration-boundary.";
import DashboardPageController from "./dashboard-page-controller";
import api from "@/app/api/api";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <HydrationBoundary
        queryKey={["boards"]}
        queryFn={() => api.getBoards(session?.user?.id)}
      >
        <DashboardPageController />
      </HydrationBoundary>
    </>
  );
}
