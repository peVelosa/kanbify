import { cn } from "@/lib/utils";
import TabsProvider from "@/providers/tabs-provider";
import { ClassValue } from "clsx";

type TabsProps = {
  defaultActive?: string;
  children: React.ReactNode;
  className?: ClassValue;
};

const Tabs = ({ defaultActive, children, className }: TabsProps) => {
  return (
    <>
      <TabsProvider defaultActive={defaultActive}>
        <div className={cn(className)}>{children}</div>
      </TabsProvider>
    </>
  );
};

export default Tabs;
