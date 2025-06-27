import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Users, BarChart3, Package, Shield, Star, ArrowRight, Check, Smartphone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Storely Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-black">Storely</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-zinc-600 hover:text-[#32cd32] transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-zinc-600 hover:text-[#32cd32] transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-sm font-medium text-zinc-600 hover:text-[#32cd32] transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium text-zinc-600 hover:text-[#32cd32] transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-zinc-600 hover:text-[#32cd32]">
              Sign In
            </Button>
            <Button className="bg-[#32cd32] hover:bg-[#28a428] text-white">Start Free</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#32cd32]/5 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-[#32cd32]/10 text-[#32cd32] border-[#32cd32]/20">No Tech Skills Required</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
                    Open Your Online Store in <span className="text-[#32cd32]">Minutes</span>
                  </h1>
                  <p className="max-w-[600px] text-zinc-600 md:text-xl">
                    Simple, powerful tools for small businesses. Get your online store, CRM, analytics, and inventory
                    management - all in one place. No coding, no complexity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-[#32cd32] hover:bg-[#28a428] text-white">
                    Start Your Free Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-zinc-300 text-zinc-700 hover:bg-zinc-50">
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-zinc-600">
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-[#32cd32]" />
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-[#32cd32]" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Storely Dashboard Preview"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-[#32cd32]/10 text-[#32cd32] border-[#32cd32]/20">Everything You Need</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">
                  Built for Small Business Success
                </h2>
                <p className="max-w-[900px] text-zinc-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From beautiful storefronts to powerful business tools - we've got everything covered so you can focus
                  on what matters most: growing your business.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-zinc-200 hover:border-[#32cd32]/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#32cd32]/10 flex items-center justify-center mb-4">
                    <ShoppingBag className="h-6 w-6 text-[#32cd32]" />
                  </div>
                  <CardTitle className="text-black">Beautiful Store Templates</CardTitle>
                  <CardDescription className="text-zinc-600">
                    Choose from dozens of professionally designed templates. Customize colors, fonts, and layouts with
                    simple clicks.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-zinc-200 hover:border-[#32cd32]/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#32cd32]/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[#32cd32]" />
                  </div>
                  <CardTitle className="text-black">Smart CRM</CardTitle>
                  <CardDescription className="text-zinc-600">
                    Keep track of your customers, their orders, and preferences. Build lasting relationships with
                    automated follow-ups.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-zinc-200 hover:border-[#32cd32]/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#32cd32]/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-[#32cd32]" />
                  </div>
                  <CardTitle className="text-black">Real-time Analytics</CardTitle>
                  <CardDescription className="text-zinc-600">
                    Understand your business with clear, actionable insights. See what's working and what needs
                    attention.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-zinc-200 hover:border-[#32cd32]/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#32cd32]/10 flex items-center justify-center mb-4">
                    <Package className="h-6 w-6 text-[#32cd32]" />
                  </div>
                  <CardTitle className="text-black">Inventory Management</CardTitle>
                  <CardDescription className="text-zinc-600">
                    Never run out of stock again. Automatic alerts, easy reordering, and supplier management made
                    simple.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-zinc-200 hover:border-[#32cd32]/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#32cd32]/10 flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-[#32cd32]" />
                  </div>
                  <CardTitle className="text-black">Mobile Optimized</CardTitle>
                  <CardDescription className="text-zinc-600">
                    Your store looks perfect on every device. Manage your business from anywhere with our mobile app.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-zinc-200 hover:border-[#32cd32]/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#32cd32]/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-[#32cd32]" />
                  </div>
                  <CardTitle className="text-black">Secure & Reliable</CardTitle>
                  <CardDescription className="text-zinc-600">
                    Bank-level security, automatic backups, and 99.9% uptime. Your business is always protected and
                    online.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-[#32cd32]/10 text-[#32cd32] border-[#32cd32]/20">Simple Yet Powerful</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none text-black">
                    Why Small Businesses Choose Storely
                  </h2>
                  <p className="max-w-[600px] text-zinc-600 md:text-xl">
                    We understand that running a small business is hard enough. That's why we made Storely incredibly
                    simple to use, yet powerful enough to grow with your business.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#32cd32] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Set up in under 10 minutes</h3>
                      <p className="text-zinc-600 text-sm">
                        No technical knowledge required. Follow our simple wizard and you're live.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#32cd32] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">All-in-one solution</h3>
                      <p className="text-zinc-600 text-sm">
                        Store, CRM, analytics, and inventory - everything in one place.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#32cd32] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">24/7 human support</h3>
                      <p className="text-zinc-600 text-sm">Real people ready to help you succeed, not chatbots.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#32cd32] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Grows with your business</h3>
                      <p className="text-zinc-600 text-sm">
                        Start small, scale big. Our platform adapts to your needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Happy business owner using Storely"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-black">
                  Trusted by 10,000+ Small Businesses
                </h2>
                <p className="max-w-[900px] text-zinc-600 md:text-xl/relaxed">
                  Join thousands of successful business owners who've grown their sales with Storely.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-zinc-200">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#32cd32] text-[#32cd32]" />
                    ))}
                  </div>
                  <CardDescription className="text-zinc-600">
                    "Storely transformed my craft business. I went from struggling with complicated platforms to having
                    a beautiful store that actually converts visitors into customers."
                  </CardDescription>
                  <div className="flex items-center space-x-2 pt-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Sarah M."
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-black text-sm">Sarah M.</p>
                      <p className="text-zinc-500 text-xs">Handmade Jewelry</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <Card className="border-zinc-200">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#32cd32] text-[#32cd32]" />
                    ))}
                  </div>
                  <CardDescription className="text-zinc-600">
                    "The inventory management alone saved me 10 hours a week. Now I can focus on creating great products
                    instead of tracking spreadsheets."
                  </CardDescription>
                  <div className="flex items-center space-x-2 pt-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Mike R."
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-black text-sm">Mike R.</p>
                      <p className="text-zinc-500 text-xs">Local Bakery</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <Card className="border-zinc-200">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#32cd32] text-[#32cd32]" />
                    ))}
                  </div>
                  <CardDescription className="text-zinc-600">
                    "I'm not tech-savvy at all, but Storely made it so easy. My online sales have tripled since
                    switching from my old platform."
                  </CardDescription>
                  <div className="flex items-center space-x-2 pt-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Lisa K."
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-black text-sm">Lisa K.</p>
                      <p className="text-zinc-500 text-xs">Boutique Clothing</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#32cd32]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold text-white">10,000+</div>
                <div className="text-white/80">Active Stores</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold text-white">$50M+</div>
                <div className="text-white/80">Sales Processed</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold text-white">99.9%</div>
                <div className="text-white/80">Uptime</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold text-white">4.9/5</div>
                <div className="text-white/80">Customer Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Start Your Success Story?
                </h2>
                <p className="mx-auto max-w-[600px] text-zinc-300 md:text-xl/relaxed">
                  Join thousands of small business owners who've transformed their businesses with Storely. Start your
                  free trial today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input type="email" placeholder="Enter your email" className="flex-1 bg-white border-zinc-300" />
                  <Button type="submit" className="bg-[#32cd32] hover:bg-[#28a428] text-white">
                    Start Free Trial
                  </Button>
                </form>
                <p className="text-xs text-zinc-400">14-day free trial • No credit card required • Cancel anytime</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <div className="flex items-center space-x-2">
          <Image
            src="/placeholder.svg?height=24&width=24"
            alt="Storely Logo"
            width={24}
            height={24}
            className="rounded"
          />
          <span className="font-semibold text-black">Storely</span>
        </div>
        <p className="text-xs text-zinc-500 sm:ml-auto">© 2024 Storely. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-zinc-500">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-zinc-500">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-zinc-500">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  )
}
