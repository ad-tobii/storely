import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import { useAuthStore } from "./useAuthStore"

const useMultiTemplateStore = create((set, get) => ({
  seller: null,
  settings: null,
  loading: false,
  error: null,
  uploading: false,

  fetchSellerData: async () => {
    set({ loading: true, error: null })
    try {
      const seller = useAuthStore.getState().user
      if (!seller) throw new Error("User not authenticated for fetching seller data.");
      
      console.log("Fetching data for seller:", seller._id)

      const response = await axiosInstance.get(`/sellers/${seller._id}`)
      console.log("Fetched seller data:", response.data)

      set({
        seller: response.data.seller,
        settings: response.data.settings,
        loading: false,
      })
    } catch (error) {
      console.error("Failed to fetch seller data:", error)
      set({ error: error.message, loading: false })
    }
  },

  // ✅ CHANGED: This action now ONLY performs an optimistic update for a snappy UI.
  // The actual save to the backend happens via saveAllSettings.
  updateSetting: (key, value) => {
    set((state) => {
      const newSettings = { ...state.settings }
      if (key.includes(".")) {
        const keys = key.split(".")
        let current = newSettings
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {}
          current = current[keys[i]]
        }
        current[keys[keys.length - 1]] = value
      } else {
        newSettings[key] = value
      }
      return { settings: newSettings }
    })
  },

  // ✅ NEW: Action to save the entire settings object to the backend.
  saveAllSettings: async () => {
    const { settings } = get()
    const seller = useAuthStore.getState().user
    if (!seller || !settings) {
      const errorMsg = "Cannot save: Seller or settings are not loaded."
      set({ error: errorMsg })
      throw new Error(errorMsg)
    }

    try {
      // Exclude non-serializable or large data if needed, but for now we send all.
      const settingsToSave = { ...settings }

      console.log("Saving all settings to backend:", settingsToSave)
      const response = await axiosInstance.patch(`/sellers/${seller._id}/settings`, settingsToSave)
      
      console.log("Backend save response:", response.data)
      // Update state with the definitive version from the server
      set({ settings: response.data.settings, error: null })
      return response.data.settings
    } catch (error) {
      console.error("Failed to save all settings:", error)
      set({ error: error.message })
      throw error
    }
  },

  uploadImage: async (file, settingKey) => {
    const seller = useAuthStore.getState().user
    if (!seller || !file) return null

    set({ uploading: true })
    try {
      console.log("Uploading image for setting:", settingKey)
      const formData = new FormData()
      formData.append("image", file)
      formData.append("settingKey", settingKey)

      const response = await axiosInstance.post(`/upload/${seller._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      console.log("Upload response:", response.data)
      // Update settings with the full object from server to ensure sync
      set({ settings: response.data.settings, uploading: false })
      return response.data.imageUrl
    } catch (error) {
      console.error("Failed to upload image:", error)
      set({ uploading: false, error: error.message })
      return null
    }
  },

  switchTemplate: async (newTemplate) => {
    const seller = useAuthStore.getState().user
    if (!seller) return

    set({ loading: true, error: null })
    try {
      console.log("Switching to template:", newTemplate)
      const response = await axiosInstance.post(`/sellers/${seller._id}/switch-template`, {
        template: newTemplate,
      })
      console.log("Template switch response:", response.data)
      set({
        seller: response.data.seller,
        settings: response.data.settings,
        loading: false,
      })
    } catch (error) {
      console.error("Failed to switch template:", error)
      set({ error: error.message, loading: false })
    }
  },

  resetSettings: async () => {
    const seller = useAuthStore.getState().user
    if (!seller) return

    try {
      const response = await axiosInstance.post(`/sellers/${seller._id}/reset-settings`)
      set({ settings: response.data.settings })
    } catch (error) {
      console.error("Failed to reset settings:", error)
      set({ error: error.message })
    }
  },
}))

export default useMultiTemplateStore
