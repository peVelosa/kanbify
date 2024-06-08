"use client";

import AllowTo from "../allow-to";
import EditButton from "../../_actions/edit/edit";
import Invite from "../../_actions/invite/invite";
import type { RouterOutput } from "@/types/trpc";

type BoardInfoProps = Omit<NonNullable<RouterOutput["boards"]["byId"]>, "columns" | "id">;

export default function BoardInfo({ title, description, createdAt }: BoardInfoProps) {
  return (
    <>
      <div>
        <div className="container flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <h2 className="text-xl font-semibold text-neutral-800">{description}</h2>
            <p>
              Created At:{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })?.format(new Date(createdAt))}
            </p>
          </div>
          <div className="space-y-4">
            <AllowTo allowTo={["ADMIN", "OWNER"]}>
              <EditButton />
              <Invite />
            </AllowTo>
          </div>
        </div>
      </div>
    </>
  );
}
