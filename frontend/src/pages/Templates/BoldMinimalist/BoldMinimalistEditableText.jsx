"use client"

import EditableText from "../../shared/EditableText"

const BoldMinimalistEditableText = (props) => {
  return <EditableText {...props} className={`font-bold uppercase tracking-wider ${props.className || ""}`} />
}

export default BoldMinimalistEditableText
