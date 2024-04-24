import { auth } from "@/auth";
import HydrationBoundary from "@/components/elements/hydration-boundary.";
import DashboardPageController from "./dashboard-page-controller";
import { serverClient } from "@/server/serverClient";

export default async function DashboardPage() {
  const session = await auth();

  await serverClient.getBoards.prefetch({
    uid: session?.user?.id,
  });

  return (
    <>
      <HydrationBoundary>
        <DashboardPageController />
      </HydrationBoundary>
    </>
  );
}
