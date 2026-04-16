import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RevenueTable = () => {
  const { data } = useContext(AppContext);
  const [visibleCount, setVisibleCount] = useState(5);
  const visibleData = data ? data.slice(0, visibleCount) : [];

  const revenueData = visibleData?.map((item) => (
    <tr key={item.year}>
      <td className="p-3 border-b border-zinc-700">{item.year}</td>
      <td className="p-3 border-b border-zinc-700">
        ${(item.revenue / 1e9).toFixed(0)}B
      </td>
    </tr>
  ));

  // To handle show more button
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="mt-6 overflow-x-auto mb-4">
      <table className="min-w-full text-left rounded-xl overflow-hidden">
        <thead>
          <tr className="border-b border-white/5">
            <th className="px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-slate-500">
              Year
            </th>
            <th className="px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-slate-500">
              Revenue
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">{revenueData}</tbody>
      </table>
      {visibleCount < (data?.length || 0) && (
        <button
          onClick={handleShowMore}
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 my-4 text-white font-bold py-2 px-4 rounded-lg h-12 transition text-sm"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default RevenueTable;
