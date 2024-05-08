import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Board } from "@/types/trpc";

type BoardColumnProps = NonNullable<Board>["columns"][0];

const BoardColumn = ({ id, _count: { cards }, order, title }: BoardColumnProps) => {
  return (
    <>
      <Card
        key={id}
        className="grid max-h-full w-[350px] flex-shrink-0 overflow-hidden pr-2"
      >
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <p className="font-bold">{title}</p>
          <p>{cards}</p>
        </CardHeader>
        <CardContent className="max-h-full space-y-4 overflow-auto">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <Card
                className="h-[100px] bg-gray-100"
                key={i}
              >
                <CardContent>
                  <p>{i}</p>
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </Card>
    </>
  );
};

export default BoardColumn;
