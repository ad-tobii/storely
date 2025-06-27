"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import useOnboardingStore from "../../../store/useOnboardingStore"

const SellerOnboarding = () => {
  const navigate = useNavigate()
  const {
    currentStep,
    formData,
    loading,
    error,
    uploadProgress,
    setCurrentStep,
    updateFormData,
    updateNestedFormData,
    nextStep,
    prevStep,
    submitOnboarding,
  } = useOnboardingStore()

  const fileInputRef = useRef(null)
  const bannerInputRef = useRef(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [bannerPreview, setBannerPreview] = useState(null)

  const nigerianStates = [
    "Lagos",
    "Abuja FCT",
    "Rivers",
    "Kano",
    "Oyo",
    "Kaduna",
    "Delta",
    "Enugu",
    "Anambra",
    "Ogun",
    "Imo",
    "Akwa Ibom",
    "Edo",
    "Osun",
    "Bayelsa",
    "Abia",
    "Borno",
    "Cross River",
    "Plateau",
    "Ekiti",
  ]

  const categories = [
    { id: "fashion", name: "Fashion", icon: "👕" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "home", name: "Home & Garden", icon: "🏠" },
    { id: "beauty", name: "Beauty", icon: "💄" },
    { id: "food", name: "Food & Groceries", icon: "🍎" },
    { id: "health", name: "Health & Wellness", icon: "💊" },
    { id: "books", name: "Books & Media", icon: "📚" },
    { id: "art", name: "Art & Crafts", icon: "🎨" },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file size (2MB limit)
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      alert("File is too large. Please choose an image smaller than 2MB.")
      return
    }

    console.log(`Selected ${type}:`, {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      type: file.type,
    })

    const reader = new FileReader()
    reader.onload = (event) => {
      if (type === "logo") {
        setLogoPreview(event.target.result)
        updateFormData({ storeLogo: file })
      } else {
        setBannerPreview(event.target.result)
        updateFormData({ storeHeroImage: file })
      }
    }
    reader.readAsDataURL(file)
  }

  const toggleArrayItem = (array, item) => {
    return array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
  }

  const handleCategoryToggle = (categoryId) => {
    updateFormData({
      storeCategories: toggleArrayItem(formData.storeCategories, categoryId),
    })
  }

  const handleLocationToggle = (location) => {
    updateFormData({
      shippingDestinations: toggleArrayItem(formData.shippingDestinations, location),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Starting onboarding submission...")
    console.log("Form data:", {
      hasLogo: !!formData.storeLogo,
      hasHeroImage: !!formData.storeHeroImage,
      categoriesCount: formData.storeCategories.length,
      shippingDestinationsCount: formData.shippingDestinations.length,
    })

    try {
      await submitOnboarding()
      alert("Store setup complete! Redirecting to dashboard...")
      navigate("/editor")
    } catch (error) {
      console.error("Onboarding failed:", error)
    }
  }

  
  const FileUpload = ({ ref, preview, onFileChange, type, label, placeholder, size }) => (
    <div>
      <label className="block text-white text-sm font-semibold mb-2">{label}</label>
      <div
        onClick={() => ref.current.click()}
        className={`border-2 border-dashed rounded-lg p-4 h-40 flex flex-col items-center justify-center cursor-pointer transition-all ${
          preview ? "border-[#32cd32] bg-[#32cd32]/10" : "border-zinc-700 hover:border-zinc-600"
        }`}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview || "/placeholder.svg"}
              alt={`${type} preview`}
              className={`w-full h-full ${type === "logo" ? "object-contain" : "object-cover rounded"}`}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                if (type === "logo") {
                  setLogoPreview(null)
                  updateFormData({ storeLogo: null })
                } else {
                  setBannerPreview(null)
                  updateFormData({ storeHeroImage: null })
                }
              }}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <div className="text-[#32cd32] text-3xl mb-2">+</div>
            <p className="text-zinc-300 text-sm text-center font-medium">
              {placeholder}
              <br />
              <span className="text-zinc-400 text-xs font-medium">{size}</span>
            </p>
          </>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={(e) => onFileChange(e, type)} className="hidden" />
    </div>
  )

  const renderStepContent = () => {
    const steps = {
      1: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Store Profile</h2>
          <p className="text-zinc-300 font-medium">Tell us about your store and upload your branding assets.</p>

        
          <div className="space-y-4">
            <div>
              <label htmlFor="storeDescription" className="block text-white text-sm font-semibold mb-2">
                Store Description
              </label>
              <textarea
                id="storeDescription"
                name="storeDescription"
                value={formData.storeDescription}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-black border border-zinc-700 rounded-md px-4 py-3 text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-transparent"
                placeholder="Describe what you sell and what sets you apart..."
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                ref={fileInputRef}
                preview={logoPreview}
                onFileChange={handleFileChange}
                type="logo"
                label="Store Logo"
                placeholder="Click to upload your store logo"
                size="PNG, JPG (max 2MB)"
              />
              <FileUpload
                ref={bannerInputRef}
                preview={bannerPreview}
                onFileChange={handleFileChange}
                type="banner"
                label="Store Banner / Hero image"
                placeholder="Click to upload your store banner"
                size="PNG, JPG (max 2MB)"
              />
            </div>
          </div>
        </div>
      ),
      2: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Store Categories</h2>
          <p className="text-zinc-300 font-medium">Select all categories that apply to your products.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryToggle(category.id)}
                className={`relative rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  formData.storeCategories.includes(category.id)
                    ? "bg-[#32cd32]/20 border-2 border-[#32cd32]"
                    : "bg-black border border-zinc-700 hover:border-zinc-600"
                }`}
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span
                  className={`font-semibold text-center ${formData.storeCategories.includes(category.id) ? "text-white" : "text-zinc-300"}`}
                >
                  {category.name}
                </span>
                {formData.storeCategories.includes(category.id) && (
                  <div className="absolute top-2 right-2 bg-[#32cd32] text-black rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      3: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Shipping & Delivery</h2>
          <p className="text-zinc-300 font-medium">Set up your shipping options within Nigeria.</p>
          <div>
            <label className="block text-white text-sm font-semibold mb-3">Where do you ship to in Nigeria?</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {nigerianStates.map((state) => (
                <div
                  key={state}
                  onClick={() => handleLocationToggle(state)}
                  className={`rounded-lg px-3 py-2 cursor-pointer transition-all flex items-center ${
                    formData.shippingDestinations.includes(state)
                      ? "bg-[#32cd32]/20 border border-[#32cd32]"
                      : "bg-black border border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center mr-2 ${
                      formData.shippingDestinations.includes(state)
                        ? "bg-[#32cd32] border-[#32cd32]"
                        : "border-zinc-400"
                    }`}
                  >
                    {formData.shippingDestinations.includes(state) && (
                      <span className="text-black text-xs font-semibold">✓</span>
                    )}
                  </div>
                  <span
                    className={`text-sm ${formData.shippingDestinations.includes(state) ? "text-white font-semibold" : "text-zinc-300 font-medium"}`}
                  >
                    {state}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 text-[#32cd32] text-sm font-medium hover:text-[#32cd32]/80"
              onClick={() => updateFormData({ shippingDestinations: nigerianStates })}
            >
              Select All States
            </button>
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-3">Shipping Options & Rates</label>
            <div className="space-y-3">
              {[
                { key: "standard", label: "Standard" },
                { key: "express", label: "Express" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center">
                  <span className="w-24 text-zinc-300 font-medium">{label}:</span>
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium">
                      ₦
                    </span>
                    <input
                      type="number"
                      value={formData.shippingRates[key]}
                      onChange={(e) => updateNestedFormData("shippingRates", { [key]: e.target.value })}
                      className="w-full bg-black border border-zinc-700 rounded-md pl-8 pr-4 py-2 text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="returnPolicy" className="block text-white text-sm font-semibold mb-2">
              Return Policy
            </label>
            <textarea
              id="returnPolicy"
              name="returnPolicy"
              value={formData.returnPolicy}
              onChange={handleInputChange}
              rows="3"
              className="w-full bg-black border border-zinc-700 rounded-md px-4 py-3 text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-transparent"
              placeholder="Describe your return policy and terms..."
            />
          </div>
        </div>
      ),
      4: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Payment Setup</h2>
          <p className="text-zinc-300 font-medium">Set up how you'll receive payments from your sales.</p>
          <div className="p-4 bg-black/50 border border-zinc-700 rounded-lg mb-6">
            <div className="flex items-center text-yellow-400 mb-2">
              <span className="mr-2 font-semibold">⚠️</span>
              <h3 className="font-bold">Secure Information</h3>
            </div>
            <p className="text-zinc-300 text-sm font-medium">
              Your banking information is encrypted and securely stored. We never share this information with buyers.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { name: "bankName", label: "Bank Name", placeholder: "Enter your bank name", type: "text" },
              { name: "accountNumber", label: "Account Number", placeholder: "Enter account number", type: "text" },
            ].map(({ name, label, placeholder, type }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-white text-sm font-semibold mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData.bankDetails[name]}
                  onChange={(e) => updateNestedFormData("bankDetails", { [name]: e.target.value })}
                  className="w-full bg-black border border-zinc-700 rounded-md px-4 py-3 text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-transparent"
                  placeholder={placeholder}
                />
              </div>
            ))}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Payout Frequency</label>
              <div className="grid grid-cols-3 gap-3">
                {["weekly", "bi-weekly", "monthly"].map((option) => (
                  <div
                    key={option}
                    onClick={() => updateNestedFormData("bankDetails", { payoutFrequency: option })}
                    className={`rounded-lg px-4 py-3 cursor-pointer transition-all text-center ${
                      formData.bankDetails.payoutFrequency === option
                        ? "bg-[#32cd32] text-black"
                        : "bg-black border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    <span className="font-semibold">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      5: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Additional Settings</h2>
          <p className="text-zinc-300 font-medium">Complete your store setup with these final details.</p>
          <div>
            <label htmlFor="storePolicy" className="block text-white text-sm font-semibold mb-2">
              Store Policies
            </label>
            <textarea
              id="storePolicy"
              name="storePolicy"
              value={formData.storePolicy}
              onChange={handleInputChange}
              rows="3"
              className="w-full bg-black border border-zinc-700 rounded-md px-4 py-3 text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-transparent"
              placeholder="Describe your store policies (cancellation, returns, etc.)..."
            />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-3">Social Media Links</label>
            <div className="space-y-3">
              {[
                { key: "instagram", label: "Instagram", placeholder: "@yourusername" },
                { key: "facebook", label: "Facebook", placeholder: "facebook.com/yourpage" },
              ].map(({ key, label, placeholder }) => (
                <div key={key} className="flex items-center">
                  <span className="w-24 text-zinc-300 font-medium">{label}:</span>
                  <input
                    type="text"
                    value={formData.socialLinks[key]}
                    onChange={(e) => updateNestedFormData("socialLinks", { [key]: e.target.value })}
                    className="flex-1 bg-black border border-zinc-700 rounded-md px-4 py-2 text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-transparent"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "email", label: "Contact Email", placeholder: "contact@yourbusiness.com", type: "email" },
              { name: "phone", label: "Contact Phone", placeholder: "0800XXXXXXX", type: "tel" },
            ].map(({ name, label, placeholder, type }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-white text-sm font-semibold mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData.contact[name]}
                  onChange={(e) => updateNestedFormData("contact", { [name]: e.target.value })}
                  className="w-full bg-black border border-zinc-700 rounded-md px-4 py-3 text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:border-transparent"
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      ),
    }
    return steps[currentStep] || <div>Step not found</div>
  }

  const stepNames = ["Store Profile", "Categories", "Shipping", "Payment", "Settings"]

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {loading && (
          <div className="mb-4 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-400">Uploading your store data...</p>
              <span className="text-blue-400">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            {stepNames.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${index < currentStep ? "cursor-pointer" : ""}`}
                onClick={() => index < currentStep && setCurrentStep(index + 1)}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    index + 1 < currentStep
                      ? "bg-[#32cd32] text-white"
                      : index + 1 === currentStep
                        ? "bg-zinc-900 text-white border-2 border-[#32cd32]"
                        : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  <span className="font-semibold">{index + 1 < currentStep ? "✓" : index + 1}</span>
                </div>
                <span
                  className={`text-xs sm:text-sm hidden sm:block font-medium ${index + 1 <= currentStep ? "text-white" : "text-zinc-400"}`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-zinc-900 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#32cd32] transition-all duration-300"
              style={{ width: `${(currentStep - 1) * 25}%` }}
            />
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">
            <form onSubmit={(e) => e.preventDefault()}>
              {renderStepContent()}
              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentStep === 1
                      ? "bg-zinc-900 text-zinc-400 cursor-not-allowed"
                      : "bg-black border border-white text-white hover:bg-zinc-800"
                  }`}
                  disabled={currentStep === 1}
                >
                  Back
                </button>
                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      nextStep()
                    }}
                    className="px-6 py-3 bg-[#32cd32] text-black rounded-lg font-semibold hover:bg-[#32cd32]/80 transition-all"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      handleSubmit(e)
                    }}
                    disabled={loading}
                    className="px-6 py-3 bg-[#32cd32] text-black rounded-lg font-semibold hover:bg-[#32cd32]/80 transition-all disabled:opacity-50"
                  >
                    {loading ? "Completing Setup..." : "Complete Setup"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SellerOnboarding
