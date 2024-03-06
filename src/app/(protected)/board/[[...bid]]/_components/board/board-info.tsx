"use client";

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
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
    </div>
  );
}
