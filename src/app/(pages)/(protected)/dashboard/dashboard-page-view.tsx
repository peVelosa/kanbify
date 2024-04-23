import BoardCard from "./_components/board/board-card";
import NewBoardDialog from "./_components/new-board-dialog";
import Tabs from "@/components/elements/tabs/tabs";
import TabsList from "@/components/elements/tabs/tabs-list";
import TabsTrigger from "@/components/elements/tabs/tabs-trigger";
import TabsContent from "@/components/elements/tabs/tabs-content";
import { Boards } from "@/types/board";

export default function DashboardView({ boards }: { boards: Boards }) {
  return (
    <>
      <div className="container mb-8">
        <NewBoardDialog />
      </div>
      <Tabs
        defaultActive="owned"
        className={"mx-auto max-w-[1500px] px-4"}
      >
        <TabsList className="grid-cols-[repeat(2,_minmax(100px,_1fr))]">
          <TabsTrigger value="owned">Owned</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
        </TabsList>
        <section className="mt-4 grid grid-cols-[repeat(auto-fill_,minmax(250px_,1fr))] gap-4">
          <TabsContent value="owned">
            {boards?.boardsOwned?.length === 0 && (
              <p className="text-sm">
                You don&rsquo;t have any boards yet. Create a new board to get started.
              </p>
            )}
            {boards?.boardsOwned?.map((board) => (
              <BoardCard
                key={board.id}
                {...board}
              />
            ))}
          </TabsContent>
          <TabsContent value="collaboration">
            {boards?.boardsCollaborated?.length === 0 && (
              <p className="text-sm">You are not collaborating on any boards.</p>
            )}
            {boards?.boardsCollaborated?.map((board) => (
              <BoardCard
                key={board.id}
                {...board}
              />
            ))}
          </TabsContent>
        </section>
      </Tabs>
    </>
  );
}
