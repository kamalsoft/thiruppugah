import React from 'react';

export default function AgalVilakkuIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M32 6 C32 6 24 18 24 26 C24 31 27.5 34 32 34 C36.5 34 40 31 40 26 C40 18 32 6 32 6 Z" fill="#FF4500" />
            <path d="M32 14 C32 14 27 22 27 26 C27 29 29 31 32 31 C35 31 37 29 37 26 C37 22 32 14 32 14 Z" fill="#FFD700" />
            <path d="M12 36 C12 36 16 54 32 54 C48 54 52 36 52 36 H12 Z" fill="#C85A17" />
            <path d="M8 36 C8 34 14 33 32 33 C50 33 56 34 56 36 C56 38 50 39 32 39 C14 39 8 38 8 36 Z" fill="#A0522D" />
        </svg>
    );
}