import getQueryClient from "@/app/getQueryClient";
import {
  dehydrate,
  QueryFunction,
  QueryKey,
  HydrationBoundary as HydrationBoundaryBase,
} from "@tanstack/react-query";

type HydrationBoundaryProps = {
  queryKey: QueryKey;
  queryFn: QueryFunction;
  children: React.ReactNode;
};

const HydrationBoundary = async ({ queryKey, queryFn, children }: HydrationBoundaryProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundaryBase state={dehydratedState}>{children}</HydrationBoundaryBase>
    </>
  );
};

export default HydrationBoundary;
