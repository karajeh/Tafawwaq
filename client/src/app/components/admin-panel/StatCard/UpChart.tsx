"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "@mui/material";

const data = [
  { uv: 0 },
  { uv: 600 },
  { uv: 200 },
  { uv: 800 },
];

const UpChart = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 900px)");
  
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={isSmallScreen ? 80 : isMediumScreen ? 100 : 120}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="0" vertical={false} horizontal={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={false} />
          <YAxis axisLine={false} tickLine={false} tick={false} />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '6px', 
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="uv" 
            stroke="#12B76A" 
            strokeWidth={2}
            fill="#ECFDF3" 
            fillOpacity={0.5} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UpChart;