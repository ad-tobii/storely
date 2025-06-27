"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useAuthStore } from "../../../store/useAuthStore"
import { useNavigate, useLocation } from "react-router-dom"

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "customer",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [redirectUrl, setRedirectUrl] = useState(null);

    const { login, isLoading, error } = useAuthStore()

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const redirect = params.get('redirect');
        if (redirect) {
            setRedirectUrl(decodeURIComponent(redirect));
        }
    }, [location.search]);


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
                    window.location.href = redirectUrl; // Use window.location for external-like navigation
                } else {
                    // Navigate to default dashboards if no redirect is specified
                    navigate(loggedInUser.role === "seller" ? "/seller/dashboard" : "/");
                }
            }
        } catch (error) {
            console.error("Login failed on component:", error)
        }
    }

    const handleNavigateToSignup = () => {
      const signupPath = formData.role === 'customer' ? '/customersignup' : '/sellersignup';
      const destination = redirectUrl 
        ? `${signupPath}?redirect=${encodeURIComponent(redirectUrl)}`
        : signupPath;
      navigate(destination);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-zinc-900 rounded-lg overflow-hidden">
                    <div className="h-1 bg-[#32cd32]"></div>

                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-white text-2xl font-semibold mb-2">Welcome back</h1>
                            <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
                        </div>
                        
                        {redirectUrl && (
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3 mb-6 text-center">
                            <p className="text-blue-300 text-sm">Please log in to continue.</p>
                          </div>
                        )}

                        <div className="mb-8">
                            <label className="block text-white text-sm font-medium mb-4 text-center">Choose your role</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" onClick={() => setFormData((prev) => ({ ...prev, role: "customer" }))} className={`relative p-4 rounded-lg border-2 transition-all duration-300 group ${ formData.role === "customer" ? "border-[#32cd32] bg-[#32cd32]/10 shadow-lg shadow-[#32cd32]/20" : "border-gray-600 bg-[#323439] hover:border-gray-500" }`}>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className={`p-2 rounded-full transition-all duration-300 ${ formData.role === "customer" ? "bg-[#32cd32] text-black" : "bg-gray-700 text-gray-300 group-hover:bg-gray-600"}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg></div>
                                        <span className={`text-sm font-medium transition-colors duration-300 ${ formData.role === "customer" ? "text-[#32cd32]" : "text-gray-300"}`}>Customer</span>
                                    </div>
                                    {formData.role === "customer" && (<div className="absolute -top-1 -right-1 w-4 h-4 bg-[#32cd32] rounded-full flex items-center justify-center"><svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div>)}
                                </button>
                                <button type="button" onClick={() => setFormData((prev) => ({ ...prev, role: "seller" }))} className={`relative p-4 rounded-lg border-2 transition-all duration-300 group ${ formData.role === "seller" ? "border-[#32cd32] bg-[#32cd32]/10 shadow-lg shadow-[#32cd32]/20" : "border-gray-600 bg-[#323439] hover:border-gray-500"}`}>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className={`p-2 rounded-full transition-all duration-300 ${ formData.role === "seller" ? "bg-[#32cd32] text-black" : "bg-gray-700 text-gray-300 group-hover:bg-gray-600"}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg></div>
                                        <span className={`text-sm font-medium transition-colors duration-300 ${ formData.role === "seller" ? "text-[#32cd32]" : "text-gray-300"}`}>Seller</span>
                                    </div>
                                    {formData.role === "seller" && (<div className="absolute -top-1 -right-1 w-4 h-4 bg-[#32cd32] rounded-full flex items-center justify-center"><svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div>)}
                                </button>
                            </div>
                        </div>

                        {error && (<div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 mb-6"><div className="text-red-400 text-sm text-center">{error}</div></div>)}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email Address</label>
                                <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-4 w-4 text-gray-400" /></div><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className="w-full bg-[#323439] rounded-md pl-10 pr-3 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32] transition-all duration-200" required /></div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Password</label>
                                <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-4 w-4 text-gray-400" /></div><input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" className="w-full bg-[#323439] rounded-md pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32] transition-all duration-200" required /><button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>
                            </div>
                            <div className="flex justify-end"><button type="button" className="text-[#32cd32] hover:text-green-400 text-sm underline transition-colors duration-200">Forgot your password?</button></div>
                            <button type="submit" disabled={isLoading} className={`w-full bg-[#32cd32] text-black font-medium py-3 px-4 rounded-md transition-all duration-200 ${ isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/25"}`}>{isLoading ? (<div className="flex items-center justify-center space-x-2"><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div><span>Signing in...</span></div>) : ( "Sign In" )}</button>
                        </form>
                        <div className="text-center mt-2"><span className="text-gray-400">{"Don't have an account? "}</span><button onClick={handleNavigateToSignup} type="button" className="text-[#32cd32] hover:text-green-400 underline transition-colors duration-200">Sign Up</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}