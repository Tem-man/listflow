import React from "react";
import { useTabContext } from "../TabContext.ts";

interface TabsContentProps {
  children: React.ReactElement<{
    children: React.ReactNode;
    id: string;
  }>[];
}

const TabsContent = ({ children }: TabsContentProps) => {
  const { navList, id } = useTabContext();
  if (!children) return null;
  return children.map((item, index) => {
    if (item?.props?.children === undefined) return null;
    if (id === item.props.id) {
      return <div key={item.props.id}>{item}</div>;
    }
  });
};

export default TabsContent;
