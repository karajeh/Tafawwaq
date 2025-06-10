"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "@mui/material";

const data = [
  {
    name: "Jan",
    uv: 45,
    pv: 65,
  },
  {
    name: "Feb",
    uv: 48,
    pv: 68,
  },
  {
    name: "Mar",
    uv: 50,
    pv: 70,
  },
  {
    name: "Apr",
    uv: 52,
    pv: 72,
  },
  {
    name: "May",
    uv: 55,
    pv: 75,
  },
  {
    name: "Jun",
    uv: 57,
    pv: 77,
  },
  {
    name: "Jul",
    uv: 58,
    pv: 78,
  },
  {
    name: "Aug",
    uv: 55,
    pv: 75,
  },
  {
    name: "Sep",
    uv: 62,
    pv: 82,
  },
  {
    name: "Oct",
    uv: 65,
    pv: 85,
  },
  {
    name: "Nov",
    uv: 68,
    pv: 88,
  },
  {
    name: "Dec",
    uv: 70,
    pv: 90,
  },
];

const ComparisonChart = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 900px)");

  const height = isSmallScreen ? 200 : isMediumScreen ? 350 : 300;
  const ytickMargin = isSmallScreen ? 30 : isMediumScreen ? 12 : 12;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#F2F4F7" strokeDasharray="0" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tickMargin={15}
          tick={{
            fontSize: isSmallScreen ? "10px" : "12px",
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={ytickMargin}
          tick={{
            dx: isSmallScreen ? -5 : 0,
            dy: isSmallScreen ? 10 : 0,
            fontSize: isSmallScreen ? "10px" : "12px",
          }}
        />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#00ADEF" dot={false} />
        <Line type="monotone" dataKey="uv" stroke="#A3D154" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ComparisonChart;
