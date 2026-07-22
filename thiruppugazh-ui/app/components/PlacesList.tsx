'use client';

import React, { useEffect, useState } from 'react';
import { fetchPlaces } from '@/lib/api';
import { PlaceMapping } from '@/lib/types';

interface Props {
    onSelectPlace?: (placeName: string) => void;
}

export default function PlacesList({ onSelectPlace }: Props) {
    const [places, setPlaces] = useState<PlaceMapping[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        fetchPlaces()
            .then((data) => {
                setPlaces(data);
                setError(null);
            })
            .catch((err) => {
                console.error('Error loading places:', err);
                setError('தலங்களை ஏற்றுவதில் பிழை ஏற்பட்டது (Failed to fetch places data).');
            })
            .finally(() => setLoading(false));
    }, []);

    // Filter places based on search input
    const filteredPlaces = places.filter((p) =>
        p.place.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[#FFFDF7] border-2 border-[#E3C896] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            {/* Header */}
            <div className="border-b-2 border-amber-300 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                    <h3 className="text-2xl font-extrabold text-[#660000] font-serif">
                        புண்ணியத் தலங்கள் (Sacred Places Index)
                    </h3>
                    <p className="text-xs text-stone-600 font-medium mt-1">
                        Fetched live from <code className="bg-amber-100 px-1.5 py-0.5 rounded text-[#8B1A1A]">/api/places</code>
                    </p>
                </div>

                <span className="text-xs font-bold text-[#8B1A1A] bg-[#FCE8C3] px-3.5 py-1.5 rounded-full border border-amber-300 self-start sm:self-auto">
                    மொத்த தலங்கள்: {places.length}
                </span>
            </div>

            {/* Filter Input */}
            <div>
                <input
                    type="text"
                    placeholder="தலங்களின் பெயர் தேடுக (Search place name)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] text-sm font-medium"
                />
            </div>

            {/* States: Loading, Error, or Data Grid */}
            {loading ? (
                <div className="py-12 text-center text-stone-600 font-semibold space-y-2">
                    <span className="text-2xl block animate-bounce">🛕</span>
                    <p>தரவுகள் பெறப்படுகின்றன (Fetching places data from server)...</p>
                </div>
            ) : error ? (
                <div className="p-4 bg-red-100/80 border border-red-300 rounded-xl text-red-900 text-sm font-semibold text-center">
                    {error}
                </div>
            ) : filteredPlaces.length === 0 ? (
                <div className="py-8 text-center text-stone-500 text-sm font-medium">
                    தலங்கள் ஏதும் கண்டறியப்படவில்லை (No places match your search).
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                    {filteredPlaces.map((item) => (
                        <div
                            key={item.place}
                            onClick={() => onSelectPlace && onSelectPlace(item.place)}
                            className="bg-[#FFF9F0] border border-[#E3C896] hover:border-[#8B1A1A] p-4 rounded-xl shadow-2xs hover:shadow-sm transition cursor-pointer flex items-center justify-between group"
                        >
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-[#7A0000] font-serif group-hover:text-[#8B1A1A]">
                                    {item.place}
                                </h4>
                                <p className="text-[11px] text-stone-600 font-medium">
                                    பாடல்கள் எண்ணிக்கை: <strong className="text-stone-900">{item.total_songs}</strong>
                                </p>
                            </div>

                            <span className="text-xs font-bold text-[#8B1A1A] bg-[#FCE8C3] px-2.5 py-1 rounded-lg border border-amber-300/80 group-hover:bg-[#8B1A1A] group-hover:text-amber-100 transition">
                                தேர்க →
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}