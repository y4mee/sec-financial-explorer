"use client";

import React, { useState } from "react";
import { fetchCompanyData } from "../utils/api";
import RevenueChart from "../components/RevenueChart";
import RevenueTable from "../components/RevenueTable";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Main() {
  const [input, setInput] = useState("");

  const {
    data,
    setData,
    companyName,
    setCompanyName,
    error,
    setError,
    loading,
    setLoading,
  } = useContext(AppContext);


  // TO handle the fetching data from API
  const handlefetch = async () => {
    const trimmedInput = input.trim();

    // Validation for the Input CIK
    if (!trimmedInput.trim()) {
      setError("Please enter a CIK");
      return;
    }
    if (!/^\d{1,10}$/.test(trimmedInput)) {
      setError("CIK must be numeric");
      return;
    }

    setError("");
    setLoading(true);
    setData(null);
    setCompanyName("");

    
    try {
      const res = await fetchCompanyData(trimmedInput);

      const name = res?.entityName || "Unknown Company";
      setCompanyName(name);

      // Extraction of Revenue data
      const usGaap = res?.facts?.["us-gaap"];
      const revenueRaw =
        usGaap?.RevenueFromContractWithCustomerExcludingAssessedTax?.units
          ?.USD || usGaap?.Revenues?.units?.USD;
      if (!revenueRaw || !Array.isArray(revenueRaw)) {
        setError("No revenue data found for this company");
        setData(null);
        return;
      }

      // Filter for yearly revenue
      const yearlyRevenue = revenueRaw?.filter((item) => item.fp === "FY");
      if (!yearlyRevenue.length) {
        setError("No yearly revenue data available");
        setData(null);
        return;
      }

      // Sorting the data based on year
      const sortedRevenue = [...yearlyRevenue].sort(
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
       
      }

      const orderedRevenue = [...uniqueRevenue].reverse();

      // Mapping the data to get year and revenue
      const finalRevenue = orderedRevenue.map((item) => ({
        year: new Date(item.end).getFullYear(),
        revenue: item.val,
      }));

      setData(finalRevenue);
    } catch (err) {
      console.error(err);
      setError("Invalid CIK or failed to fetch data");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // To handle form submission 
  const handleSubmit = (e) => {
    e.preventDefault();
    handlefetch();
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900  text-white p-4 md:p-6 lg:p-10">
      <h1 className="text-xl md:text-3xl lg: text-3xl font-semibold my-6 text-center md:text-left text-slate-200">
        SEC Financial Data Fetcher
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 outline-none">
        <input
          className="px-3 py-2 outline-none bg-zinc-700 rounded-lg"
          type="text"
          placeholder="Enter CIK"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg h-12 transition text-sm"
          type="submit"
        >
          Fetch Data
        </button>
      </form>

      {!loading && !error && !data && (
        <p className="text-gray-400">
          No data to display. Try searching a company.
        </p>
      )}
      {loading && <p className="text-blue-400 mb-2">Loading...</p>}

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {companyName && (
        <h2 className="text-md font-medium text-slate-300 m-3 mt-15">
          {companyName} (CIK: {input})
        </h2>
      )}
      {data && (
        <div className="w-full overflow-x-auto mb-4">
          <RevenueTable />
        </div>
      )}

      {data && (
        <div className="w-full h-72 sm:h-80 md:h-106">
          <h2 className="text-md font-medium text-slate-300 m-3 ">
            Revenue Trend Over the Years
          </h2>
          <RevenueChart />
        </div>
      )}
    </div>
  );
}
