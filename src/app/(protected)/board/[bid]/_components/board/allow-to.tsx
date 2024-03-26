import { useCollaboratorRole } from "@/hooks/use-collaborator-role";
import { $Enums } from "@prisma/client";
import { useParams } from "next/navigation";

type AllowTo = {
  allowTo: $Enums.ROLE[];
  children: React.ReactNode;
};

const AllowTo = ({ allowTo, children }: AllowTo) => {
  const params = useParams() as { bid: string };

  const { data: collaborator } = useCollaboratorRole({ bid: params.bid });

  if (!collaborator || !allowTo.includes(collaborator.role)) return null;

  return <>{children}</>;
};

export default AllowTo;
