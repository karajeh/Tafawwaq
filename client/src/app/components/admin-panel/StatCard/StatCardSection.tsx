import React from "react";
import StatCard from "./StatCard";
import arrowUp from "public/images/session-oversight/arrow-up.svg";
import arrowDown from "public/images/session-oversight/arrow-down.svg";
// import UpChart from "./UpChart";
// import DownChart from "./DownChart";

const StatCardSection = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <StatCard
        title="Total pending funds"
        value="2,420"
        image={arrowUp}
        percentage="40%"
        color="#12B76A"
        // ChartComponent={UpChart}
      />
      <StatCard
        title="Total Sessions Conducted"
        value="1,210"
        image={arrowDown}
        percentage="10%"
        color="#F04438"
        // ChartComponent={DownChart}
        breakdown={[
          { subject: "Math", sessions: 650 },
          { subject: "Science", sessions: 340 },
          { subject: "Languages", sessions: 220 }
        ]}
      />
      <StatCard
        title="Cancellation Rate"
        value="8.5%"
        image={arrowUp}
        percentage="2%"
        color="#F04438"
        // ChartComponent={DownChart}
        cancellationDetails={{
          total: 112,
          byStudent: 78,
          byTutor: 34,
          reasons: [
            { reason: "Schedule Conflict", count: 45 },
            { reason: "Technical Issues", count: 32 },
            { reason: "Illness", count: 25 },
            { reason: "Other", count: 10 }
          ]
        }}
      />
    </div>
  );
};

export default StatCardSection;