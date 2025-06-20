// --- START OF FILE PlayfulColorfulContactPage.jsx ---

"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Heart } from "lucide-react"

const PlayfulColorfulContactPage = ({ storeSettings, seller, navigate }) => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("🎉 Thank you for your colorful message! We'll get back to you super soon! 🌈")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="playful-colorful-contact py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Heart size={48} style={{ color: storeSettings.themeColor }} />
          </div>
          <h1 className="text-5xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
            💌 Let's Chat! 💌
          </h1>
          <p className="max-w-3xl mx-auto text-xl" style={{ color: storeSettings.secondaryTextColor }}>
            We absolutely LOVE hearing from you! Drop us a colorful message and we'll get back to you faster than you can say 'rainbow'! 🌈✨
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
              🎨 Send Us a Colorful Message
            </h2>
            <div className="p-8 rounded-2xl shadow-2xl" style={{ background: `linear-gradient(135deg, ${storeSettings.themeColor}10, ${storeSettings.secondaryColor}10)` }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-bold text-lg" style={{ color: storeSettings.primaryTextColor }}>Your Name ✨</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-full border-2 focus:outline-none focus:ring-4 font-medium" style={{ borderColor: storeSettings.themeColor, backgroundColor: "white", color: storeSettings.primaryTextColor }} placeholder="What should we call you?" />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-lg" style={{ color: storeSettings.primaryTextColor }}>Email Address 📧</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-full border-2 focus:outline-none focus:ring-4 font-medium" style={{ borderColor: storeSettings.secondaryColor, backgroundColor: "white", color: storeSettings.primaryTextColor }} placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-bold text-lg" style={{ color: storeSettings.primaryTextColor }}>Your Colorful Message 🌈</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-4 resize-vertical font-medium" style={{ borderColor: storeSettings.secondaryColor, backgroundColor: "white", color: storeSettings.primaryTextColor }} placeholder="Tell us everything! We love long, colorful stories! ✨"></textarea>
                </div>
                <button type="submit" className="w-full px-8 py-4 rounded-full text-white font-bold text-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg" style={{ background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})` }}>
                  <Send size={20} className="mr-2" />
                  Send My Colorful Message! 🚀
                </button>
              </form>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
              🌟 How to Find Us
            </h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-16 h-16 flex items-center justify-center rounded-full mr-4 flex-shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})` }}>
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: storeSettings.primaryTextColor }}>🏠 Visit Our Colorful Studio</h3>
                  <p style={{ color: storeSettings.secondaryTextColor }}>{seller.contactInfo?.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-16 h-16 flex items-center justify-center rounded-full mr-4 flex-shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${storeSettings.secondaryColor}, ${storeSettings.themeColor})` }}>
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: storeSettings.primaryTextColor }}>📞 Give Us a Ring</h3>
                  <p style={{ color: storeSettings.secondaryTextColor }}>{seller.contactInfo?.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-16 h-16 flex items-center justify-center rounded-full mr-4 flex-shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})` }}>
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: storeSettings.primaryTextColor }}>✉️ Send Us an Email</h3>
                  <p style={{ color: storeSettings.secondaryTextColor }}>{seller.contactInfo?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-24 py-16 px-8 rounded-2xl text-center"
          style={{ background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})` }}
        >
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Add Some Color to Your Life?</h2>
          <p className="text-xl mb-8 text-white opacity-90">Don't wait! Start your colorful journey today!</p>
          <button
            onClick={() => navigate("shop")}
            className="px-8 py-4 bg-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ color: storeSettings.themeColor }}
          >
            Shop Our Colorful Collection! 🛍️
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlayfulColorfulContactPage