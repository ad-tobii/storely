"use client"

import EditableText from "../../shared/EditableText"

const PlayfulColorfulEditableText = ({ sellerId, storeSettings, settingKey, ...props }) => {
  return (
    <EditableText
      {...props}
      sellerId={sellerId}
      storeSettings={storeSettings}
      settingKey={settingKey}
      className={`font-sans ${props.className || ""}`}
    />
  )
}

export default PlayfulColorfulEditableText
