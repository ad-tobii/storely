"use client"
import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Store, Sparkles, TrendingUp, Zap, Users, ShieldCheck, Mail } from "lucide-react"
import { useAuthStore } from "../../../store/useAuthStore"

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", ""])
  const [localError, setLocalError] = useState(null)
  const [redirectUrl, setRedirectUrl] = useState(null)

  const inputRefs = useRef([])
  const navigate = useNavigate()
  const location = useLocation()

  const { user, role, getOtp, verifyOtp, error: authError, isLoading: isAuthLoading } = useAuthStore()
  const [isResending, setIsResending] = useState(false);

  const hasFetchedOtp = useRef(false)
  
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5)
  }, [])
  
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const redirect = params.get("redirect")
    if (redirect) {
      setRedirectUrl(decodeURIComponent(redirect))
    }
  }, [location.search])

  useEffect(() => {
    if (!user || !user.email || !role || hasFetchedOtp.current) {
      return
    }

    const fetchOtp = async () => {
      hasFetchedOtp.current = true;
      try {
        await getOtp()
      } catch (err) {
        setLocalError(err.response?.data?.message || err.message || "Failed to request OTP")
      }
    }

    fetchOtp()
  }, [getOtp, user, role])

  const handleInputChange = (index, value) => {
    if (value.length > 1 || (value && !/^\d$/.test(value))) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 5)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length && i < 5; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    const nextIndex = Math.min(pastedData.length, 4)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join("")

    if (otpValue.length !== 5) {
      setLocalError("Please enter all 5 digits")
      return
    }

    setLocalError(null)

    try {
      const verifiedUser = await verifyOtp({ email: user.email, otp: otpValue })

      if (verifiedUser) {
        if (redirectUrl) {
          window.location.href = redirectUrl
        } else {
          navigate(verifiedUser.role === "seller" ? "/seller-onboarding" : "/")
        }
      }
    } catch (err) {
        // Error is already set in the store, we can just display it.
    }
  }

  const handleResendCode = async () => {
    setOtp(["", "", "", "", ""])
    setLocalError(null)
    inputRefs.current[0]?.focus()
    setIsResending(true)

    try {
      await getOtp()
    } catch (err) {
      // Error is set in the store
    } finally {
      setIsResending(false)
    }
  }

  const handleBackToSignup = () => {
    const signupPath = role === "seller" ? "/sellersignup" : "/customersignup"
    const destination = redirectUrl ? `${signupPath}?redirect=${encodeURIComponent(redirectUrl)}` : signupPath
    navigate(destination)
  }

  return (
    <div className="min-h-screen bg-black flex items-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#32cd32]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#32cd32]/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#32cd32]/5 rounded-full blur-3xl"></div>
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
        <div className="absolute bottom-32 left-60 animate-float" style={{ animationDelay: "2.5s" }}>
          <Mail className="h-6 w-6 text-[#32cd32]/35" />
        </div>
      </div>

      <div className="absolute top-6 left-6 flex items-center space-x-2 z-20">
        <Store className="h-8 w-8 text-[#32cd32]" />
        <span className="text-xl font-bold bg-gradient-to-r from-[#32cd32] to-[#4ade80] bg-clip-text text-transparent">
          Storely
        </span>
      </div>

      <div className="w-full max-w-6xl flex flex-col mt-16 lg:flex-row items-center gap-8 lg:gap-16 relative z-10">
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="w-full max-w-md lg:max-w-lg backdrop-blur-xl bg-[#32cd32]/5 rounded-3xl p-8 border border-[#32cd32]/20">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#32cd32]/20 to-[#32cd32]/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#32cd32]/30">
                <Mail className="h-16 w-16 text-[#32cd32]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
              <p className="text-gray-300">We've sent a verification code to your inbox</p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full max-w-md">
          <div className="backdrop-blur-xl bg-black/40 border border-gray-800/50 rounded-2xl p-8 shadow-2xl shadow-[#32cd32]/10">
            <div className="text-center mb-8">
              <h1 className="text-white text-3xl font-bold mb-4">Verify Your Account</h1>
              <p className="text-gray-400 text-lg mb-2">We've sent a 5-digit verification code to your email</p>
              <div className="flex items-center justify-center space-x-2 bg-[#32cd32]/10 rounded-xl p-3 border border-[#32cd32]/20">
                <Mail className="h-4 w-4 text-[#32cd32]" />
                <p className="text-[#32cd32] font-medium">
                  {user?.email ? `${user.email.slice(0, 2)}****${user.email.slice(-10)}` : "Email not available"}
                </p>
              </div>
            </div>
            {(authError || localError) && (
              <div className="text-red-400 text-sm text-center mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                {authError || localError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-14 h-14 bg-black/30 backdrop-blur-sm border-2 border-gray-700/50 rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-[#32cd32] transition-all duration-200"
                    autoComplete="off"
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={isAuthLoading || otp.join("").length !== 5}
                className="w-full bg-gradient-to-r from-[#32cd32] to-[#28a428] hover:from-[#28a428] hover:to-[#22aa22] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg transform hover:scale-105 hover:shadow-lg hover:shadow-[#32cd32]/25"
              >
                {isAuthLoading && !isResending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify Code"
                )}
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-gray-400 mb-2">Didn't receive the code?</p>
              <button
                onClick={handleResendCode}
                disabled={isAuthLoading}
                className="text-[#32cd32] hover:text-[#28a428] font-medium underline transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthLoading && isResending ? "Resending..." : "Resend Code"}
              </button>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={handleBackToSignup}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                ← Back to Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}