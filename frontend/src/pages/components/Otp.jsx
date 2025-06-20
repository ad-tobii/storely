// src/pages/components/Otp.jsx
"use client";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, role, getOtp, verifyOtp, error: authError } = useAuthStore();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    if (redirect) {
        setRedirectUrl(decodeURIComponent(redirect));
    }
  }, [location.search]);

  // ✅ THIS IS THE CRITICAL CHANGE WITH LOGGING
  const hasFetchedOtp = useRef(false);
  useEffect(() => {
    // Log the state every time the effect runs
    console.log("[Otp.jsx] useEffect triggered. State:", { 
        user, 
        role, 
        hasFetched: hasFetchedOtp.current 
    });

    if (!user || !user.email || !role) {
      console.log("[Otp.jsx] useEffect exiting: user, user.email, or role is missing.");
      return;
    }

    if (hasFetchedOtp.current) {
      console.log("[Otp.jsx] useEffect exiting: OTP has already been fetched.");
      return;
    }
  
    // Mark as fetched immediately to prevent re-runs
    hasFetchedOtp.current = true;
    console.log("[Otp.jsx] Conditions met. Calling fetchOtp().");
  
    const fetchOtp = async () => {
      try {
        await getOtp();
        console.log("[Otp.jsx] fetchOtp() call completed successfully.");
      } catch (err) {
        console.error("[Otp.jsx] Error calling getOtp():", err);
        setLocalError(err.response?.data?.message || err.message || "Failed to request OTP");
      }
    };
  
    fetchOtp();
  }, [getOtp, user, role]);
  
  const handleInputChange = (index, value) => {
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 5);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 5; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 4);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 5) {
      setLocalError("Please enter all 5 digits");
      return;
    }

    setIsLoading(true);
    setLocalError(null);

    try {
      const verifiedUser = await verifyOtp({ email: user.email, otp: otpValue });

      if (verifiedUser) {
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          navigate(verifiedUser.role === "seller" ? "/seller-onboarding" : "/");
        }
      }
    } catch (err) {
      setLocalError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setOtp(["", "", "", "", ""]);
    setLocalError(null);
    inputRefs.current[0]?.focus();

    try {
      await getOtp();
    } catch (err) {
      setLocalError(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleBackToSignup = () => {
    const signupPath = role === "seller" ? "/sellersignup" : "/customersignup";
    const destination = redirectUrl 
      ? `${signupPath}?redirect=${encodeURIComponent(redirectUrl)}` 
      : signupPath;
    navigate(destination);
  };

  return (
    <div className="min-h-screen bg-black flex items-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="w-full max-w-md lg:max-w-lg">
            <img src="/assets/otp-svg.svg" alt="otp-image" className="w-full" />
          </div>
        </div>
        <div className="flex-1 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-semibold mb-4">Verify Your Account</h1>
            <p className="text-gray-400 text-lg">We've sent a 5-digit verification code to your email</p>
            <p className="text-green-500 font-medium mt-2">
              {user?.email ? `${user.email.slice(0, 2)}****${user.email.slice(-10)}` : "Email not available"}
            </p>
          </div>
          {(authError || localError) && (
            <div className="text-red-500 text-sm text-center mb-4">
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
                  className="w-14 h-14 bg-white border-2 border-gray-300 rounded-lg text-center text-2xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-green-500 transition-all duration-200"
                  autoComplete="off"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 5}
              className="w-full bg-[#32cd32] hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
              className="text-green-500 hover:text-green-400 font-medium underline transition-colors duration-200"
            >
              Resend Code
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
  );
}