"use client"

import { useState } from "react"
import { ChartBarIcon, ShieldCheckIcon, StarIcon, CheckIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import {
  Store,
  Palette,
  Zap,
  Users,
  Menu,
  X,
  TrendingUp,
  Globe,
  Smartphone,
  CreditCard,
  MousePointer,
  Sparkles,
  Rocket,
} from "lucide-react"

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Fashion Entrepreneur",
    content: "Transformed my boutique into a thriving online business in just days!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Mike Chen",
    role: "Tech Startup",
    content: "The real-time customization is a game-changer. Sales increased by 300%!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emma Rodriguez",
    role: "Artisan Seller",
    content: "Beautiful templates and so easy to use. My customers love the experience!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "David Kim",
    role: "Dropshipper",
    content: "Best platform I've used. The analytics dashboard is incredibly detailed.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Lisa Thompson",
    role: "Local Business",
    content: "Went from zero to hero online. The support team is amazing!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Alex Morgan",
    role: "Digital Marketer",
    content: "Seamless integration with all my tools. Highly recommend!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const stats = [
  { number: "50K+", label: "Active Stores", icon: <Store className="h-6 w-6" /> },
  { number: "$2.5B+", label: "Revenue Generated", icon: <TrendingUp className="h-6 w-6" /> },
  { number: "180+", label: "Countries", icon: <Globe className="h-6 w-6" /> },
  { number: "99.9%", label: "Uptime", icon: <ShieldCheckIcon className="h-6 w-6" /> },
]

const features = [
  {
    icon: <MousePointer className="h-10 w-10 sm:h-12 sm:w-12" />,
    title: "Store Builder",
    description: "Create stunning stores with our intuitive visual editor. No coding required.",
    color: "from-[#32cd32] to-[#28a428]",
    delay: "0s",
  },
  {
    icon: <Smartphone className="h-10 w-10 sm:h-12 sm:w-12" />,
    title: "Mobile-First Design",
    description: "Every template is optimized for mobile commerce from day one.",
    color: "from-[#28a428] to-[#22aa22]",
    delay: "0.2s",
  },
  {
    icon: <ChartBarIcon className="h-10 w-10 sm:h-12 sm:w-12" />,
    title: "Real-Time Analytics",
    description: "Track performance, sales, and customer behavior with live dashboards.",
    color: "from-[#32cd32] to-[#4ade80]",
    delay: "0.4s",
  },
  {
    icon: <CreditCard className="h-10 w-10 sm:h-12 sm:w-12" />,
    title: "Secure Payments",
    description: "Accept payments worldwide with enterprise-grade security.",
    color: "from-[#4ade80] to-[#32cd32]",
    delay: "0.6s",
  },
  {
    icon: <Zap className="h-10 w-10 sm:h-12 sm:w-12" />,
    title: "Lightning Speed",
    description: "Global CDN ensures your store loads instantly anywhere.",
    color: "from-[#50e050] to-[#32cd32]",
    delay: "0.8s",
  },
  {
    icon: <Users className="h-10 w-10 sm:h-12 sm:w-12" />,
    title: "Customer Insights",
    description: "Understand your customers with advanced CRM tools.",
    color: "from-[#32cd32] to-[#1e7e1e]",
    delay: "1s",
  },
]

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden">
      {/* Glass Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-[#32cd32]" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#32cd32] to-[#4ade80] bg-clip-text text-transparent">
                Storely
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-[#32cd32] transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-[#32cd32] transition-colors">
                How It Works
              </a>
              <a href="#commission" className="text-gray-300 hover:text-[#32cd32] transition-colors">
                Commission
              </a>
              <a href="#reviews" className="text-gray-300 hover:text-[#32cd32] transition-colors">
                Reviews
              </a>
              <button
                onClick={() => navigate("/Signup-options")}
                className="bg-[#32cd32] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#28a428] transition-colors"
              >
                Get Started
              </button>
            </div>
            <button className="md:hidden text-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-md bg-black/90 border-t border-gray-800/50">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-[#32cd32]">
                Features
              </a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-[#32cd32]">
                How It Works
              </a>
              <a href="#commission" className="block text-gray-300 hover:text-[#32cd32]">
                Commission
              </a>
              <a href="#reviews" className="block text-gray-300 hover:text-[#32cd32]">
                Reviews
              </a>
              <button className="w-full bg-[#32cd32] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#28a428]">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Creative Hero Section */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden min-h-screen flex items-center">
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
            <Rocket className="h-10 w-10 text-[#32cd32]/20" />
          </div>
          <div className="absolute top-60 right-20 animate-float" style={{ animationDelay: "0.5s" }}>
            <TrendingUp className="h-7 w-7 text-[#32cd32]/35" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#32cd32]/10 border border-[#32cd32]/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-[#32cd32]" />
            <span className="text-sm font-medium text-[#32cd32]">Trusted by 50,000+ entrepreneurs</span>
          </div>
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
            <span className="text-gray-50">Build Your Dream</span>
            <br />
            <span className="text-gray-50">E-Commerce Store</span>
            <br />
            <span className="bg-gradient-to-r from-[#32cd32] via-[#4ade80] to-[#50e050] bg-clip-text text-transparent italic">
              & Ship Fast
            </span>
          </h1>
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Create, customize, and launch your online store in minutes. Join thousands of entrepreneurs who chose
            <span className="text-[#32cd32] font-semibold"> Storely</span> to build their digital empire with
            zero-config setup and real-time customization.
          </p>
          {/* CTA Buttons */}
          <div className="flex justify-center items-center mb-16">
            <button
              onClick={() => navigate("/sellersignup")}
              className="group bg-[#32cd32] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#28a428] transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-[#32cd32]/20 flex items-center space-x-2"
            >
              <Rocket className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Launch Your Store Now</span>
            </button>
          </div>
          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button
              onClick={() => navigate("/sellersignup")}
              className="group backdrop-blur-md bg-gray-900/40 border border-[#32cd32]/30 text-[#32cd32] px-6 py-3 rounded-lg font-semibold hover:bg-gray-900/60 transition-all duration-300 transform hover:scale-105"
            >
              Join as a Seller
            </button>
            <button
              onClick={() => navigate("/customersignup")}
              className="group backdrop-blur-md bg-gray-900/40 border border-gray-700/50 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900/60 hover:text-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              Browse as Customer
            </button>
          </div>
          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-4 w-4 text-[#32cd32]" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-4 w-4 text-[#32cd32]" />
              <span>5-minute setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-4 w-4 text-[#32cd32]" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3 text-[#32cd32]">{stat.icon}</div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-50 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive How It Works Section */}
      <section
        id="how-it-works"
        className="py-16 sm:py-20 px-4 bg-gradient-to-br from-[#32cd32]/5 via-black to-[#32cd32]/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-50">How It Works</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Your journey from idea to successful online store in 3 simple steps
            </p>
          </div>
          {/* Interactive Steps */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
              {[
                {
                  step: "01",
                  title: "Choose Template",
                  description:
                    "Browse hundreds of professionally designed templates. Pick one that matches your vision or start from scratch.",
                  icon: <Palette className="h-12 w-12 sm:h-16 sm:w-16" />,
                  details: "Over 500+ templates across all industries",
                  color: "from-[#32cd32] to-[#28a428]",
                },
                {
                  step: "02",
                  title: "Customize Everything",
                  description:
                    "Use our intuitive visual editor to customize colors, fonts, layouts, and content in real-time.",
                  icon: <Zap className="h-12 w-12 sm:h-16 sm:w-16" />,
                  details: "Real-time preview with instant changes",
                  color: "from-[#28a428] to-[#22aa22]",
                },
                {
                  step: "03",
                  title: "Launch & Sell",
                  description:
                    "Go live instantly with secure payments, analytics, and everything you need to start selling.",
                  icon: <TrendingUp className="h-12 w-12 sm:h-16 sm:w-16" />,
                  details: "Accept payments from day one",
                  color: "from-[#22aa22] to-[#32cd32]",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div
                    className={`group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                      activeStep === index ? "scale-105" : ""
                    }`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    <div
                      className={`relative overflow-hidden backdrop-blur-xl bg-gray-800/20 border-2 rounded-3xl p-6 sm:p-8 transition-all duration-500 ${
                        activeStep === index
                          ? "border-[#32cd32] bg-gray-800/40 shadow-2xl shadow-[#32cd32]/20"
                          : "border-gray-700/30 hover:border-gray-600/50"
                      }`}
                    >
                      {/* Background Gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-500 ${
                          activeStep === index ? "opacity-10" : "group-hover:opacity-5"
                        }`}
                      ></div>
                      {/* Step Number */}
                      <div
                        className={`absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-300 ${
                          activeStep === index ? "bg-[#32cd32] text-black scale-110" : "bg-gray-700 text-[#32cd32]"
                        }`}
                      >
                        {step.step}
                      </div>
                      {/* Icon */}
                      <div
                        className={`relative z-10 mb-6 transition-all duration-500 ${
                          activeStep === index ? "text-[#32cd32] scale-110" : "text-gray-400 group-hover:text-[#32cd32]"
                        }`}
                      >
                        {step.icon}
                      </div>
                      {/* Content */}
                      <div className="relative z-10">
                        <h3
                          className={`text-xl sm:text-2xl font-bold mb-4 transition-colors duration-300 ${
                            activeStep === index ? "text-[#32cd32]" : "text-gray-50 group-hover:text-[#32cd32]"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">{step.description}</p>
                        <div
                          className={`text-xs sm:text-sm font-medium transition-all duration-300 ${
                            activeStep === index
                              ? "text-[#32cd32] opacity-100"
                              : "text-gray-500 opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          {step.details}
                        </div>
                      </div>
                      {/* Pulse Effect */}
                      {activeStep === index && (
                        <div className="absolute inset-0 border-2 border-[#32cd32]/50 rounded-3xl animate-ping"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Progress Bar */}
            <div className="mt-8 sm:mt-12 flex justify-center">
              <div className="flex space-x-2">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStep === index ? "bg-[#32cd32] scale-125" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    onClick={() => setActiveStep(index)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section
        id="features"
        className="py-16 sm:py-20 px-4 relative bg-gradient-to-br from-gray-900 via-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#32cd32] to-[#4ade80] bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to build, customize, and scale your online empire
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden backdrop-blur-xl bg-gray-800/20 border border-gray-700/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:bg-gray-800/30 transition-all duration-500 transform hover:scale-105 cursor-pointer`}
                style={{ animationDelay: feature.delay }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`}
                ></div>
                <div
                  className={`relative z-10 text-[#32cd32] mb-4 sm:mb-6 transform transition-all duration-500 ${hoveredFeature === index ? "scale-110 rotate-6" : ""}`}
                >
                  {feature.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4 text-gray-50 group-hover:text-[#32cd32] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed group-hover:text-gray-50 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                <div
                  className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-2 h-2 bg-[#32cd32] rounded-full transition-all duration-500 ${hoveredFeature === index ? "scale-150 shadow-lg shadow-[#32cd32]/50" : ""}`}
                ></div>
                <div
                  className={`absolute inset-0 border-2 border-[#32cd32]/0 group-hover:border-[#32cd32]/30 rounded-2xl sm:rounded-3xl transition-all duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Model Section */}
      <section id="commission" className="py-16 sm:py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-gray-50">Simple, Fair Pricing</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              We only succeed when you succeed. That's why we keep it simple.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              <div className="order-2 lg:order-1 flex justify-center">
                <div className="relative w-full">
                  <div className="w-full h-full min-h-[500px] lg:min-h-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#32cd32]/10 to-[#32cd32]/5 border border-[#32cd32]/20 flex items-center justify-center">
                    <img
                      src="/assets/commission-img.jpg"
                      alt="Happy entrepreneur celebrating success"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#32cd32]/20 to-[#32cd32]/10 rounded-3xl blur-xl -z-10"></div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-gray-900/50 to-black border-2 border-[#32cd32] rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#32cd32]/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#32cd32]/10 rounded-full translate-y-12 -translate-x-12"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#32cd32]/5 rounded-full blur-2xl"></div>
                  <div className="relative z-10 h-full flex flex-col justify-center">
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#32cd32] mb-4">1%</div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-50">
                      Commission on Sales
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                      No monthly fees, no setup costs, no hidden charges. You only pay when you make a sale. We take
                      just 1% of your revenue, so we're invested in your success.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
                      <div className="text-center">
                        <CheckIcon className="h-10 w-10 sm:h-12 sm:w-12 text-[#32cd32] mx-auto mb-4" />
                        <h4 className="font-bold text-base sm:text-lg mb-2 text-gray-50">No Setup Fees</h4>
                        <p className="text-gray-300 text-sm sm:text-base">Get started completely free</p>
                      </div>
                      <div className="text-center">
                        <CheckIcon className="h-10 w-10 sm:h-12 sm:w-12 text-[#32cd32] mx-auto mb-4" />
                        <h4 className="font-bold text-base sm:text-lg mb-2 text-gray-50">No Monthly Costs</h4>
                        <p className="text-gray-300 text-sm sm:text-base">Pay only when you sell</p>
                      </div>
                      <div className="text-center">
                        <CheckIcon className="h-10 w-10 sm:h-12 sm:w-12 text-[#32cd32] mx-auto mb-4" />
                        <h4 className="font-bold text-base sm:text-lg mb-2 text-gray-50">Transparent Pricing</h4>
                        <p className="text-gray-300 text-sm sm:text-base">What you see is what you pay</p>
                      </div>
                    </div>
                    <div className="mt-8 sm:mt-12">
                      <button
                        onClick={() => navigate("/sellersignup")}
                        className="bg-[#32cd32] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#28a428] transition-all duration-300 transform hover:scale-105"
                      >
                        Start Selling Today
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 sm:py-20 px-4 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#32cd32] to-[#4ade80] bg-clip-text text-transparent">
              Loved by Entrepreneurs
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300">Join thousands of successful store owners</p>
        </div>
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <div className="flex space-x-4 sm:space-x-6 animate-scroll-left" style={{ width: "calc(100% * 3)" }}>
            {[...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 backdrop-blur-xl bg-gray-800/20 border border-gray-700/30 rounded-2xl p-4 sm:p-6 w-72 sm:w-80"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-50 text-sm sm:text-base">{review.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-400">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-[#32cd32] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">"{review.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 relative bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-[#32cd32]/10 to-[#32cd32]/5 border border-[#32cd32]/20 rounded-3xl p-6 sm:p-8 lg:p-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#32cd32] to-[#4ade80] bg-clip-text text-transparent">
                Ready to Start Selling?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the revolution of entrepreneurs building their digital empires. Your success story starts here.
            </p>
            <div className="flex justify-center">
              <button className="group bg-[#32cd32] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#28a428] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Your Store Today</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800/50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Store className="h-8 w-8 text-[#32cd32] flex-shrink-0" />
                <span className="text-xl font-bold bg-gradient-to-r from-[#32cd32] to-[#4ade80] bg-clip-text text-transparent">
                  Storely
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Empowering entrepreneurs to build successful online businesses with cutting-edge technology.
              </p>
            </div>
            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-gray-50 mb-4 text-base">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    API
                  </a>
                </li>
              </ul>
            </div>
            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-gray-50 mb-4 text-base">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* Support Links */}
            <div>
              <h4 className="font-semibold text-gray-50 mb-4 text-base">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors text-sm">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Bottom Footer */}
          <div className="pt-8 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Legal Links */}
              <div className="flex flex-wrap justify-center md:justify-start items-center space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-[#32cd32] transition-colors">
                  Cookie Policy
                </a>
              </div>
              {/* Copyright */}
              <p className="text-gray-400 text-sm text-center md:text-right">
                &copy; 2024 Storely. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
