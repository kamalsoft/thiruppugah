'use client';

import React from 'react';
import { SongSummary, PlaceMapping } from '@/lib/types';

interface Props {
    songs: SongSummary[];
    places: PlaceMapping[];
    totalSongs: number;
    page: number;
    loading: boolean;
    searchQuery: string;
    selectedPlace: string;
    onSearchChange: (q: string) => void;
    onPlaceChange: (p: string) => void;
    onPageChange: (p: number) => void;
    onSelectSong: (num: number) => void;
}

export default function SongsSearch({
    songs,
    places,
    totalSongs,
    page,
    loading,
    searchQuery,
    selectedPlace,
    onSearchChange,
    onPlaceChange,
    onPageChange,
    onSelectSong,
}: Props) {
    return (
        <section id="search-section" className="bg-[#FFFDF7] border-2 border-[#E3C896] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b-2 border-amber-300 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                    <h3 className="text-2xl font-extrabold text-[#660000] font-serif">
                        பாடல்கள் தேடல் கருவூலம் (Thiruppugazh Songs Treasury)
                    </h3>
                    <p className="text-xs text-stone-600 font-medium">
                        Search lyrics, ragas, or filter by sacred temple abodes
                    </p>
                </div>
                <span className="text-xs font-bold text-[#8B1A1A] bg-[#FCE8C3] px-3 py-1 rounded-full border border-amber-300">
                    மொத்தம்: {totalSongs} பாடல்கள்
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Search lyrics, first line, or raga (e.g. கைத்தல, நாட்டை)..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-amber-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] font-medium text-sm"
                />

                <select
                    value={selectedPlace}
                    onChange={(e) => onPlaceChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-amber-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] font-medium text-sm"
                >
                    <option value="">அனைத்து தலங்கள் (All Sacred Places)</option>
                    {places.map((p) => (
                        <option key={p.place} value={p.place}>
                            {p.place} ({p.total_songs} பாடல்கள்)
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="py-12 text-center text-stone-600 font-medium">
                    தேடுகிறது (Fetching songs from database)...
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {songs.map((song) => (
                        <div
                            key={song.song_number}
                            onClick={() => onSelectSong(song.song_number)}
                            className="bg-[#FFFDF7] border-2 border-[#E3C896] hover:border-[#8B1A1A] p-5 rounded-2xl shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-[#8B1A1A] text-amber-100 font-extrabold text-xs px-2.5 py-1 rounded-md">
                                        {song.title}
                                    </span>
                                    <span className="text-[11px] font-semibold text-amber-900 bg-[#FCE8C3] px-2 py-0.5 rounded border border-amber-300">
                                        {song.category_or_place}
                                    </span>
                                </div>

                                {song.chandam_structure ? (
                                    <div className="my-3 bg-[#FAF0D7] border-l-4 border-[#8B1A1A] p-2.5 rounded-r text-xs font-mono text-[#5C0000] font-bold">
                                        {song.chandam_structure}
                                    </div>
                                ) : (
                                    <div className="my-3 text-xs italic text-stone-400">பொது சந்த நடை</div>
                                )}
                            </div>

                            <div className="flex justify-between items-center text-xs text-stone-600 pt-3 border-t border-amber-200/80 font-medium">
                                <span>ராகம்: <strong className="text-stone-900">{song.raga || 'பொது'}</strong></span>
                                <span>தாளம்: <strong className="text-stone-900">{song.thala || 'பொது'}</strong></span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {totalSongs > 12 && (
                <div className="flex justify-center items-center gap-4 pt-4 border-t border-amber-200">
                    <button
                        disabled={page === 1}
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                        className="px-4 py-2 border-2 border-amber-300 rounded-xl disabled:opacity-40 hover:bg-amber-100 text-xs font-bold text-stone-800 transition"
                    >
                        Previous
                    </button>
                    <span className="text-xs font-bold text-stone-700">
                        Page {page} of {Math.ceil(totalSongs / 12)}
                    </span>
                    <button
                        disabled={page * 12 >= totalSongs}
                        onClick={() => onPageChange(page + 1)}
                        className="px-4 py-2 border-2 border-amber-300 rounded-xl disabled:opacity-40 hover:bg-amber-100 text-xs font-bold text-stone-800 transition"
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
}