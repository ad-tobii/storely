"use client"

import { useState } from "react"
import {
  ChartBarIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  StarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline"
import { Store, Palette, Zap, Users, Menu, X } from "lucide-react"

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
              <span className="text-xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                StoreForge
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-lime-400 transition-colors">
                Features
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
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-transparent to-emerald-400/5"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-lime-400 to-emerald-400 bg-clip-text text-transparent">
                Build Your Dream
              </span>
              <br />
              <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                Online Store
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Create, customize, and launch your e-commerce empire in real-time. No coding required. Just pure
              innovation at your fingertips.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-lime-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>Join Now</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group backdrop-blur-md bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              Join as a Seller
            </button>
            <button className="group backdrop-blur-md bg-zinc-900/50 border border-lime-400/30 text-lime-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-900/70 transition-all duration-300 transform hover:scale-105">
              Join as a Customer
            </button>
          </div>

          <div className="relative">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Dashboard Preview"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful tools designed to help you succeed in the digital marketplace
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
                icon: <DevicePhoneMobileIcon className="h-8 w-8" />,
                title: "Mobile Optimized",
                description: "Your store looks perfect on every device, automatically optimized for mobile commerce",
              },
              {
                icon: <ChartBarIcon className="h-8 w-8" />,
                title: "Advanced Analytics",
                description: "Track sales, customer behavior, and growth metrics with detailed insights",
              },
              {
                icon: <ShieldCheckIcon className="h-8 w-8" />,
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
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-lime-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Reviews Section */}
      <section id="reviews" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
              Loved by Entrepreneurs
            </span>
          </h2>
          <p className="text-xl text-gray-300">Join thousands of successful store owners</p>
        </div>

        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0">
            <div className="animate-scroll-left flex space-x-6 h-full items-center">
              {[...reviews, ...reviews].map((review, index) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-lime-400/10 to-emerald-400/10 border border-lime-400/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                Ready to Start Selling?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the revolution of entrepreneurs building their digital empires. Your success story starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-lime-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Your Store Today</span>
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group backdrop-blur-md bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Store className="h-8 w-8 text-lime-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                StoreForge
              </span>
            </div>
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-lime-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-lime-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-lime-400 transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 StoreForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
