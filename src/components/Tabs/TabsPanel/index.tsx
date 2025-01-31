import React from "react";

interface TabPanelProps {
  children: React.ReactNode;
  id: string;
}

const TabsPanel = ({ children }: TabPanelProps) => {
  return <div>{children}</div>;
};

export default TabsPanel;
