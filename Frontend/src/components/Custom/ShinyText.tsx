import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
    const animationDuration = `${speed}s`;

    if (disabled) {
        return (
            <span className={`opacity-70 ${className}`}>
                {text}
            </span>
        );
    }

    return (
        <span
            className={`inline-block bg-gradient-to-r from-foreground/70 via-foreground to-foreground/70 bg-clip-text text-transparent ${className}`}
            style={{
                backgroundSize: '200% 100%',
                animation: `shine ${animationDuration} linear infinite`,
            }}
        >
            {text}
        </span>
    );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };