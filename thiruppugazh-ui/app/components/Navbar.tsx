'use client';
import React from 'react';

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-red-900 via-red-800 to-amber-700 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🛕</span>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">திருப்புகழ்</h1>
            <p className="text-xs text-amber-200">Thiruppugazh Digital Treasury & Chandam Index</p>
          </div>
        </div>
      </div>
    </header>
  );
}
