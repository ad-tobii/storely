"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Mail, Lock, Store, Sparkles, TrendingUp, Zap, Users, ShieldCheck } from "lucide-react"
import { useAuthStore } from "../../../store/useAuthStore"
import { useNavigate, useLocation } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState(null)

  const { login, isLoading, error } = useAuthStore()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const redirect = params.get("redirect")
    if (redirect) {
      setRedirectUrl(decodeURIComponent(redirect))
    }
  }, [location.search])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const loggedInUser = await login({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      if (loggedInUser) {
        if (redirectUrl) {
          window.location.href = redirectUrl
        } else {
          navigate(loggedInUser.role === "seller" ? "/seller/dashboard" : "/")
        }
      }
    } catch (error) {
      console.error("Login failed on component:", error)
    }
  }

  const handleNavigateToSignup = () => {
    const signupPath = formData.role === "customer" ? "/customersignup" : "/sellersignup"
    const destination = redirectUrl ? `${signupPath}?redirect=${encodeURIComponent(redirectUrl)}` : signupPath
    navigate(destination)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8 relative overflow-hidden">
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
      </div>

      {/* Storely Logo */}
      <div className="absolute top-6 left-6 flex items-center space-x-2 z-20">
        <Store className="h-8 w-8 text-[#32cd32]" />
        <span className="text-xl font-bold bg-gradient-to-r from-[#32cd32] to-[#4ade80] bg-clip-text text-transparent">
          Storely
        </span>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-black/40 border border-gray-800/50 rounded-2xl overflow-hidden shadow-2xl shadow-[#32cd32]/10">
          <div className="h-1 bg-gradient-to-r from-[#32cd32] to-[#4ade80]"></div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-white text-3xl font-bold mb-2">Welcome back</h1>
              <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
            </div>

            {redirectUrl && (
              <div className="bg-[#32cd32]/10 border border-[#32cd32]/20 rounded-xl p-4 mb-6 text-center backdrop-blur-sm">
                <p className="text-[#32cd32] text-sm font-medium">Please log in to continue.</p>
              </div>
            )}

            <div className="mb-8">
              <label className="block text-white text-sm font-medium mb-4 text-center">Choose your role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, role: "customer" }))}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 group backdrop-blur-sm ${
                    formData.role === "customer"
                      ? "border-[#32cd32] bg-[#32cd32]/10 shadow-lg shadow-[#32cd32]/20"
                      : "border-gray-700/50 bg-black/20 hover:border-gray-600/50"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`p-3 rounded-full transition-all duration-300 ${
                        formData.role === "customer"
                          ? "bg-[#32cd32] text-black"
                          : "bg-gray-800/50 text-gray-300 group-hover:bg-gray-700/50"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        formData.role === "customer" ? "text-[#32cd32]" : "text-gray-300"
                      }`}
                    >
                      Customer
                    </span>
                  </div>
                  {formData.role === "customer" && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#32cd32] rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, role: "seller" }))}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 group backdrop-blur-sm ${
                    formData.role === "seller"
                      ? "border-[#32cd32] bg-[#32cd32]/10 shadow-lg shadow-[#32cd32]/20"
                      : "border-gray-700/50 bg-black/20 hover:border-gray-600/50"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`p-3 rounded-full transition-all duration-300 ${
                        formData.role === "seller"
                          ? "bg-[#32cd32] text-black"
                          : "bg-gray-800/50 text-gray-300 group-hover:bg-gray-700/50"
                      }`}
                    >
                      <Store className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        formData.role === "seller" ? "text-[#32cd32]" : "text-gray-300"
                      }`}
                    >
                      Seller
                    </span>
                  </div>
                  {formData.role === "seller" && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#32cd32] rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <div className="text-red-400 text-sm text-center">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-[#32cd32] transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-[#32cd32] transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-[#32cd32] hover:text-[#28a428] text-sm underline transition-colors duration-200"
                >
                  Forgot your password?
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-[#32cd32] to-[#28a428] text-black font-bold py-3 px-4 rounded-xl transition-all duration-200 transform ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105 hover:shadow-lg hover:shadow-[#32cd32]/25"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            <div className="text-center mt-6">
              <span className="text-gray-400">{"Don't have an account? "}</span>
              <button
                onClick={handleNavigateToSignup}
                type="button"
                className="text-[#32cd32] hover:text-[#28a428] underline transition-colors duration-200 font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}