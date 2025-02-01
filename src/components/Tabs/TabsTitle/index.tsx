import styles from "./index.module.css";
import useUpdateIsomorphicLayoutEffect from "../../hook/useUpdateIsomorphicLayoutEffect.ts";
import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTabContext } from "../TabContext.ts";

export interface TitleItem {
  itemId: string;
  name: string;
  activeId: string;
}
export interface TabsTitleProps {
  title: string[];
  className?: string;
  showTabLine?: boolean;

  renderItem?: (item: TitleItem) => ReactNode;
}
const TabsTitle = (props: TabsTitleProps) => {
  const { title, className, showTabLine = false, renderItem } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const { navList, tab, id } = useTabContext();
  let type = "default";
  if (renderItem) {
    type = "custom";
  }
  const [activeLineStyle, setActiveLineStyle] = useState({
    width: 0,
    transform: `translate3d(0px, 0px, 0px)`,
    transitionDuration: "0",
  });
  let num = 0;
  const calculateLineWidth = useCallback(
    (immediate: boolean = false) => {
      const activeTabWrapper = wrapperRef.current?.children.item(Number(id)) as HTMLDivElement;
      const activeTab = activeTabWrapper?.children.item(0) as HTMLDivElement;
      const activeTabWidth = activeTab?.offsetWidth;
      const activeTabLeft = activeTab?.offsetLeft;
      console.log("activeTab:", activeTab);

      console.log("activeTabWrapperWidth:", activeTabWidth);
      console.log("activeTabLeft:", activeTabLeft);
      setActiveLineStyle({
        width: activeTabWidth,
        transform: `translate3d(${activeTabLeft}px, 0px, 0px)`,
        transitionDuration: immediate ? "0ms" : "300ms",
      });
    },
    [id]
  );

  useEffect(() => {
    setIsStyleLoaded(true);
    calculateLineWidth(true);
  }, []);

  useUpdateIsomorphicLayoutEffect(() => {
    calculateLineWidth(false);
  }, [calculateLineWidth]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      calculateLineWidth(true);
    });
    return () => window.removeEventListener("resize", () => calculateLineWidth(true));
  }, []);

  if (!isStyleLoaded) {
    return null;
  }

  return (
    <div className={className}>
      <div className={`${styles.tabList}`} ref={wrapperRef}>
        {showTabLine && <div className={styles.tabLine} style={{ ...activeLineStyle }}></div>}
        {navList.map((item) =>
          type === "default" ? (
            <div key={item.id} className={`${styles.tab}`} onClick={() => tab(item)}>
              <div className={`${styles.tabTitle} ${id === item.id && styles.tabActive}`}>{item.name}</div>
            </div>
          ) : (
            <div key={item.id} className={styles.tab} onClick={() => tab(item)}>
              <div className={`${styles.tabTitle}`}>{renderItem?.({ itemId: item.id, name: item.name, activeId: id })}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TabsTitle;
