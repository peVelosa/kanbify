import { createContext, useContext, useEffect, useState } from "react";

type TTabContext = {
  activeTab: string;
  handleChangeTab: (tab: string) => void;
};

export const TabContext = createContext({} as TTabContext);

type TabsProviderProps = {
  children: React.ReactNode;
  defaultActive?: string;
};

const TabsProvider = ({ children, defaultActive }: TabsProviderProps) => {
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (defaultActive) {
      setActiveTab(defaultActive);
    }
  }, []);

  const handleChangeTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <TabContext.Provider value={{ activeTab, handleChangeTab }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabsProvider;

export const useTabs = () => {
  const data = useContext(TabContext);

  if (!data) {
    throw new Error("useTabs must be used within a TabsProvider");
  }

  return { ...data };
};
