"use client"

import { useState } from "react"
import { FaStore, FaShoppingCart } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { Store, Sparkles, TrendingUp, Zap, Users, ShieldCheck } from "lucide-react"

const SignupOptions = () => {
  const [selectedOption, setSelectedOption] = useState("")

  const navigate = useNavigate()

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleContinue = () => {
    if (selectedOption === "seller") {
      navigate("/sellersignup")
    } else if (selectedOption === "customer") {
      navigate("/customersignup")
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#32cd32]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#32cd32]/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#32cd32]/5 rounded-full blur-3xl"></div>

        {/* Floating Icons */}
        <div className="absolute top-32 left-20 animate-float">
          <Store className="h-8 w-8 text-[#32cd32]/30" />
        </div>
        <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: "1s" }}>
          <Sparkles className="h-6 w-6 text-[#32cd32]/40" />
        </div>
        <div className="absolute bottom-40 left-32 animate-float" style={{ animationDelay: "2s" }}>
          <TrendingUp className="h-10 w-10 text-[#32cd32]/20" />
        </div>
        <div className="absolute top-60 right-20 animate-float" style={{ animationDelay: "0.5s" }}>
          <Zap className="h-7 w-7 text-[#32cd32]/35" />
        </div>
        <div className="absolute bottom-60 right-40 animate-float" style={{ animationDelay: "1.5s" }}>
          <Users className="h-6 w-6 text-[#32cd32]/25" />
        </div>
        <div className="absolute top-80 left-40 animate-float" style={{ animationDelay: "3s" }}>
          <ShieldCheck className="h-8 w-8 text-[#32cd32]/30" />
        </div>
        <div className="absolute bottom-32 right-60 animate-float" style={{ animationDelay: "2.5s" }}>
          <FaStore className="h-6 w-6 text-[#32cd32]/35" />
        </div>
        <div className="absolute top-96 right-80 animate-float" style={{ animationDelay: "1.8s" }}>
          <FaShoppingCart className="h-7 w-7 text-[#32cd32]/25" />
        </div>
      </div>

      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(50,205,50,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(50,205,50,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Storely Logo */}
      <div className="absolute top-6 left-6 flex items-center space-x-2 z-20">
        <Store className="h-8 w-8 text-[#32cd32]" />
        <span className="text-xl font-bold bg-gradient-to-r from-[#32cd32] to-[#4ade80] bg-clip-text text-transparent">
          Storely
        </span>
      </div>

      <div className="relative z-10 mt-16 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-white text-4xl font-bold md:text-5xl lg:text-6xl mb-4 max-w-4xl">
            Join as{" "}
            <span className="bg-gradient-to-r from-[#32cd32] to-[#4ade80] bg-clip-text text-transparent">seller</span>{" "}
            or{" "}
            <span className="bg-gradient-to-r from-[#32cd32] to-[#4ade80] bg-clip-text text-transparent">customer</span>
          </h1>
          <p className="text-gray-400 text-lg">Choose your path to get started</p>
        </div>

        {/* Selection Cards */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 w-full max-w-4xl">
          {/* Seller Card */}
          <div
            className={`relative border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 flex-1 min-h-[200px] backdrop-blur-xl transform hover:scale-105 ${
              selectedOption === "seller"
                ? "border-[#32cd32] bg-[#32cd32]/10 shadow-2xl shadow-[#32cd32]/20"
                : "border-gray-700/50 bg-black/20 hover:border-gray-600/50"
            }`}
            onClick={() => handleOptionSelect("seller")}
          >
            <div className="flex items-start justify-between mb-6">
              <div
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  selectedOption === "seller" ? "bg-[#32cd32] text-black" : "bg-gray-800/50 text-white"
                }`}
              >
                <FaStore className="w-8 h-8" />
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  selectedOption === "seller" ? "border-[#32cd32] bg-[#32cd32]" : "border-gray-400"
                }`}
              >
                {selectedOption === "seller" && <div className="w-2 h-2 bg-black rounded-full" />}
              </div>
            </div>
            <div className="text-white text-xl md:text-2xl font-bold leading-relaxed mb-2">
              I'm a seller, looking to sell.
            </div>
            <p className="text-gray-400 text-sm">Start your online business and reach customers worldwide</p>
          </div>

          {/* Customer Card */}
          <div
            className={`relative border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 flex-1 min-h-[200px] backdrop-blur-xl transform hover:scale-105 ${
              selectedOption === "customer"
                ? "border-[#32cd32] bg-[#32cd32]/10 shadow-2xl shadow-[#32cd32]/20"
                : "border-gray-700/50 bg-black/20 hover:border-gray-600/50"
            }`}
            onClick={() => handleOptionSelect("customer")}
          >
            <div className="flex items-start justify-between mb-6">
              <div
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  selectedOption === "customer" ? "bg-[#32cd32] text-black" : "bg-gray-800/50 text-white"
                }`}
              >
                <FaShoppingCart className="w-8 h-8" />
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  selectedOption === "customer" ? "border-[#32cd32] bg-[#32cd32]" : "border-gray-400"
                }`}
              >
                {selectedOption === "customer" && <div className="w-2 h-2 bg-black rounded-full" />}
              </div>
            </div>
            <div className="text-white text-xl md:text-2xl font-bold leading-relaxed mb-2">
              I'm a customer, looking to shop
            </div>
            <p className="text-gray-400 text-sm">Discover amazing products from sellers around the world</p>
          </div>
        </div>

        {/* Continue Button */}
        <button
          className={`px-12 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform ${
            selectedOption
              ? "bg-gradient-to-r from-[#32cd32] to-[#28a428] hover:from-[#28a428] hover:to-[#22aa22] text-black cursor-pointer hover:scale-105 shadow-lg shadow-[#32cd32]/25"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedOption}
          onClick={handleContinue}
        >
          Continue
        </button>

        {/* Login Link */}
        <div className="mt-8 text-white text-lg">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#32cd32] hover:text-[#28a428] transition-colors duration-200 underline font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupOptions
