'use client';
import React from 'react';
import { SongSummary } from '@/lib/types';

interface Props {
  song: SongSummary;
  onClick: () => void;
}

export default function SongCard({ song, onClick }: Props) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl border border-amber-100 p-5 shadow-sm hover:shadow-md hover:border-amber-400 transition cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-md text-xs">
            {song.title}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {song.category_or_place}
          </span>
        </div>

        {/* Chandam Structure Highlight */}
        {song.chandam_structure ? (
          <div className="my-3 bg-amber-50/80 border-l-4 border-amber-500 p-2.5 rounded-r text-xs font-mono text-amber-900 tracking-wide leading-relaxed">
            <span className="block font-semibold text-[10px] text-amber-700 uppercase mb-0.5">சந்தம் (Chandam Rhythm)</span>
            {song.chandam_structure}
          </div>
        ) : (
          <div className="my-3 text-xs italic text-gray-400">பொது சந்த வடிவம்</div>
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
        <span>ராகம்: <strong className="text-gray-800">{song.raga}</strong></span>
        <span>தாளம்: <strong className="text-gray-800">{song.thala}</strong></span>
      </div>
    </div>
  );
}
