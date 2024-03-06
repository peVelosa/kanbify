import { redirect } from "next/navigation";
import BoardPageView from "./board-page-view";
import { getBoard } from "@/app/actions/get-board-info";

type BoardPageProps = {
  params: {
    bid?: string[];
  };
};

export default async function BoardPage({ params: { bid } }: BoardPageProps) {
  if (!bid) return redirect("/dashboard");

  const initialBoard = await getBoard({ bid: bid[0] });

  return (
    <>
      <BoardPageView initialBoard={initialBoard} />
    </>
  );
}
