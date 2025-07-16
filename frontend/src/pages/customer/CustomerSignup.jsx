"use client"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { User, Mail, Lock, Eye, EyeOff, Store, Sparkles, TrendingUp, Zap, Users, ShieldCheck } from "lucide-react"
import { useAuthStore } from "../../../store/useAuthStore"

const CustomerSignup = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [redirectUrl, setRedirectUrl] = useState(null)

  const { customerSignup, isLoading, error } = useAuthStore()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const redirect = params.get("redirect")
    if (redirect) {
      setRedirectUrl(decodeURIComponent(redirect))
    }
  }, [location.search])

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validatePassword = (password) => {
    const checks = [
      { test: password.length >= 8, msg: "8+ characters" },
      { test: /[A-Z]/.test(password), msg: "1 uppercase" },
      { test: /[a-z]/.test(password), msg: "1 lowercase" },
      { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), msg: "1 special char" },
    ]
    return checks.filter((check) => !check.test).map((check) => check.msg)
  }

  const getPasswordStrength = (password) => {
    const missing = validatePassword(password).length
    if (missing === 0) return { strength: "strong", color: "text-[#32cd32]" }
    if (missing <= 2) return { strength: "medium", color: "text-yellow-400" }
    return { strength: "weak", color: "text-red-400" }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))

    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: value && !validateEmail(value) ? "Invalid email" : "" }))
    }
    if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailValid = validateEmail(formData.email)
    const passwordErrors = validatePassword(formData.password)

    if (!emailValid || passwordErrors.length > 0 || !formData.agreeToTerms) {
      setErrors({
        email: !emailValid ? "Invalid email" : "",
        password: passwordErrors,
      })
      return
    }

    try {
      const response = await customerSignup({
        fullname: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: "customer",
      })
      if (response?.user) {
        const otpPath = redirectUrl ? `/otp?redirect=${encodeURIComponent(redirectUrl)}` : "/otp"
        navigate(otpPath)
      }
    } catch (err) {
      console.log(err)
    }
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
              <h1 className="text-white text-3xl font-bold mb-2">Start Shopping Today</h1>
              <p className="text-gray-400 text-sm">Join thousands of happy customers</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <div className="text-red-400 text-sm text-center">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-[#32cd32] transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                {errors.email && <div className="mt-1 text-red-400 text-xs">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className={`w-full bg-black/30 backdrop-blur-sm border rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.password?.length > 0 && formData.password
                        ? "focus:ring-red-500 border-red-500/50"
                        : "focus:ring-[#32cd32] focus:border-[#32cd32] border-gray-700/50"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs text-gray-400">Strength:</span>
                      <span className={`text-xs font-medium ${getPasswordStrength(formData.password).color}`}>
                        {getPasswordStrength(formData.password).strength.toUpperCase()}
                      </span>
                    </div>
                    {errors.password?.length > 0 && (
                      <div className="space-y-1">
                        {errors.password.map((error, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                            <span className="text-xs text-red-400">Missing: {error}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 mt-1 text-[#32cd32] bg-black/30 border-gray-600 rounded focus:ring-[#32cd32] focus:ring-2"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-gray-300 text-sm">
                  I agree to the{" "}
                  <button type="button" className="text-[#32cd32] hover:text-[#28a428] underline">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-[#32cd32] hover:text-[#28a428] underline">
                    Privacy Policy
                  </button>
                </label>
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
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create my account"
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <span className="text-gray-400">Already have an account? </span>
              <button
                onClick={() => navigate("/login")}
                type="button"
                className="text-[#32cd32] hover:text-[#28a428] underline font-medium"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerSignup