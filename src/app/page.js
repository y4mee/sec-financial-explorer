"use client";

import React, { useState } from "react";
import { fetchCompanyData } from "../utils/api";
import RevenueChart from "../components/RevenueChart";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Main() {
  const [input, setInput] = useState("");
  const { data, setData, companyName, setCompanyName } = useContext(AppContext);

  const handlefetch = async () => {
    try {
      const res = await fetchCompanyData(input);

      const name = res?.entityName || "Unknown Company";
      setCompanyName(name);

      // Extraction of Revenue data
      const usGaap = res?.facts?.["us-gaap"];
      const revenueRaw =
        usGaap?.RevenueFromContractWithCustomerExcludingAssessedTax?.units
          ?.USD || usGaap?.Revenues?.units?.USD;

      // Filter for yearly revenue
      const yearlyRevenue = revenueRaw?.filter((item) => item.fp === "FY");

      // Sorting the data based on date
      const sortedRevenue = [...yearlyRevenue]?.sort(
        (a, b) => new Date(b.end) - new Date(a.end),
      );
      console.log(sortedRevenue);

      // For latest 5 Years revenue Data with no duplicates
      const seenYears = new Set();
      const uniqueRevenue = [];

      for (const item of sortedRevenue) {
        const year = new Date(item.end).getFullYear();
        if (!seenYears.has(year)) {
          seenYears.add(year);
          uniqueRevenue.push(item);
        }
        if (uniqueRevenue.length === 5) break;
      }

      const orderedRevenue = [...uniqueRevenue].reverse();

      // Mapping the data to get year and revenue
      const finalRevenue = orderedRevenue.map((item) => ({
        year: new Date(item.end).getFullYear(),
        revenue: item.val,
      }));

      setData(finalRevenue);
    } catch (error) {
      console.error(error);
    }
  };

  // To handle form submission and prevent default behavior
  const handleSubmit = (e) => {
    e.preventDefault();
    handlefetch();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter CIK"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Fetch Data</button>
      </form>

      {companyName && (
        <h2 className="text-lg font-semibold mb-2">
          {companyName} (CIK: {input})
        </h2>
      )}
      {data && <RevenueChart />}
    </div>
  );
}
