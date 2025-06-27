// --- START OF FILE EditableImage.jsx ---

"use client"

import { useState, useRef } from "react"
import useMultiTemplateStore from "../../../store/useMultiTemplateStore"

const EditableImage = ({
  settingKey,
  editMode = false,
  sellerId,
  storeSettings,
  className = "",
  alt = "Editable image",
  placeholder = "/placeholder.svg?height=400&width=400",
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const fileInputRef = useRef(null)
  const { uploadImage, uploading } = useMultiTemplateStore()

  // ✅ THIS NOW WORKS:
  // After a successful upload, the server returns the updated `settings` object.
  // The `useMultiTemplateStore` sets this new settings object in the state.
  // This component re-renders, and `storeSettings.images` is now an object/Map
  // that contains the new key. This line correctly finds the URL.
  const imageUrl = storeSettings?.images?.get?.(settingKey) || storeSettings?.images?.[settingKey] || placeholder

  const handleImageClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file && editMode) {
      // This calls the frontend store, which in turn calls the (now fixed) backend route.
      await uploadImage(file, settingKey)
    }
  }

  return (
    <div
      className={`relative ${editMode ? "cursor-pointer" : ""} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleImageClick}
    >
      <img
        src={imageUrl} // This will now correctly update
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-200 ${
          editMode && isHovered ? "opacity-80" : ""
        } ${className}`}
      />

      {editMode && (
        <>
          {(isHovered || uploading) && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200">
              {uploading ? (
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <span className="text-sm">Uploading...</span>
                </div>
              ) : (
                <div className="text-white text-center">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm">Click to upload</span>
                </div>
              )}
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </>
      )}
    </div>
  )
}

export default EditableImage