"use client"

import EditableImage from "../../shared/EditableImage"

const BoldMinimalistEditableImage = (props) => {
  return <EditableImage {...props} className={`grayscale contrast-150 ${props.className || ""}`} />
}

export default BoldMinimalistEditableImage
