import { useTabs } from "@/providers/tabs-provider";

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};

const TabsContent = ({ value, children }: TabsContentProps) => {
  const { activeTab } = useTabs();

  if (activeTab !== value) return null;

  return <>{children}</>;
};

export default TabsContent;
