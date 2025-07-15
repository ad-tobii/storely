"use client"

import { useState } from "react"
import { ChartBarIcon, ShieldCheckIcon, StarIcon, ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline"
import { Store, Palette, Zap, Users, Menu, X, TrendingUp, Globe, Smartphone, CreditCard } from "lucide-react"

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

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Glass Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-lime-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">
                StoreForge
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-lime-400 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-lime-400 transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-lime-400 transition-colors">
                Pricing
              </a>
              <a href="#reviews" className="text-gray-300 hover:text-lime-400 transition-colors">
                Reviews
              </a>
              <button className="bg-lime-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-lime-300 transition-colors">
                Get Started
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-md bg-black/90 border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-lime-400">
                Features
              </a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-lime-400">
                How It Works
              </a>
              <a href="#pricing" className="block text-gray-300 hover:text-lime-400">
                Pricing
              </a>
              <a href="#reviews" className="block text-gray-300 hover:text-lime-400">
                Reviews
              </a>
              <button className="w-full bg-lime-400 text-black px-4 py-2 rounded-lg font-semibold">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-32 px-4 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-transparent to-lime-400/10"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-lime-400/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-white/5 rounded-full animate-pulse-slow"></div>
        <div
          className="absolute bottom-40 left-20 w-20 h-20 bg-lime-400/5 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-60 right-40 w-8 h-8 bg-lime-400/20 rounded-full animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-white">An E-Commerce Platform</span>
            <br />
            <span className="text-white">Built For Entrepreneurs</span>
            <br />
            <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent italic">
              Who Ship
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            <span className="text-lime-400 font-semibold">Over 50,000 stores</span> have launched on StoreForge,
            leveraging real-time customization, zero-config payment processing, mobile optimization, and instant
            deployment scaling to thousands of customers.
          </p>

          <div className="mb-16">
            <button className="group bg-lime-400 text-black px-12 py-5 rounded-2xl font-bold text-xl hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-lime-400/20">
              Launch Your Store in 5 minutes
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button className="group backdrop-blur-md bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              Join as a Seller
            </button>
            <button className="group backdrop-blur-md bg-zinc-900/50 border border-lime-400/30 text-lime-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-zinc-900/70 transition-all duration-300 transform hover:scale-105">
              Join as a Customer
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-zinc-900/50 to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3 text-lime-400">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your store up and running in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Choose Your Template",
                description: "Select from hundreds of professionally designed templates or start from scratch",
                icon: <Palette className="h-12 w-12" />,
              },
              {
                step: "02",
                title: "Customize in Real-Time",
                description: "Drag, drop, and customize every element with our intuitive visual editor",
                icon: <Zap className="h-12 w-12" />,
              },
              {
                step: "03",
                title: "Launch & Sell",
                description: "Go live instantly and start accepting payments from customers worldwide",
                icon: <TrendingUp className="h-12 w-12" />,
              },
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-lime-400 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.step}
                </div>
                <div className="text-lime-400 mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-black">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRightIcon className="h-6 w-6 text-lime-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative bg-gray-50 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to help you thrive in the digital marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette className="h-8 w-8" />,
                title: "Real-Time Customization",
                description: "Design and modify your store instantly with our intuitive drag-and-drop editor",
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: "Mobile Optimized",
                description: "Your store looks perfect on every device, automatically optimized for mobile commerce",
              },
              {
                icon: <ChartBarIcon className="h-8 w-8" />,
                title: "Advanced Analytics",
                description: "Track sales, customer behavior, and growth metrics with detailed insights",
              },
              {
                icon: <CreditCard className="h-8 w-8" />,
                title: "Secure Payments",
                description: "Accept payments safely with enterprise-grade security and fraud protection",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Lightning Fast",
                description: "Optimized for speed with global CDN and advanced caching technology",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Customer Management",
                description: "Build relationships with integrated CRM and marketing automation tools",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-lime-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Reviews Section */}
      <section id="reviews" className="py-20 px-4 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">
              Loved by Entrepreneurs
            </span>
          </h2>
          <p className="text-xl text-gray-300">Join thousands of successful store owners</p>
        </div>

        <div className="relative h-80 overflow-hidden">
          <div className="flex space-x-6 animate-scroll-left">
            {[...reviews, ...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 w-80"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{review.name}</h4>
                    <p className="text-sm text-gray-400">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-lime-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"{review.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your business needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                description: "Perfect for small businesses just getting started",
                features: [
                  "Up to 100 products",
                  "Basic templates",
                  "Mobile responsive",
                  "SSL certificate",
                  "24/7 support",
                ],
                popular: false,
              },
              {
                name: "Professional",
                price: "$79",
                period: "/month",
                description: "Ideal for growing businesses with advanced needs",
                features: [
                  "Unlimited products",
                  "Premium templates",
                  "Advanced analytics",
                  "Custom domain",
                  "Priority support",
                  "Marketing tools",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$199",
                period: "/month",
                description: "For large businesses requiring maximum flexibility",
                features: [
                  "Everything in Professional",
                  "White-label solution",
                  "API access",
                  "Dedicated manager",
                  "Custom integrations",
                  "Advanced security",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 border-2 ${
                  plan.popular ? "border-lime-400 shadow-xl scale-105" : "border-gray-200"
                } transition-all duration-300 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-lime-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-5xl font-bold text-black">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-lime-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                    plan.popular
                      ? "bg-lime-400 text-black hover:bg-lime-300"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-lime-400/10 to-lime-400/5 border border-lime-400/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">
                Ready to Start Selling?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the revolution of entrepreneurs building their digital empires. Your success story starts here.
            </p>
            <div className="flex justify-center">
              <button className="group bg-lime-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Your Store Today</span>
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Store className="h-8 w-8 text-lime-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">
                  StoreForge
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering entrepreneurs to build successful online businesses with cutting-edge technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
            <div className="flex space-x-8 text-gray-400 mb-4 md:mb-0">
              <a href="#" className="hover:text-lime-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-lime-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-lime-400 transition-colors">
                Cookies
              </a>
            </div>
            <p className="text-gray-400">&copy; 2024 StoreForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
