import os

FILES = {
    "package.json": """{
  "name": "thiruppugazh-ui",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "lucide-react": "^0.263.1",
    "next": "13.4.12",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "20.4.5",
    "@types/react": "18.2.18",
    "@types/react-dom": "18.2.7",
    "autoprefixer": "10.4.14",
    "postcss": "8.4.27",
    "tailwindcss": "3.3.3",
    "typescript": "5.1.6"
  }
}
""",

    "tailwind.config.js": """/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        murugan: {
          saffron: '#FF9933',
          red: '#990000',
          gold: '#D4AF37',
          dark: '#1A0000',
        }
      }
    },
  },
  plugins: [],
}
""",

    "app/globals.css": """@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #FAFAFA;
  color: #1A1A1A;
}
""",

    "lib/types.ts": """export interface SongSummary {
  song_number: number;
  title: string;
  category_or_place: string;
  raga: string;
  thala: string;
  chandam_structure?: string;
}

export interface SongDetail extends SongSummary {
  chandam: string[];
  lyrics: string[];
  full_text: string;
}

export interface PaginatedResponse {
  total: number;
  page: number;
  limit: number;
  results: SongSummary[];
}

export interface PlaceMapping {
  place: string;
  total_songs: number;
  song_numbers: number[];
}
""",

    "lib/api.ts": """import { PaginatedResponse, SongDetail, PlaceMapping } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function fetchSongs(params: {
  q?: string;
  place?: string;
  raga?: string;
  thala?: string;
  chandam?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.append(key, value.toString());
  });

  const res = await fetch(`${API_BASE_URL}/songs?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch songs');
  return res.json();
}

export async function fetchSongDetail(songNumber: number): Promise<SongDetail> {
  const res = await fetch(`${API_BASE_URL}/songs/${songNumber}`);
  if (!res.ok) throw new Error('Failed to fetch song details');
  return res.json();
}

export async function fetchPlaces(): Promise<PlaceMapping[]> {
  const res = await fetch(`${API_BASE_URL}/places`);
  if (!res.ok) throw new Error('Failed to fetch places');
  return res.json();
}
""",

    "app/components/Navbar.tsx": """'use client';
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
""",

    "app/components/ArupadaiVeedu.tsx": """'use client';
import React from 'react';

const ARUPADAI_VEEDU = [
  { name: 'திருப்பரங்குன்றம்', label: '1. திருப்பரங்குன்றம்' },
  { name: 'திருச்செந்தூர்', label: '2. திருச்செந்தூர்' },
  { name: 'பழனி', label: '3. பழனி' },
  { name: 'சுவாமிமலை', label: '4. சுவாமிமலை' },
  { name: 'திருத்தணி', label: '5. திருத்தணி' },
  { name: 'பழமுதிர்ச்சோலை', label: '6. பழமுதிர்ச்சோலை' },
];

interface Props {
  selectedPlace: string;
  onSelectPlace: (place: string) => void;
}

export default function ArupadaiVeedu({ selectedPlace, onSelectPlace }: Props) {
  return (
    <div className="my-6">
      <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">
        அறுபடை வீடுகள் (Sacred 6 Abodes)
      </h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectPlace('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedPlace === '' 
              ? 'bg-amber-600 text-white shadow' 
              : 'bg-white border text-gray-700 hover:bg-amber-50'
          }`}
        >
          அனைத்தும் (All)
        </button>

        {ARUPADAI_VEEDU.map((abode) => (
          <button
            key={abode.name}
            onClick={() => onSelectPlace(abode.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedPlace === abode.name 
                ? 'bg-red-800 text-white shadow' 
                : 'bg-white border border-red-200 text-red-900 hover:bg-red-50'
            }`}
          >
            {abode.label}
          </button>
        ))}
      </div>
    </div>
  );
}
""",

    "app/components/SongCard.tsx": """'use client';
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
""",

    "app/components/SongModal.tsx": """'use client';
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
        .finally(() => setLoading(false));
    }
  }, [songNumber]);

  if (!songNumber) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 to-amber-800 text-white p-6 flex justify-between items-start">
          <div>
            <span className="bg-amber-400/20 text-amber-200 text-xs font-semibold px-2.5 py-1 rounded">
              {song?.category_or_place || '...' }
            </span>
            <h2 className="text-2xl font-bold mt-2">{song?.title || `பாடல் ${songNumber}`}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="p-12 text-center text-gray-500">ஏற்றப்படுகிறது (Loading lyrics)...</div>
        ) : song ? (
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-amber-50 p-3 rounded-lg text-xs text-amber-900 border border-amber-200/60">
              <div><span className="text-amber-700">ராகம்:</span> <strong>{song.raga}</strong></div>
              <div><span className="text-amber-700">தாளம்:</span> <strong>{song.thala}</strong></div>
              <div><span className="text-amber-700">எண்:</span> <strong>{song.song_number}</strong></div>
            </div>

            {/* Chandam Rhythm Box */}
            {song.chandam && song.chandam.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600 p-4 rounded-r-lg">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                  🥁 சந்த நடை (Chandam Rhythm Structure)
                </h4>
                <div className="space-y-1 font-mono text-sm text-amber-950 font-medium">
                  {song.chandam.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Lyrics */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                பாடல் வரிகள் (Lyrics)
              </h4>
              <div className="space-y-2 text-gray-900 leading-relaxed font-sans text-base sm:text-lg">
                {song.lyrics.map((line, idx) => (
                  <p key={idx} className="hover:bg-amber-50/50 p-1 rounded transition">{line}</p>
                ))}
              </div>
            </div>

          </div>
        ) : null}

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition"
          >
            மூடு (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
""",

    "app/page.tsx": """'use client';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ArupadaiVeedu from './components/ArupadaiVeedu';
import SongCard from './components/SongCard';
import SongModal from './components/SongModal';
import { fetchSongs } from '@/lib/api';
import { SongSummary } from '@/lib/types';

export default function Home() {
  const [songs, setSongs] = useState<SongSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [activeSongNumber, setActiveSongNumber] = useState<number | null>(null);

  const loadSongs = async () => {
    setLoading(true);
    try {
      const data = await fetchSongs({
        q: searchQuery,
        place: selectedPlace,
        page,
        limit: 18,
      });
      setSongs(data.results);
      setTotal(data.total);
    } catch (err) {
      console.error('Failed to load songs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, [searchQuery, selectedPlace, page]);

  return (
    <main className="min-h-screen pb-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-6">
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search lyrics, first lines, or raga (e.g. கைத்தல, நாட்டை)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full px-5 py-3.5 pl-12 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800"
          />
          <span className="absolute left-4 top-3.5 text-gray-400 text-xl">🔍</span>
        </div>

        {/* Sacred 6 Abodes Quick Filter */}
        <ArupadaiVeedu
          selectedPlace={selectedPlace}
          onSelectPlace={(place) => {
            setSelectedPlace(place);
            setPage(1);
          }}
        />

        {/* Total Results Count */}
        <div className="flex justify-between items-center my-4 text-sm text-gray-600">
          <span>மொத்த பாடல்கள்: <strong>{total}</strong></span>
          {loading && <span className="text-amber-600">தேடுகிறது...</span>}
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {songs.map((song) => (
            <SongCard
              key={song.song_number}
              song={song}
              onClick={() => setActiveSongNumber(song.song_number)}
            />
          ))}
        </div>

        {/* Pagination */}
        {total > 18 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100 text-sm font-medium"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-gray-700">Page {page}</span>
            <button
              disabled={page * 18 >= total}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100 text-sm font-medium"
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* Song Lyrics Modal */}
      <SongModal
        songNumber={activeSongNumber}
        onClose={() => setActiveSongNumber(null)}
      />
    </main>
  );
}
"""
}

def build_frontend():
    print("Creating Next.js Frontend Structure...")
    for path, content in FILES.items():
        dir_name = os.path.dirname(path)
        if dir_name:
            os.makedirs(dir_name, exist_ok=True)
            
        with open(path, "w", encoding="utf-8") as f:
            f.write(content.strip() + "\n")
        print(f" -> Created {path}")

    print("\nNext.js Frontend Files Created Successfully!")

if __name__ == "__main__":
    build_frontend()