"use client";

import { useState } from "react";
import { FaStore, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const SignupOptions = () => {
  const [selectedOption, setSelectedOption] = useState("");
  
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

  };

  const handleContinue = () => {
    if (selectedOption === "seller") {
      navigate("/sellersignup");
    }
    else if (selectedOption === "customer") {
      navigate("/customersignup");
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <h1 className="text-white text-4xl font-semibold md:text-5xl lg:text-6xl  text-center mb-16 max-w-4xl">
          Join as seller or customer
        </h1>

        {/* Selection Cards */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 w-full max-w-4xl">
          {/* Professional Card */}
          <div
            className={`relative border-2 rounded-lg p-8 cursor-pointer transition-all duration-200 flex-1 min-h-[200px] ${
              selectedOption === "seller"
                ? "border-green-500 bg-green-500/5"
                : "border-gray-600 hover:border-gray-500"
            }`}
            onClick={() => handleOptionSelect("seller")}
          >
            <div className="flex items-start justify-between mb-6">
              <FaStore className="text-white w-8 h-8" />
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === "seller" ? "border-green-500 bg-green-500" : "border-gray-400"
                }`}
              >
                {selectedOption === "seller" && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>
            <div className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
              I'm a seller, looking to sell.
            </div>
          </div>

          {/* Client Card */}
          <div
            className={`relative border-2 rounded-lg p-8 cursor-pointer transition-all duration-200 flex-1 min-h-[200px] ${
              selectedOption === "customer" ? "border-green-500 bg-green-500/5" : "border-gray-600 hover:border-gray-500"
            }`}
            onClick={() => handleOptionSelect("customer")}
          >
            <div className="flex items-start justify-between mb-6">
              <FaShoppingCart className="text-white w-8 h-8" />
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === "customer" ? "border-green-500 bg-green-500" : "border-gray-400"
                }`}
              >
                {selectedOption === "customer" && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>
            <div className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
              I'm a customer, looking to shop
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          className={`px-12 py-4 rounded-full text-lg font-medium transition-all duration-200 ${
            selectedOption
              ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              : "bg-green-800 text-green-300 cursor-not-allowed"
          }`}
          disabled={!selectedOption}
          onClick={handleContinue}
        >
          Continue
        </button>

        {/* Login Link */}
        <div className="mt-8 text-white text-lg">
          Already have an account?{" "}
          <button className="text-green-500 hover:text-green-400 transition-colors duration-200 underline">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupOptions;