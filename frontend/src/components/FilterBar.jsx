import React from "react";

const FilterBar = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#111] rounded-lg border border-gray-800">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white font-medium">Filters</span>
        <button className="px-3 py-1 rounded bg-[#111] border border-gray-700 text-white text-xs">Size</button>
        <button className="px-3 py-1 rounded bg-[#111] border border-gray-700 text-white text-xs">Color</button>
        <button className="px-3 py-1 rounded bg-[#111] border border-gray-700 text-white text-xs">Price</button>
      </div>
      <div className="text-xs text-gray-400">Showing curated items</div>
    </div>
  );
};

export default FilterBar;
