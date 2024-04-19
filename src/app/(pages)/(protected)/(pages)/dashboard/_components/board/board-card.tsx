import { TBoard } from "@/app/actions/get-boards/type";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import BoardHeader from "./board-header";
import SkeletonCard from "./skeleton-card";
import { useCollaboratorRole } from "@/hooks/use-collaborator-role";

export default function BoardCard({ id, title, description, _count: { collaborators } }: TBoard) {
  const { data: role } = useCollaboratorRole({ bid: id });
  const routes = useRouter();

  const handleBoardClick = () => {
    routes.push(`/board/${id}`);
  };

  if (id === "temp-id") return <SkeletonCard />;

  return (
    <Card
      onClick={handleBoardClick}
      className="max-w-[350px] cursor-pointer transition-colors duration-200 ease-in-out hover:bg-slate-100"
    >
      <BoardHeader title={title} description={description} />
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-bold">Collaborators</span>: {collaborators}
          </p>
          <p>
            <span className="font-bold">Role</span>: {role?.role}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
