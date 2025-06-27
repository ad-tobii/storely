"use client"
import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

const ModernSleekContactPage = ({ storeSettings, seller }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you. Your message has been received.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="modern-sleek-contact py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 uppercase tracking-wider" style={{ color: storeSettings.primaryTextColor }}>Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: storeSettings.secondaryTextColor }}>We're here to assist. Reach out with any questions or inquiries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-sm" style={{ backgroundColor: storeSettings.themeColor + '20' }}><MapPin size={24} style={{ color: storeSettings.themeColor }} /></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p style={{ color: storeSettings.secondaryTextColor }}>{seller.contactInfo?.address}</p>
              </div>
            </div>
             <div className="flex items-start gap-6">
              <div className="p-4 rounded-sm" style={{ backgroundColor: storeSettings.themeColor + '20' }}><Phone size={24} style={{ color: storeSettings.themeColor }} /></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p style={{ color: storeSettings.secondaryTextColor }}>{seller.contactInfo?.phone}</p>
              </div>
            </div>
             <div className="flex items-start gap-6">
              <div className="p-4 rounded-sm" style={{ backgroundColor: storeSettings.themeColor + '20' }}><Mail size={24} style={{ color: storeSettings.themeColor }} /></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p style={{ color: storeSettings.secondaryTextColor }}>{seller.contactInfo?.email}</p>
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold" style={{ color: storeSettings.primaryTextColor }}>FULL NAME</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 bg-gray-700/50 border-2 border-gray-600 focus:border-theme-color focus:outline-none rounded-sm transition-colors" style={{ "--border-theme-color": storeSettings.themeColor }} />
              </div>
              <div>
                <label className="block mb-2 font-semibold" style={{ color: storeSettings.primaryTextColor }}>EMAIL ADDRESS</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-3 bg-gray-700/50 border-2 border-gray-600 focus:border-theme-color focus:outline-none rounded-sm transition-colors" style={{ "--border-theme-color": storeSettings.themeColor }}/>
              </div>
              <div>
                <label className="block mb-2 font-semibold" style={{ color: storeSettings.primaryTextColor }}>MESSAGE</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full p-3 bg-gray-700/50 border-2 border-gray-600 focus:border-theme-color focus:outline-none rounded-sm transition-colors resize-none" style={{ "--border-theme-color": storeSettings.themeColor }} ></textarea>
              </div>
              <button type="submit" className="w-full py-4 px-8 font-semibold rounded-sm text-white transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: storeSettings.themeColor }}>
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernSleekContactPage