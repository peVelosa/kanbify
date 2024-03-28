import { Button } from "@/components/ui/button";
import { useTabs } from "@/providers/tabs-provider";

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
};

const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const { handleChangeTab, activeTab } = useTabs();

  return (
    <Button
      onClick={() => handleChangeTab(value)}
      variant={"ghost"}
      className={`${
        activeTab === value
          ? "border border-neutral-950 text-neutral-950"
          : "text-gray-500"
      }`}
      data-active={activeTab === value}
    >
      {children}
    </Button>
  );
};

export default TabsTrigger;
