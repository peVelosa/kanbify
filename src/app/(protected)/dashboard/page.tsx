import DashboardView from "./dashboard-view";
import { auth } from "@/auth";
import { getBoards } from "@/actions/get-boards";

export default async function DashboardPage() {
  const session = await auth();

  const initialBoards = await getBoards(session?.user?.id);

  return (
    <>
      <DashboardView initialBoards={initialBoards} />
    </>
  );
}
