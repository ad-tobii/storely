"use client"

import EditableImage from "../../shared/EditableImage"

const ModernSleekEditableImage = ({ sellerId, storeSettings, ...props }) => {
  return (
    <EditableImage
      {...props}
      sellerId={sellerId}
      storeSettings={storeSettings}
      className={`contrast-125 ${props.className || ""}`}
    />
  )
}

export default ModernSleekEditableImage
