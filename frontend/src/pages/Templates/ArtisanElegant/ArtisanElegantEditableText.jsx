"use client"

import EditableText from "../../shared/EditableText"

const ArtisanElegantEditableText = ({ sellerId, storeSettings, ...props }) => {
  return (
    <EditableText
      {...props}
      sellerId={sellerId}
      storeSettings={storeSettings}
      className={`font-serif ${props.className || ""}`}
    />
  )
}

export default ArtisanElegantEditableText
