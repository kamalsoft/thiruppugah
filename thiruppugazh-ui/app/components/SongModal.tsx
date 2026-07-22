'use client';

import React, { useEffect, useState } from 'react';
import { SongDetail } from '@/lib/types';
import { fetchSongDetail } from '@/lib/api';

interface Props {
  songNumber: number | null;
  onClose: () => void;
}

export default function SongModal({ songNumber, onClose }: Props) {
  const [song, setSong] = useState<SongDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (songNumber) {
      setLoading(true);
      fetchSongDetail(songNumber)
        .then(setSong)
        .catch((err) => console.error("Failed to load song detail", err))
        .finally(() => setLoading(false));
    }
  }, [songNumber]);

  if (!songNumber) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF7] rounded-3xl border-2 border-[#D4AF37] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1A1A] via-[#990000] to-[#B33B00] text-amber-100 p-6 flex justify-between items-start">
          <div>
            <span className="bg-[#D4AF37] text-red-950 font-extrabold text-xs px-2.5 py-1 rounded-md">
              {song?.category_or_place || '...'}
            </span>
            <h2 className="text-2xl font-bold font-serif mt-2 text-amber-200">
              {song?.title || `பாடல் ${songNumber}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-amber-200 hover:text-white text-2xl font-bold p-1 transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="p-12 text-center text-stone-600 font-semibold">
            ஏற்றப்படுகிறது (Loading song details)...
          </div>
        ) : song ? (
          <div className="p-6 overflow-y-auto space-y-6">

            {/* Metadata Bar */}
            <div className="grid grid-cols-3 gap-3 bg-[#F7EEDD] p-3 rounded-xl text-xs text-stone-800 border border-amber-300/60 font-semibold">
              <div><span className="text-[#8B1A1A]">ராகம்:</span> {song.raga || 'பொது'}</div>
              <div><span className="text-[#8B1A1A]">தாளம்:</span> {song.thala || 'பொது'}</div>
              <div><span className="text-[#8B1A1A]">எண்:</span> {song.song_number}</div>
            </div>

            {/* Chandam Rhythm Box */}
            {song.chandam && song.chandam.length > 0 && (
              <div className="bg-[#FAF0D7] border-l-4 border-[#8B1A1A] p-4 rounded-r-xl border-y border-r border-amber-300">
                <h4 className="text-xs font-bold text-[#7A0000] uppercase tracking-wider mb-2">
                  🥁 சந்த நடை (Chandam Rhythm)
                </h4>
                <div className="space-y-1 font-mono text-sm text-[#5C0000] font-bold">
                  {song.chandam.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Lyrics */}
            <div>
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
                பாடல் வரிகள் (Lyrics)
              </h4>
              <div className="space-y-2 text-stone-900 leading-relaxed font-sans text-base sm:text-lg font-medium">
                {song.lyrics.map((line, idx) => (
                  <p key={idx} className="hover:bg-amber-100/50 p-1 rounded transition">
                    {line}
                  </p>
                ))}
              </div>
            </div>

          </div>
        ) : null}

        {/* Footer */}
        <div className="p-4 border-t border-amber-200 bg-[#F7EEDD] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#8B1A1A] text-amber-100 text-sm font-bold rounded-xl hover:bg-[#701212] transition"
          >
            மூடு (Close)
          </button>
        </div>

      </div>
    </div>
  );
}