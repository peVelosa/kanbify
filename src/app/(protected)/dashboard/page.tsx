import DashboardView from "./dashboard-view";
import { auth } from "@/auth";
import { getBoards } from "@/actions/get-boards";
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import getQueryClient from "@/app/getQueryClient";

export default async function DashboardPage() {
  const session = await auth();

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({ 
    queryKey: ['boards'], 
    queryFn: ()=> getBoards(session?.user?.id)
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <DashboardView />
      </HydrationBoundary>
    </>
  );
}
