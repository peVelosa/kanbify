"use client";

import { trpc } from "@/app/_trpc/client";
import DashboardView from "./dashboard-page-view";
import { redirect } from "next/navigation";

const DashboardPageController = () => {
  const { data: board, isError } = trpc.boards.all.useQuery();

  if (isError) redirect("/");
  if (!board) return null;

  return (
    <>
      <DashboardView boards={board} />
    </>
  );
};

export default DashboardPageController;
