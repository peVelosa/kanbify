import { $Enums } from "@prisma/client";

type AllowTo = {
  allowTo: $Enums.ROLE[];
  currentRole?: $Enums.ROLE;
  children: React.ReactNode;
};

const AllowTo = ({ allowTo, currentRole, children }: AllowTo) => {
  if (!currentRole || !allowTo.includes(currentRole)) return null;

  return <>{children}</>;
};

export default AllowTo;
