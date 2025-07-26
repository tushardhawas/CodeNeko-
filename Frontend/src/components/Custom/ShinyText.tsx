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
            <span className={`text-white/70 ${className}`}>
                {text}
            </span>
        );
    }

    return (
        <span
            className={`inline-block ${className}`}
            style={{
                background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.7) 60%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
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