import React from 'react'

interface iBorderText{
    text: string;
}
const BorderText = ({text}: iBorderText) => {
  return (
    <div>
      <div className="inline-block px-1 border-2 border-black rounded-lg mr-2 text-black">{text}</div>
    </div>
  )
}

export default BorderText
