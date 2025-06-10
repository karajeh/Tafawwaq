import React from "react";
import StatCard from "./StatCard";
import arrowUp from "public/images/session-oversight/arrow-up.svg";
import arrowDown from "public/images/session-oversight/arrow-down.svg";
import UpChart from "./UpChart";
import DownChart from "./DownChart";

const StatCardSectionSessionOverSight = (): JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <StatCard
        title="Active Sessions"
        value="2,420"
        image={arrowUp}
        percentage="40%"
        color="#12B76A"
        ChartComponent={UpChart}
      />
      <StatCard
        title="Members"
        value="1,210"
        image={arrowDown}
        percentage="10%"
        color="#F04438"
        ChartComponent={DownChart}
      />
    </div>
  );
};

export default StatCardSectionSessionOverSight;