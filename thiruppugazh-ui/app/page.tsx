'use client';

import React, { useEffect, useRef, useState } from 'react';
import { fetchSongs, fetchPlaces } from '@/lib/api';
import { SongSummary, PlaceMapping } from '@/lib/types';
import Header from './components/Header';
import Sidebar, { TabType } from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import SongsSearch from './components/SongsSearch';
import PlacesDirectory from './components/PlacesDirectory';
import PlacesMap from './components/PlacesMap';
import SongModal from './components/SongModal';

const FONT_SIZES = [14, 16, 18, 20, 22];
const DEFAULT_FONT_SIZE = 16;

type Filters = {
  q: string;
  place: string;
  raga: string;
  thala: string;
  chandam: string;
  category: string;
  language: string;
  composer: string;
  number: string;
};

const initialFilters: Filters = {
  q: '',
  place: '',
  raga: '',
  thala: '',
  chandam: '',
  category: '',
  language: '',
  composer: '',
  number: '',
};

export default function LandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const songsSearchRef = useRef<HTMLDivElement | null>(null);

  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, [fontSize]);

  const handleIncreaseFontSize = () => {
    setFontSize((prev) => {
      const idx = FONT_SIZES.indexOf(prev);
      return idx < FONT_SIZES.length - 1 ? FONT_SIZES[idx + 1] : prev;
    });
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prev) => {
      const idx = FONT_SIZES.indexOf(prev);
      return idx > 0 ? FONT_SIZES[idx - 1] : prev;
    });
  };

  const [songs, setSongs] = useState<SongSummary[]>([]);
  const [places, setPlaces] = useState<PlaceMapping[]>([]);
  const [totalSongs, setTotalSongs] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedSongNumber, setSelectedSongNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [placesLoading, setPlacesLoading] = useState(false);

  useEffect(() => {
    setPlacesLoading(true);
    fetchPlaces()
      .then(setPlaces)
      .catch((err) => console.error('Error loading places:', err))
      .finally(() => setPlacesLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      fetchSongs({
        q: filters.q,
        place: filters.place,
        raga: filters.raga,
        thala: filters.thala,
        chandam: filters.chandam,
        category: filters.category,
        language: filters.language,
        composer: filters.composer,
        number: filters.number,
        page,
        limit: 12,
      })
        .then((data) => {
          setSongs(data.results);
          setTotalSongs(data.total);
        })
        .catch((err) => console.error('Error fetching songs:', err))
        .finally(() => setLoading(false));
    }, filters.q ? 300 : 0);

    return () => clearTimeout(timer);
  }, [filters, page]);

  const handleGoHome = () => {
    setActiveTab('overview');
    setPage(1);
    setFilters(initialFilters);
  };

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const [searchCollapsed, setSearchCollapsed] = useState(false);

  const openSongSearch = () => {
    setActiveTab('thiruppugazh');
    setSearchCollapsed(false);
    setTimeout(() => {
      songsSearchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-stone-900 font-sans flex flex-col">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onGoHome={handleGoHome}
        fontSize={fontSize}
        onIncreaseFontSize={handleIncreaseFontSize}
        onDecreaseFontSize={handleDecreaseFontSize}
        minFontSize={FONT_SIZES[0]}
        maxFontSize={FONT_SIZES[FONT_SIZES.length - 1]}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          totalSongs={totalSongs}
          onSelectTab={setActiveTab}
          onCloseSidebar={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-8 space-y-10 overflow-x-hidden">
          {activeTab === 'overview' && (
            <div className="space-y-10 animate-fade-in">
              <HeroBanner />

              <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#660000] font-serif">
                    Search Thiruppugazh Songs
                  </h3>
                  <p className="text-sm text-stone-600 mt-1">
                    Search by song number, temple place, raga, thala, language, composer, and more.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openSongSearch}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-[#8B1A1A] text-white font-bold shadow-md hover:bg-[#660000] transition"
                >
                  🔍 Open Song Search
                </button>
              </div>
            </div>
          )}

          {activeTab === 'arunagirinathar' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b-2 border-amber-400 pb-4">
                <span className="text-xs font-bold text-[#8B1A1A] uppercase tracking-widest">
                  Saint's Divine Life
                </span>
                <h2 className="text-3xl font-extrabold text-[#660000] font-serif mt-1">
                  Saint Arunagirinathar (அருணகிரிநாதர்)
                </h2>
              </div>

              <div className="prose max-w-none text-stone-800 space-y-6 text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  <strong>Saint Arunagirinathar</strong> was a revered 15th-century poet-saint born in{' '}
                  <strong>Tiruvannamalai</strong>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'thiruppugazh' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b-2 border-amber-400 pb-4">
                <span className="text-xs font-bold text-[#8B1A1A] uppercase tracking-widest">
                  Prosody & Songs Treasury
                </span>
                <h2 className="text-3xl font-extrabold text-[#660000] font-serif mt-1">
                  Thiruppugazh Songs & Chandam Rhythms
                </h2>
              </div>

              <div className="bg-gradient-to-r from-[#FCE8C3] to-[#F5D8A0] border-2 border-[#D4AF37] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-[#660000] font-serif">Example Chandam Pattern</h3>
                <div className="bg-white/90 p-4 rounded-xl border border-amber-300 font-mono text-sm text-[#5C0000] space-y-1 font-bold shadow-xs">
                  <p>தத்தன தனதன தத்தன தனதன</p>
                  <p>தத்தன தனதன ...... தனதான</p>
                </div>
              </div>

              <div ref={songsSearchRef}>
                <SongsSearch
                  songs={songs}
                  places={places}
                  totalSongs={totalSongs}
                  page={page}
                  loading={loading}
                  filters={filters}
                  collapsed={searchCollapsed}
                  onToggleCollapsed={() => setSearchCollapsed((v) => !v)}
                  onFilterChange={updateFilter}
                  onPageChange={setPage}
                  onSelectSong={setSelectedSongNumber}
                />
              </div>
            </div>
          )}

          {activeTab === 'places' && (
            <div className="space-y-8 animate-fade-in">
              <PlacesDirectory
                places={places}
                loading={placesLoading}
                onSelectPlace={(placeName) => {
                  updateFilter('place', placeName);
                  setActiveTab('thiruppugazh');
                }}
              />
            </div>
          )}

          {activeTab === 'map' && (
            <div className="space-y-8 animate-fade-in">
              <PlacesMap places={places} loading={placesLoading} />
            </div>
          )}
        </main>
      </div>

      <SongModal songNumber={selectedSongNumber} onClose={() => setSelectedSongNumber(null)} />

      <footer className="bg-gradient-to-r from-[#F2E3C6] via-[#EAD2A8] to-[#F2E3C6] border-t-2 border-[#D4AF37] text-stone-900 py-6 mt-12 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-serif text-sm font-extrabold text-[#7A0000]">வெற்றிவேல் முருகனுக்கு அரோகரா!</p>
          <p className="text-stone-700 font-medium">Thiruppugazh Digital Treasury • Devotional Heritage Project</p>
        </div>
      </footer>
    </div>
  );
}