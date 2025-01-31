import React from "react";
import { useSearchParams } from "react-router-dom";

const FilterBar = ({ filters, setFilters }) => {
  const [, setSearchParams] = useSearchParams();

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    setSearchParams(updatedFilters);
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <select
        value={filters.age}
        onChange={(e) => handleFilterChange("age", e.target.value)}
        className="border border-gray-300 rounded-lg p-3 text-gray-700 bg-gray-50 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Age</option>
        <option value="15-25">15-25</option>
        <option value=">25">&gt;25</option>
      </select>

      <select
        value={filters.gender}
        onChange={(e) => handleFilterChange("gender", e.target.value)}
        className="border border-gray-300 rounded-lg p-3 text-gray-700 bg-gray-50 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="date"
        value={filters.start_date}
        onChange={(e) => handleFilterChange("start_date", e.target.value)}
        className="border border-gray-300 rounded-lg p-3 text-gray-700 bg-gray-50 focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        value={filters.end_date}
        onChange={(e) => handleFilterChange("end_date", e.target.value)}
        className="border border-gray-300 rounded-lg p-3 text-gray-700 bg-gray-50 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FilterBar;
