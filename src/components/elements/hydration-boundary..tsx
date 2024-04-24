import { dehydrate, HydrationBoundary as HydrationBoundaryBase } from "@tanstack/react-query";
import { serverClient } from "@/server/serverClient";

type HydrationBoundaryProps = {
  children: React.ReactNode;
};

const HydrationBoundary = async ({ children }: HydrationBoundaryProps) => {
  const dehydratedState = dehydrate(serverClient.queryClient);

  return (
    <>
      {JSON.stringify(dehydratedState)}
      <HydrationBoundaryBase state={dehydratedState}>{children}</HydrationBoundaryBase>
    </>
  );
};

export default HydrationBoundary;
