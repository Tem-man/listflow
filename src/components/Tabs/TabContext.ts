import { createContext, useContext } from "react";
import { Memu } from "./Tabs.tsx";

export interface TabContextProps {
  navList: Memu[];
  tab: (item: Memu) => void;
  id: string;
}

const TabContext = createContext<TabContextProps | null>(null);
export const TabProvider = TabContext.Provider;

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabProvider");
  }
  return context;
};
