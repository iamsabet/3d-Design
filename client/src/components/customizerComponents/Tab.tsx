import React from "react";
import { useSnapshot } from "valtio";
import state from "../../store";

interface TabProps {
  key: string;
  tab: { name: string; icon: string };
  isFilterTab?: boolean;
  isActiveTab?: boolean;
  handleClick: () => void;
}

const Tab = ({
  // key,
  tab,
  isFilterTab = false,
  isActiveTab,
  handleClick,
}: TabProps) => {
  const snap = useSnapshot(state);
  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : {
          backgroundColor: "transparent",
          opacity: 1,
        };
  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassmorphism" : "rounded-4"
      } ${activeStyles}`}
      onClick={handleClick}
    >
      <img
        src={tab.icon}
        alt={`${tab.name} icon`}
        className={
          isFilterTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"
        }
      />
    </div>
  );
};

export default Tab;
