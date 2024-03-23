"use client";

import { Button } from "@/components/ui/button";
import EditButton from "../actions/edit/edit-button";
import { useCollaboratorRole } from "@/hooks/use-collaborator-role";
import { useParams } from "next/navigation";
import AllowTo from "./allow-to";

type BoardInfoProps = {
  id: string;
  title: string;
  createdAt: Date;
  description: string | null | undefined;
};

export default function BoardInfo({
  id,
  title,
  description,
  createdAt,
}: BoardInfoProps) {
  const params = useParams() as { bid: string };

  const { data: collaborator } = useCollaboratorRole({ bid: params.bid });

  return (
    <div className="container flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <h2 className="text-xl font-semibold text-neutral-800">
          {description}
        </h2>
        <p>
          Created At:{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(createdAt)}
        </p>
      </div>
      <div className="space-y-4">
        <AllowTo allowTo={["ADMIN", "OWNER"]} currentRole={collaborator?.role}>
          <EditButton />
        </AllowTo>
        <AllowTo
          allowTo={["ADMIN", "OWNER", "EMPLOYEE"]}
          currentRole={collaborator?.role}
        >
          <Button className="flex w-full" variant={"outline"}>
            Invite
          </Button>
        </AllowTo>
      </div>
    </div>
  );
}
