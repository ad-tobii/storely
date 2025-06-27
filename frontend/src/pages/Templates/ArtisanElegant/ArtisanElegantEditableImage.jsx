"use client"

import EditableImage from "../../shared/EditableImage"

const ArtisanElegantEditableImage = ({ sellerId, storeSettings, ...props }) => {
  return (
    <EditableImage
      {...props}
      sellerId={sellerId}
      storeSettings={storeSettings}
      className={`sepia-[0.1] ${props.className || ""}`}
    />
  )
}

export default ArtisanElegantEditableImage
