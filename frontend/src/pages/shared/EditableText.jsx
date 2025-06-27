"use client"

import { useState, useRef, useEffect } from "react"
import useMultiTemplateStore from "../../../store/useMultiTemplateStore"

const EditableText = ({
  settingKey,
  editMode = false,
  sellerId,
  storeSettings,
  className = "",
  multiline = false,
  placeholder = "Click to edit...",
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState("")
  const inputRef = useRef(null)
  const { updateSetting } = useMultiTemplateStore()

  // Get text value from settings
  useEffect(() => {
    const textValue = storeSettings?.[settingKey] || placeholder
    setValue(textValue)
  }, [storeSettings, settingKey, placeholder])

  const handleClick = () => {
    if (editMode) {
      setIsEditing(true)
    }
  }

  const handleBlur = async () => {
    setIsEditing(false)
    if (editMode && value !== (storeSettings?.[settingKey] || placeholder)) {
      console.log("Updating text for key:", settingKey, "with value:", value)
      await updateSetting(settingKey, value)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault()
      handleBlur()
    }
    if (e.key === "Escape") {
      setValue(storeSettings?.[settingKey] || placeholder)
      setIsEditing(false)
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  if (isEditing && editMode) {
    const InputComponent = multiline ? "textarea" : "input"
    return (
      <InputComponent
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-transparent border-2 border-blue-500 rounded px-2 py-1 outline-none resize-none ${className}`}
        rows={multiline ? 3 : undefined}
      />
    )
  }

  return (
    <span
      onClick={handleClick}
      className={`${editMode ? "cursor-pointer hover:bg-blue-50 hover:bg-opacity-50 rounded px-1 transition-colors" : ""} ${className}`}
      title={editMode ? "Click to edit" : undefined}
    >
      {value || placeholder}
    </span>
  )
}

export default EditableText
