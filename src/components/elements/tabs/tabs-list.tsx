import { cn } from "@/lib/utils";
import { useTabs } from "@/providers/tabs-provider";
import { type ClassValue } from "clsx";
import { type ElementRef, useEffect, useRef } from "react";

type TabsListProps = {
  children: React.ReactNode;
  className?: ClassValue;
};

const TabsList = ({ children, className }: TabsListProps) => {
  const { activeTab } = useTabs();
  const listRef = useRef<ElementRef<"div">>(null);
  const lineRef = useRef<ElementRef<"span">>(null);

  const handleChangeAtiveTab = () => {
    const activeTabElement = listRef.current!.querySelector(
      'button[data-active="true"]',
    ) as HTMLButtonElement;
    if (!activeTabElement || !lineRef.current) return;

    lineRef.current!.style.transform = `translateX(${activeTabElement.offsetLeft}px)`;
  };

  const handleResize = () => {
    const tabButton = listRef.current!.querySelector(
      "button",
    ) as HTMLButtonElement;
    lineRef.current!.style.width = tabButton.clientWidth + "px";
  };

  useEffect(() => {
    if (!listRef.current) return;
    handleChangeAtiveTab();
  }, [activeTab]);

  useEffect(() => {
    if (!lineRef.current || !listRef.current) return;
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={listRef} className="relative overflow-x-auto pb-2">
      <div
        className={cn(
          "relative grid w-fit items-center justify-start gap-4 pb-2",
          className,
        )}
      >
        {children}
        <span
          className="absolute bottom-0 h-[2px] bg-neutral-950 transition-transform duration-300"
          ref={lineRef}
        ></span>
      </div>
    </div>
  );
};

export default TabsList;
