"use client";

import DashboardView from "./dashboard-page-view";
import { useBoards } from "@/hooks/use-boards";
import { redirect } from "next/navigation";

const DashboardPageController = () => {
  const { data: board, isError } = useBoards();

  if (isError) redirect("/");
  if (!board) return null;

  return (
    <>
      <DashboardView boards={board} />
    </>
  );
};

export default DashboardPageController;
