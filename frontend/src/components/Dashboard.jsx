import React, { useEffect, useState } from "react";
import api from "../utils/api";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Logout from "./Logout";
import FilterBar from "./FilterBar";
import Cookies from "js-cookie"; // Import js-cookie for cookie management

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState('A');  // Default feature is A
  const [filters, setFilters] = useState({
    age: '',
    gender: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    // Retrieve user preferences from cookies when component mounts
    const savedFilters = Cookies.get("filters");
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters)); // Set the filters from cookies
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/data", { params: filters });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data!");
      }
    };

    fetchData()
  }, [filters]);

  const handleBarClick = (feature) => {
    setSelectedFeature(feature);  // Set the selected feature for line chart
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    Cookies.set("filters", JSON.stringify(newFilters)); // Save the updated filters to cookies
  };

  const handleResetPreferences = () => {
    setFilters({
      age: '',
      gender: '',
      start_date: '',
      end_date: '',
    });
    Cookies.remove("filters"); // Clear filters from cookies
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 bg-green-300 text-white flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-semibold">Good afternoon, <span className="text-gray-700">{localStorage.getItem("user_name") || "User"}</span></h1>
        <Logout />
      </div>

      <div className="p-6 max-w-6xl mx-auto ">
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">Dashboard</h1>
          <FilterBar filters={filters} setFilters={handleFilterChange} />
          <button
            onClick={handleResetPreferences}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Reset Preferences
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {data.length > 0 ? (
            <>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-semibold text-center mb-4">Bar Chart</h2>
                <BarChart data={data} onBarClick={handleBarClick} />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-semibold text-center mb-4">Line Chart</h2>
                {data.length > 0 ? (
                  <LineChart data={data} feature={selectedFeature} />
                ) : (
                  <p className="text-center text-gray-500">Click on a bar to view trend data.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
