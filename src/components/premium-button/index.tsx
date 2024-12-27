import React from 'react'

interface iPremiumButton {
    text: string
}
const PremiumButton = ({ text }: iPremiumButton) => {
    return (
        <div>
            <button type="button" className="text-purple-500 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
                {text}
            </button>
        </div>
    )
}

export default PremiumButton
