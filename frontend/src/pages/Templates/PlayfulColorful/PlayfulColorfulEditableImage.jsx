"use client"

import EditableImage from "../../shared/EditableImage"

const PlayfulColorfulEditableImage = ({ sellerId, storeSettings, settingKey, ...props }) => {
  return (
    <EditableImage
      {...props}
      sellerId={sellerId}
      storeSettings={storeSettings}
      settingKey={settingKey}
      className={`brightness-110 saturate-110 ${props.className || ""}`}
    />
  )
}

export default PlayfulColorfulEditableImage
