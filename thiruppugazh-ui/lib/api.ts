import { API_CONFIG } from './config';
import { PaginatedResponse, SongDetail, PlaceMapping } from './types';

/**
 * Generic helper function to handle API requests and response errors
 */
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        ...API_CONFIG.HEADERS,
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error [${response.status}]: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Failed to fetch from endpoint: ${endpoint}`, error);
    throw error;
  }
}

/**
 * Fetch songs with search and filter parameters
 */
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

  if (params.q) query.append('q', params.q);
  if (params.place) query.append('place', params.place);
  if (params.raga) query.append('raga', params.raga);
  if (params.thala) query.append('thala', params.thala);
  if (params.chandam) query.append('chandam', params.chandam);

  query.append('page', (params.page || 1).toString());
  query.append('limit', (params.limit || API_CONFIG.DEFAULT_LIMIT).toString());

  return apiFetch<PaginatedResponse>(`/songs?${query.toString()}`);
}

/**
 * Fetch details and full lyrics for a single song
 */
export async function fetchSongDetail(songNumber: number): Promise<SongDetail> {
  return apiFetch<SongDetail>(`/songs/${songNumber}`);
}

/**
 * Fetch a completely random Thiruppugazh song
 */
export async function fetchRandomSong(): Promise<SongDetail> {
  return apiFetch<SongDetail>('/songs/random');
}

/**
 * Fetch all unique places/temples and their song mappings
 */
export async function fetchPlaces(): Promise<PlaceMapping[]> {
  return apiFetch<PlaceMapping[]>('/places');
}

/**
 * Fetch list of all distinct ragas
 */
export async function fetchRagas(): Promise<string[]> {
  return apiFetch<string[]>('/ragas');
}

/**
 * Fetch list of all distinct thalas
 */
export async function fetchThalas(): Promise<string[]> {
  return apiFetch<string[]>('/thalas');
}