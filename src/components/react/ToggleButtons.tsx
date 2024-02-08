import React from 'react';

export default function ToggleButtons({
    _key = "",
    selection,
    options,
    onToggle,
}: {
    _key: string;
    selection: number;
    options: [string, boolean][];
    onToggle: (indexOption: number) => void;
}) {

    // Define inline style for the container
    const containerStyle = {
        "--tw-bg-opacity": 0.5,
        "--tw-border-opacity": 0.5
    } as React.CSSProperties;

    return (
        <div className="flex flex-row overflow-x-auto rounded-xl size-full border-2 border-gray-800 gap-2 bg-gray-800" style={containerStyle}>
            {/* Map through options array and render buttons */}
            {options.map(([optionText, isEnabled], index) => (
                <button
                    key={`${_key}-${optionText}`}
                    className={`
            px-4 py-2 size-full rounded active:bg-blue-400 transition-colors
            ${isEnabled
                            ? 'aria-selected:bg-blue-500 aria-selected:text-gray-100'
                            : 'aria-selected:bg-blue-700 aria-selected:text-gray-500'}
              ${isEnabled
                            ? 'bg-gray-800 text-gray-500'
                            : 'bg-gray-950 text-gray-700'}
            `}
                    onClick={() => onToggle(index)}
                    aria-selected={selection === index}
                /* disabled={!isEnabled} */
                >
                    {optionText}
                </button>
            ))}
        </div>
    );
}
