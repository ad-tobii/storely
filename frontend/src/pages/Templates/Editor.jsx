// --- START OF FILE Editor.jsx ---

"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Check, Save, Palette, Eye, EyeOff, CheckCircle } from "lucide-react"
import useMultiTemplateStore from "../../../store/useMultiTemplateStore"
import { useAuthStore } from "../../../store/useAuthStore"

// Import all template apps
import ArtisanElegantApp from "./ArtisanElegant/ArtisanElegantApp"
import PlayfulColorfulApp from "./PlayfulColorful/PlayfulColorfulApp"
import ModernSleekApp from "./ModernSleek/ModernSleekApp"
import BoldMinimalistApp from "./BoldMinimalist/BoldMinimalistApp"

const Editor = () => {
  const { seller, settings, loading, fetchSellerData, updateSetting, switchTemplate, saveAllSettings } = useMultiTemplateStore()
  const { checkAuth } = useAuthStore()
  const navigate = useNavigate()

  const [showSettings, setShowSettings] = useState(false)
  const [editMode, setEditMode] = useState(true)
  const [saveStatus, setSaveStatus] = useState("") // "saving", "saved", "error", ""

  useEffect(() => {
    const init = async () => {
      const user = await checkAuth()
      if (user) fetchSellerData()
    }
    init()
  }, [])

  // Template configurations
  const templates = [
    {
      id: "ArtisanElegant",
      name: "Artisan Elegant",
      description: "Warm, handcrafted aesthetic",
      thumbnail: "https://via.placeholder.com/100x100?text=Artisan",
    },
    {
      id: "PlayfulColorful",
      name: "Playful Colorful",
      description: "Bright, joyful design",
      thumbnail: "https://via.placeholder.com/100x100?text=Playful",
    },
    {
      id: "ModernSleek",
      name: "Modern Sleek",
      description: "Dark, sophisticated look",
      thumbnail: "https://via.placeholder.com/100x100?text=Modern",
    },
    {
      id: "BoldMinimalist",
      name: "Bold Minimalist",
      description: "Clean, stark design",
      thumbnail: "https://via.placeholder.com/100x100?text=Bold",
    },
  ]

  // Handle template change
  const handleTemplateChange = async (templateId) => {
    setSaveStatus("saving")
    try {
      await switchTemplate(templateId)
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus(""), 2000)
    } catch (error) {
      console.error("Failed to switch template:", error)
      setSaveStatus("error")
      setTimeout(() => setSaveStatus(""), 2000)
    }
  }

  // Handle color change (optimistic update)
  const handleColorChange = (colorKey, value) => {
    updateSetting(colorKey, value)
  }

  // Handle explicit save button click
  const handleSaveChanges = async () => {
    setSaveStatus("saving")
    try {
      await saveAllSettings()
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus(""), 2000)
    } catch (error) {
      console.error("Failed to save settings:", error)
      setSaveStatus("error")
      setTimeout(() => setSaveStatus(""), 2000)
    }
  }

  // Handle Done button click (save and navigate)
  const handleDone = async () => {
    setSaveStatus("saving");
    try {
        await saveAllSettings();
        setSaveStatus("saved");
        setTimeout(() => {
            navigate("/seller-dashboard"); 
        }, 1000);
    } catch (error) {
        console.error("Failed to save settings before exiting:", error);
        setSaveStatus("error");
        setTimeout(() => setSaveStatus(""), 2000)
    }
  }

  // Render active template
  const renderActiveTemplate = () => {
    if (!seller || !settings) return null

    const templateProps = {
      editMode,
      storeSettings: settings,
      seller: seller,
      sellerId: seller._id,
    }

    switch (seller.template) {
      case "ArtisanElegant":
        return <ArtisanElegantApp {...templateProps} />
      case "PlayfulColorful":
        return <PlayfulColorfulApp {...templateProps} />
      case "ModernSleek":
        return <ModernSleekApp {...templateProps} />
      case "BoldMinimalist":
        return <BoldMinimalistApp {...templateProps} />
      default:
        return <ArtisanElegantApp {...templateProps} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading template editor...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="template-container">{renderActiveTemplate()}</div>
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50">
        <div className="backdrop-blur-xl bg-gradient-to-r from-gray-900/85 to-black/80 border border-gray-600/40 rounded-2xl shadow-2xl p-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex justify-center lg:justify-start w-full lg:flex-1">
              <div className="flex flex-wrap justify-center gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 focus:outline-none ${
                      seller?.template === template.id
                        ? "border-2 rounded-xl border-lime-400 ring-opacity-80 scale-105"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => handleTemplateChange(template.id)}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleTemplateChange(template.id) } }}
                  >
                    <div className="backdrop-blur-sm bg-white/15 hover:bg-white/25 rounded-xl p-2 border border-gray-500/30 transition-all duration-300">
                      <img
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg pointer-events-none"
                      />
                      <p className="text-xs text-center mt-1 font-medium text-white drop-shadow-sm pointer-events-none">
                        {template.name.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border font-medium ${ editMode ? "bg-blue-500/80 border-blue-400/50 text-white shadow-lg" : "bg-gray-800/60 hover:bg-gray-700/70 border-gray-600/40 text-white hover:border-blue-400/30" }`}
              >
                {editMode ? <EyeOff size={16} /> : <Eye size={16} />}
                {editMode ? "Preview" : "Edit"}
              </button>

              <button
                onClick={handleSaveChanges}
                disabled={saveStatus === "saving"}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border font-medium ${ saveStatus === "saved" ? "bg-lime-500/80 border-lime-400/50 text-white shadow-lg" : saveStatus === "saving" ? "bg-gray-600/60 border-gray-500/40 text-gray-300 cursor-not-allowed" : "bg-gray-800/60 hover:bg-gray-700/70 border-gray-600/40 text-white hover:border-lime-400/30" }`}
              >
                <Save size={16} className={saveStatus === "saving" ? "animate-pulse" : ""} />
                {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save"}
              </button>
              
              <button
                onClick={handleDone}
                disabled={saveStatus === "saving"}
                className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 bg-lime-500/80 hover:bg-lime-600/80 border-lime-400/50 text-white font-medium shadow-lg disabled:bg-gray-600/60 disabled:cursor-not-allowed"
              >
                <CheckCircle size={16} />
                Done
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-3 rounded-xl transition-all duration-300 backdrop-blur-sm border ${ showSettings ? "bg-lime-500/80 border-lime-400/50 text-white shadow-lg" : "bg-gray-800/60 hover:bg-gray-700/70 border-gray-600/40 text-white hover:border-lime-400/30" }`}
              >
                <Palette size={20} className={showSettings ? "rotate-90" : ""} style={{ transition: "transform 0.3s ease" }} />
              </button>
            </div>
          </div>

          <div className={`transition-all duration-500 overflow-hidden ${ showSettings ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0" }`} >
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/85 border border-gray-600/40 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-white text-lg drop-shadow-sm">Color & Style Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Color Pickers */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90 drop-shadow-sm">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={settings?.themeColor || "#000000"} onChange={(e) => handleColorChange("themeColor", e.target.value)} className="w-12 h-12 rounded-lg border-2 border-gray-500/40 cursor-pointer" />
                    <input type="text" value={settings?.themeColor || "#000000"} onChange={(e) => handleColorChange("themeColor", e.target.value)} className="flex-1 p-3 backdrop-blur-sm bg-white/15 border border-gray-500/40 rounded-lg text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90 drop-shadow-sm">Secondary Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={settings?.secondaryColor || "#FFFFFF"} onChange={(e) => handleColorChange("secondaryColor", e.target.value)} className="w-12 h-12 rounded-lg border-2 border-gray-500/40 cursor-pointer" />
                    <input type="text" value={settings?.secondaryColor || "#FFFFFF"} onChange={(e) => handleColorChange("secondaryColor", e.target.value)} className="flex-1 p-3 backdrop-blur-sm bg-white/15 border border-gray-500/40 rounded-lg text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90 drop-shadow-sm">Background Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={settings?.backgroundColor || "#FFFFFF"} onChange={(e) => handleColorChange("backgroundColor", e.target.value)} className="w-12 h-12 rounded-lg border-2 border-gray-500/40 cursor-pointer" />
                    <input type="text" value={settings?.backgroundColor || "#FFFFFF"} onChange={(e) => handleColorChange("backgroundColor", e.target.value)} className="flex-1 p-3 backdrop-blur-sm bg-white/15 border border-gray-500/40 rounded-lg text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90 drop-shadow-sm">Primary Text</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={settings?.primaryTextColor || "#000000"} onChange={(e) => handleColorChange("primaryTextColor", e.target.value)} className="w-12 h-12 rounded-lg border-2 border-gray-500/40 cursor-pointer" />
                    <input type="text" value={settings?.primaryTextColor || "#000000"} onChange={(e) => handleColorChange("primaryTextColor", e.target.value)} className="flex-1 p-3 backdrop-blur-sm bg-white/15 border border-gray-500/40 rounded-lg text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90 drop-shadow-sm">Secondary Text</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={settings?.secondaryTextColor || "#666666"} onChange={(e) => handleColorChange("secondaryTextColor", e.target.value)} className="w-12 h-12 rounded-lg border-2 border-gray-500/40 cursor-pointer" />
                    <input type="text" value={settings?.secondaryTextColor || "#666666"} onChange={(e) => handleColorChange("secondaryTextColor", e.target.value)} className="flex-1 p-3 backdrop-blur-sm bg-white/15 border border-gray-500/40 rounded-lg text-white" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex items-center backdrop-blur-sm bg-lime-500/80 hover:bg-lime-600/80 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-lime-400/40 shadow-lg"
                >
                  <Check size={16} className="mr-2" /> Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor