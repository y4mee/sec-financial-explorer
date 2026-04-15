"use client";

import React, { useState } from "react";
import Fetchbutton from "../components/Fetchbutton";
import { fetchCompanyData } from "../utils/api";

export default function Main() {
  const [data, setData] = useState(null);

  const handlefetch = async () => {
    try {
      const res = await fetchCompanyData("0000320193");
      console.log(res);

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

      // For latest 5 Years revenue Data
      const latestRevenue = sortedRevenue?.slice(0, 5);

      // Mapping the data to get year and revenue
      const finalRevenue = latestRevenue?.map((item) => ({
        year: new Date(item.end).getFullYear(),
        revenue: item.val,
      }));

      setData(finalRevenue);
      console.log(finalRevenue);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Fetchbutton onFetch={handlefetch} />
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
