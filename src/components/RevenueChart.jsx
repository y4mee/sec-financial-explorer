"use client";

import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RevenueChart = () => {
  const { data } = useContext(AppContext);

  const formatRevenue = (value) => {
    return `$${(value / 1e9).toFixed(0)}B`;
  };

  return (
    <div className="w-full h-75 md:h-100 lg:h-112.5 p-4 bg-gray-900 rounded-xl shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="year"
            stroke="transparent"
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          <YAxis
            stroke="transparent"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={formatRevenue}
            width={52}
          />

          <Tooltip
            formatter={(value) => formatRevenue(value)}
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              color: "#f9fafb",
              fontSize: "13px",
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3, fill: "#3b82f6" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
