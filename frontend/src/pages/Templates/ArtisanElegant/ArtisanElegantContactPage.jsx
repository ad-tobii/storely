// --- START OF FILE ArtisanElegantContactPage.jsx ---

"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

const ArtisanElegantContactPage = ({ storeSettings, seller }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="artisan-elegant-contact py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
            Get In Touch
          </h1>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: storeSettings.secondaryTextColor }}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
              Send Us a Message
            </h2>
            <div className="p-8 rounded-lg shadow-sm" style={{ backgroundColor: storeSettings.secondaryColor + "10" }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium" style={{ color: storeSettings.primaryTextColor }}>Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2" style={{ borderColor: storeSettings.secondaryColor, backgroundColor: "white", color: storeSettings.primaryTextColor }} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium" style={{ color: storeSettings.primaryTextColor }}>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2" style={{ borderColor: storeSettings.secondaryColor, backgroundColor: "white", color: storeSettings.primaryTextColor }} placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-medium" style={{ color: storeSettings.primaryTextColor }}>Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2" style={{ borderColor: storeSettings.secondaryColor, backgroundColor: "white", color: storeSettings.primaryTextColor }} placeholder="What's this about?" />
                </div>
                <div>
                  <label className="block mb-2 font-medium" style={{ color: storeSettings.primaryTextColor }}>Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 resize-vertical" style={{ borderColor: storeSettings.secondaryColor, backgroundColor: "white", color: storeSettings.primaryTextColor }} placeholder="Tell us how we can help you..."></textarea>
                </div>
                <button type="submit" className="w-full px-6 py-3 rounded-md text-white font-medium transition-transform duration-300 transform hover:scale-105" style={{ backgroundColor: storeSettings.themeColor }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
              Contact Information
            </h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 flex-shrink-0" style={{ backgroundColor: storeSettings.themeColor + "20" }}>
                  <MapPin size={20} style={{ color: storeSettings.themeColor }} />
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>Our Studio</h3>
                  <p style={{ color: storeSettings.secondaryTextColor }}>{seller.contactInfo?.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 flex-shrink-0" style={{ backgroundColor: storeSettings.themeColor + "20" }}>
                  <Phone size={20} style={{ color: storeSettings.themeColor }} />
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>Phone</h3>
                  <p style={{ color: storeSettings.secondaryTextColor }}>{seller.contactInfo?.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 flex-shrink-0" style={{ backgroundColor: storeSettings.themeColor + "20" }}>
                  <Mail size={20} style={{ color: storeSettings.themeColor }} />
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>Email</h3>
                  <p style={{ color: storeSettings.secondaryTextColor }}>{seller.contactInfo?.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 flex-shrink-0" style={{ backgroundColor: storeSettings.themeColor + "20" }}>
                  <Clock size={20} style={{ color: storeSettings.themeColor }} />
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>Business Hours</h3>
                  <p style={{ color: storeSettings.secondaryTextColor }}>
                    Monday - Friday: 9am - 5pm<br/>
                    Saturday: 10am - 3pm<br/>
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtisanElegantContactPage