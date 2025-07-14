import { Anime } from '@/types/anime'

const BASE_URL = 'https://6873fc28c75558e27355d307.mockapi.io/Anime'

// ✅ Ambil semua anime dari MockAPI
export async function getAllAnime(): Promise<Anime[]> {
  const res = await fetch(BASE_URL, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Gagal mengambil daftar anime.')
  }
  return res.json()
}

// ✅ Ambil detail anime berdasarkan ID
export async function getAnimeById(id: string): Promise<Anime> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Gagal mengambil detail anime.')
  }
  return res.json()
}

// ✅ Tambah anime baru ke MockAPI
export async function addAnime(anime: Omit<Anime, 'id'>): Promise<Anime> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anime),
  })
  if (!res.ok) {
    throw new Error('Gagal menambahkan anime.')
  }
  return res.json()
}

// ✅ Hapus anime dari MockAPI
export async function deleteAnime(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Gagal menghapus anime.')
  }
}

// ✅ Update anime di MockAPI
export async function updateAnime(id: string, anime: Partial<Omit<Anime, 'id'>>): Promise<Anime> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anime),
  })
  if (!res.ok) {
    throw new Error('Gagal mengupdate anime.')
  }
  return res.json()
}
