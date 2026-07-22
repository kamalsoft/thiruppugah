import React from 'react';

export default function PeacockFeatherIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M32 4 C18 18 10 32 10 44 C10 54 18 60 32 60 C46 60 54 54 54 44 C54 32 46 18 32 4 Z" fill="#006644" opacity="0.85" />
            <path d="M32 14 C22 25 16 36 16 45 C16 52 22 56 32 56 C42 56 48 52 48 45 C48 36 42 25 32 14 Z" fill="#008888" />
            <circle cx="32" cy="42" r="10" fill="#003366" />
            <circle cx="32" cy="42" r="6" fill="#1E90FF" />
            <circle cx="32" cy="40" r="3" fill="#FFD700" />
        </svg>
    );
}