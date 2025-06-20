// --- START OF FILE BoldMinimalistContactPage.jsx ---

"use client"

import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

const BoldMinimalistContactPage = ({ storeSettings, seller }) => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("MESSAGE SENT. WE WILL RESPOND WITHIN 24 HOURS.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="bold-minimalist-contact py-16 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-32">
          <h1 className="text-6xl font-black mb-12 uppercase tracking-widest" style={{ color: storeSettings.primaryTextColor }}>
            CONTACT
          </h1>
          <div className="w-32 h-2 bg-black mx-auto mb-12"></div>
          <p className="max-w-3xl mx-auto text-2xl font-bold uppercase tracking-wider" style={{ color: storeSettings.secondaryTextColor }}>
            DIRECT COMMUNICATION. NO UNNECESSARY WORDS. PURE INTENTION.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-4 border-black">
          <div className="bg-white p-12 border-r-4 border-black">
            <h2 className="text-3xl font-black mb-12 uppercase tracking-widest" style={{ color: storeSettings.primaryTextColor }}>
              SEND A MESSAGE
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block mb-4 text-lg font-black uppercase tracking-widest" style={{ color: storeSettings.primaryTextColor }}>NAME</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-0 py-4 bg-transparent border-0 border-b-4 border-black focus:outline-none font-bold uppercase tracking-wider" style={{ color: storeSettings.primaryTextColor }} placeholder="YOUR NAME" />
              </div>
              <div>
                <label className="block mb-4 text-lg font-black uppercase tracking-widest" style={{ color: storeSettings.primaryTextColor }}>EMAIL</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-0 py-4 bg-transparent border-0 border-b-4 border-black focus:outline-none font-bold uppercase tracking-wider" style={{ color: storeSettings.primaryTextColor }} placeholder="YOUR@EMAIL.COM" />
              </div>
              <div>
                <label className="block mb-4 text-lg font-black uppercase tracking-widest" style={{ color: storeSettings.primaryTextColor }}>MESSAGE</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full px-0 py-4 bg-transparent border-0 border-b-4 border-black focus:outline-none font-bold uppercase tracking-wider resize-vertical" style={{ color: storeSettings.primaryTextColor }} placeholder="YOUR MESSAGE..."></textarea>
              </div>
              <button type="submit" className="w-full px-8 py-6 bg-black text-white font-black text-xl uppercase tracking-widest transition-all duration-300 hover:bg-gray-800 border-4 border-black">
                SUBMIT
              </button>
            </form>
          </div>
          
          <div className="bg-black p-12">
            <h2 className="text-3xl font-black mb-12 uppercase tracking-widest text-white">
              DETAILS
            </h2>
            <div className="space-y-16">
              <div className="flex items-start">
                <div className="w-16 h-16 flex items-center justify-center bg-white mr-8 flex-shrink-0">
                  <MapPin size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-4 uppercase tracking-widest text-white">LOCATION</h3>
                  <p className="font-bold uppercase tracking-wider text-gray-300">{seller.contactInfo?.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-16 h-16 flex items-center justify-center bg-white mr-8 flex-shrink-0">
                  <Phone size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-4 uppercase tracking-widest text-white">PHONE</h3>
                  <p className="font-bold uppercase tracking-wider text-gray-300">{seller.contactInfo?.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-16 h-16 flex items-center justify-center bg-white mr-8 flex-shrink-0">
                  <Mail size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-4 uppercase tracking-widest text-white">EMAIL</h3>
                  <p className="font-bold uppercase tracking-wider text-gray-300">{seller.contactInfo?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoldMinimalistContactPage