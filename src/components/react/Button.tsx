import React from "react"

export default function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    
    const classNameButtonReset = `
    px-4 py-2 size-fit rounded transition-color
    bg-gray-700 text-gray-300
    active:bg-blue-300 active:text-blue-800
    hover:bg-blue-500 hover:text-gray-100
    disabled:bg-gray-950 disabled:text-gray-700`

    return (
        <button
            {...props}
            className={classNameButtonReset + " " + props.className}
        >
            {props.children}
        </button>
    )
}