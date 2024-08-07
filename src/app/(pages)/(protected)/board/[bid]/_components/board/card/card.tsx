import { Card as SCard, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDragAndDropCard } from "@/lib/stores";
import { type RouterOutput } from "@/types/trpc";

type CardProps = {
  card: NonNullable<RouterOutput["boards"]["cards"]["byColumnId"][0]>;
};

const Card = ({ card }: CardProps) => {
  const { id: card_id, title, order, column_id, assign_to } = card;
  const setDragItem = useDragAndDropCard((state) => state.setDragItem);
  const draggedItem = useDragAndDropCard((state) => state.card);

  const getAvatarName = () => {
    if (!assign_to?.user?.name) return "AV";
    const name = assign_to.user.name.toUpperCase().split(" ");

    if (name.length === 1) {
      return name[0]?.charAt(0) || "AV";
    }

    return (name[0]?.charAt(0) ?? "A") + (name[1]?.charAt(0) ?? "V") || "AV";
  };

  return (
    <>
      <SCard
        className={`rounded-md ${draggedItem?.id === card_id ? "bg-slate-200 opacity-70" : ""}`}
        draggable
        onDragStart={() => setDragItem(card)}
      >
        <CardHeader className="flex flex-row items-start gap-2 p-4">
          <Avatar>
            <AvatarImage
              src={assign_to?.user.image ?? undefined}
              alt="User avatar"
            />
            <AvatarFallback>{getAvatarName()}</AvatarFallback>
          </Avatar>
          <p className="font-semibold">{title}</p>
        </CardHeader>
      </SCard>
    </>
  );
};

export default Card;
