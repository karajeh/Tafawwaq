'use client';
import clsx from "clsx";
import React from "react";

type Props = {
  tabItems?: {
    title: string;
  }[];
  tabIndex?: number;
  setTabIndex?: (index: number) => void;
};

function Tabs({ tabItems = [], tabIndex = 0, setTabIndex = () => {} }: Props) {
  return (
    <div className=" shadow-md border border-slate flex items-center gap-1 rounded-2xl p-1">
      {tabItems.map((tabItem, index) => {
        return (
          <button
            onClick={() => setTabIndex(index)}
            key={index}
            className={clsx(
              "cursor-pointer p-2 rounded-lg w-[156px]",
              tabIndex === index
                ? " text-white bg-secondary"
                : "text-zinc-950 dark:bg-zinc-950 dark:text-white"
            )}
          >
            {tabItem.title}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
