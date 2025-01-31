import { useCallback, useState } from "react";
import React from "react";
import { TabProvider } from "./TabContext.ts";

export interface Memu {
  id: string;
  name: string;
}

interface TabsProps {
  children: React.ReactElement<{
    title: string[];
  }>[];
  className?: string;
}

const Tabs = ({ children }: TabsProps) => {
  const [id, setId] = useState("1");

  const memus = children[0].props.title.map((item, index) => ({
    id: (index + 1).toString(),
    name: item,
  }));

  const [navList, setNavList] = useState<Memu[]>(memus);
  const tab = useCallback((item: Memu) => {
    setId(item.id);
  }, []);

  return (
    <TabProvider value={{ navList, tab, id }}>
      <div>
        {children[0]}
        <div>{children[1]}</div>
      </div>
    </TabProvider>
  );
};

export default Tabs;
