"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "@mui/material";

const data = [
  { name: "Jan", value: 80 },
  { name: "Feb", value: 90 },
  { name: "Mar", value: 50 },
  { name: "Apr", value: 80 },
  { name: "May", value: 100 },
  { name: "Jun", value: 60 },
  { name: "Jul", value: 80 },
  { name: "Aug", value: 80 },
  { name: "Sep", value: 90 },
  { name: "Oct", value: 40 },
  { name: "Nov", value: 80 },
  { name: "Dec", value: 60 },
];

const BarChartInsight = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 900px)");

  const height = isSmallScreen ? 260 : isMediumScreen ? 300 : 400;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid stroke="" strokeDasharray="0" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          interval={0}
          label={{
            value: "Month",
            position: "insideBottom",
            offset: -25,
            style: {
              textAnchor: "middle",
              fill: "#666",
              fontSize: "14px",
            },
          }}
          tick={{
            dx: isSmallScreen ? -5 : 0,
            dy: isSmallScreen ? 10 : 0,
            fontSize: isSmallScreen ? "10px" : "12px",
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: isSmallScreen ? "10px" : "12px",
          }}
          label={{
            value: "Registrations",
            angle: -90,
            position: "insideLeft",
            offset: 10,
          }}
          tickMargin={isSmallScreen ? -0 : -25}
        />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#029CD7"
          barSize={32}
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartInsight;
