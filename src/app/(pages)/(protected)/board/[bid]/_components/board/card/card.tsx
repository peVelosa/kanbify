import { Card as SCard, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import { type RouterOutput } from "@/types/trpc";

type CardProps = NonNullable<RouterOutput["boards"]["columns"]["byId"][0]>;

const Card = ({ id: card_id, title, order, column_id, assign_to }: CardProps) => {
  const [{ isDragging }, ref] = useDrag(() => ({
    type: "CARD",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { card_id, column_id, order },
  }));

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
      <motion.div onDragEnter={(e) => console.log(e)}>
        <SCard
          className="rounded-md"
          ref={ref}
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
      </motion.div>
    </>
  );
};

export default Card;
