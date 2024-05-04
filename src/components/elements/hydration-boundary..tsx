// import { dehydrate, HydrationBoundary as HydrationBoundaryBase } from "@tanstack/react-query";

type HydrationBoundaryProps = {
  children: React.ReactNode;
};

const HydrationBoundary = async ({ children }: HydrationBoundaryProps) => {
  // const dehydratedState = dehydrate(serverClient.queryClient);

  return (
    <>
      {/* <HydrationBoundaryBase state={dehydratedState}>{children}</HydrationBoundaryBase> */}
      {children}
    </>
  );
};

export default HydrationBoundary;
