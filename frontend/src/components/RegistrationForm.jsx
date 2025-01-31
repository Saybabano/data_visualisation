import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", formData);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {

      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-600">
      <form
        className="p-8 bg-white shadow-lg rounded-lg w-96 transition-all duration-300 hover:shadow-xl"
        onSubmit={handleRegister}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        <p className="text-sm text-center text-gray-600 mt-2">Join us today</p>

        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-all duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Register"
          )}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
