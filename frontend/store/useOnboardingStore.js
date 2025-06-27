import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

const useOnboardingStore = create((set, get) => ({
  // State
  currentStep: 1,
  formData: {
    storeDescription: "",
    storeLogo: null,
    storeHeroImage: null,
    storeCategories: [],
    shippingDestinations: [],
    returnPolicy: "",
    shippingRates: { standard: "", express: "" },
    bankDetails: {
      bankName: "",
      accountNumber: "",
      payoutFrequency: "weekly",
    },
    storePolicy: "",
    socialLinks: { instagram: "", facebook: "" },
    contact: { email: "", phone: "" },
  },
  loading: false,
  error: null,
  uploadProgress: 0,

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  updateNestedFormData: (category, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [category]: { ...state.formData[category], ...data },
      },
    })),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  // Helper function to compress images
  compressImage: (file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(resolve, "image/jpeg", quality)
      }

      img.src = URL.createObjectURL(file)
    })
  },

  // API calls
  submitOnboarding: async () => {
    set({ loading: true, error: null, uploadProgress: 0 })

    try {
      const { formData } = get()
      const submitData = new FormData()

      console.log("Starting onboarding submission...")

      // Compress and handle file uploads
      if (formData.storeLogo) {
        console.log("Compressing store logo...")
        const compressedLogo = await get().compressImage(formData.storeLogo, 800, 0.8)
        submitData.append("storeLogo", compressedLogo, "logo.jpg")
        console.log("Logo compressed and added to form data")
      }

      if (formData.storeHeroImage) {
        console.log("Compressing hero image...")
        const compressedHero = await get().compressImage(formData.storeHeroImage, 1200, 0.8)
        submitData.append("storeHeroImage", compressedHero, "hero.jpg")
        console.log("Hero image compressed and added to form data")
      }

      // Handle other form data
      console.log("Adding form data...")
      Object.keys(formData).forEach((key) => {
        if (key !== "storeLogo" && key !== "storeHeroImage") {
          if (typeof formData[key] === "object") {
            submitData.append(key, JSON.stringify(formData[key]))
          } else {
            submitData.append(key, formData[key])
          }
        }
      })

      console.log("Sending request to server...")

      const response = await axiosInstance.post("/onboarding", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 120000, // Increase to 2 minutes
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(`Upload progress: ${progress}%`)
          set({ uploadProgress: progress })
        },
      })

      console.log("Onboarding submission successful:", response.data)
      set({ loading: false, uploadProgress: 100 })
      return response.data
    } catch (error) {
      console.error("Onboarding submission error:", error)

      let errorMessage = "Failed to submit onboarding"

      if (error.code === "ECONNABORTED") {
        errorMessage = "Upload timeout. Please try with smaller images or check your connection."
      } else if (error.code === "ECONNRESET") {
        errorMessage = "Connection lost. Please check your internet and try again."
      } else if (error.response?.status === 413) {
        errorMessage = "Files are too large. Please use smaller images."
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }

      set({
        loading: false,
        uploadProgress: 0,
        error: errorMessage,
      })
      throw error
    }
  },

  reset: () =>
    set({
      currentStep: 1,
      formData: {
        storeDescription: "",
        storeLogo: null,
        storeHeroImage: null,
        storeCategories: [],
        shippingDestinations: [],
        returnPolicy: "",
        shippingRates: { standard: "", express: "" },
        bankDetails: {
          bankName: "",
          accountNumber: "",
          payoutFrequency: "weekly",
        },
        storePolicy: "",
        socialLinks: { instagram: "", facebook: "" },
        contact: { email: "", phone: "" },
      },
      loading: false,
      error: null,
      uploadProgress: 0,
    }),
}))

export default useOnboardingStore
