"use client"

import EditableText from "../../shared/EditableText"

const ModernSleekEditableText = ({ sellerId, storeSettings, ...props }) => {
  return (
    <EditableText
      {...props}
      sellerId={sellerId}
      storeSettings={storeSettings}
      className={`font-light ${props.className || ""}`}
    />
  )
}

export default ModernSleekEditableText
