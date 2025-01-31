import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_name");
    window.dispatchEvent(new Event("storage")); // Notify App.jsx about logout
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-customRed px-5 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg active:scale-95"
    >
      Logout
    </button>
  );
};

export default Logout;
