"use client";

import EditButton from "../_actions/edit/edit";
import AllowTo from "./allow-to";
import Invite from "../_actions/invite/invite";

type BoardInfoProps = {
  id: string;
  title: string;
  createdAt: Date;
  description: string | null | undefined;
};

export default function BoardInfo({ id, title, description, createdAt }: BoardInfoProps) {
  return (
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
          }).format(createdAt)}
        </p>
      </div>
      <div className="space-y-4">
        <EditButton />
        <Invite />
      </div>
    </div>
  );
}
