import DashboardPageView from "./dashboard-page-view";
import { api } from "@/app/_trpc/server";

const DashboardPageController = async () => {
  const boards = await api.boards.all();

  return (
    <>
      <DashboardPageView boards={boards} />
    </>
  );
};

export default DashboardPageController;
