"use client";

import { getCollaboratorRole } from "@/actions/get-user";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";

type UseCollaboratorRoleProps = {
  bid?: string | null;
};

export const useCollaboratorRole = ({ bid }: UseCollaboratorRoleProps) => {
  const { data: user } = useCurrentUser();

  return useQuery({
    queryKey: ["collaborator", bid, user?.id],
    queryFn: () => getCollaboratorRole(user?.id, bid),
  });
};
