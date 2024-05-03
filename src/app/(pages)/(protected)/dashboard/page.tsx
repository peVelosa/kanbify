import HydrationBoundary from "@/components/elements/hydration-boundary.";
import DashboardPageController from "./dashboard-page-controller";

export default async function DashboardPage() {
  return (
    <>
      <HydrationBoundary>
        <DashboardPageController />
      </HydrationBoundary>
    </>
  );
}
