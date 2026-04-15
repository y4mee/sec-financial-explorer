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
    <div className="w-full h-[300px] md:h-[400px] lg:h-[450px] p-4 bg-gray-900 rounded-xl shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />

          <XAxis
            dataKey="year"
            stroke="#ccc"
            tick={{ fill: "#ccc", fontSize: 12 }}
          />

          <YAxis
            stroke="#ccc"
            tick={{ fill: "#ccc", fontSize: 12 }}
            tickFormatter={formatRevenue}
          />

          <Tooltip
            formatter={(value) => formatRevenue(value)}
            contentStyle={{
              backgroundColor: "#111",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
