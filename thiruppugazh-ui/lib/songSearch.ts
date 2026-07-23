export type Song = {
  id: string;
  title?: string;
  number?: string | number;
  category?: string;
  language?: string;
  raga?: string;
  tala?: string;
  composer?: string;
  lyrics?: string;
  meaning?: string;
  tags?: string[];
  [key: string]: unknown;
};

export type SongFilters = {
  query: string;
  category: string;
  language: string;
  raga: string;
  tala: string;
  composer: string;
};

const normalize = (value: unknown) =>
  String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');

const textOf = (value: unknown): string => {
  if (Array.isArray(value)) return value.map(textOf).join(' ');
  if (value && typeof value === 'object') return JSON.stringify(value);
  return String(value ?? '');
};

const matches = (source: unknown, query: string) =>
  !query || normalize(textOf(source)).includes(normalize(query));

const uniqueValues = (songs: Song[], key: keyof Song) =>
  Array.from(
    new Set(
      songs
        .map((song) => song[key])
        .flatMap((value) => (Array.isArray(value) ? value : [value]))
        .map(normalize)
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

export function filterSongs(songs: Song[], filters: SongFilters): Song[] {
  const query = normalize(filters.query);

  return songs.filter((song) => {
    const queryMatch =
      !query ||
      matches(song.title, query) ||
      matches(song.number, query) ||
      matches(song.category, query) ||
      matches(song.language, query) ||
      matches(song.raga, query) ||
      matches(song.tala, query) ||
      matches(song.composer, query) ||
      matches(song.lyrics, query) ||
      matches(song.meaning, query) ||
      matches(song.tags, query) ||
      normalize(textOf(song)).includes(query);

    return (
      queryMatch &&
      matches(song.category, filters.category) &&
      matches(song.language, filters.language) &&
      matches(song.raga, filters.raga) &&
      matches(song.tala, filters.tala) &&
      matches(song.composer, filters.composer)
    );
  });
}

export function getFilterOptions(songs: Song[]) {
  return {
    categories: uniqueValues(songs, 'category'),
    languages: uniqueValues(songs, 'language'),
    ragas: uniqueValues(songs, 'raga'),
    talas: uniqueValues(songs, 'tala'),
    composers: uniqueValues(songs, 'composer'),
  };
}