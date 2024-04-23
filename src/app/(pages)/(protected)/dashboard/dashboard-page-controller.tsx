"use client";

import DashboardView from "./dashboard-page-view";
import { useBoards } from "@/hooks/use-boards";

const DashboardPageController = () => {
  const { data: boards } = useBoards();

  return (
    <>
      <DashboardView boards={boards} />
    </>
  );
};

export default DashboardPageController;
