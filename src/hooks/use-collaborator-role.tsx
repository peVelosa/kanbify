"use client";

import { getCollaboratorRole } from "@/actions/get-user";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";

type UseCollaboratorRoleProps = {
  bid?: string | null;
};

export const useCollaboratorRole = ({ bid }: UseCollaboratorRoleProps) => {
  const { data: user } = trpc.user.me.useQuery();

  return useQuery({
    queryKey: ["collaborator", bid, user?.id],
    queryFn: () => getCollaboratorRole(user?.id, bid),
  });
};
