import { CardHeader, CardTitle } from "@/components/ui/card";

type BoardHeaderProps = {
  title: string;
  description: string | null;
};

export default function BoardHeader({ title, description }: BoardHeaderProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
    </>
  );
}
