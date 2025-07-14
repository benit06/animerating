'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Anime } from '@/types/anime';
import AnimeDetails from '@/components/AnimeDetails';
import {
  Button,
  Container,
  CircularProgress,
  Typography,
  Box,
  Snackbar,
  Alert,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

type Playlist = {
  id: string;
  name: string;
  animes: Anime[];
};

export default function AnimeDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    if (!id) return;

    fetch(`https://6873fc28c75558e27355d307.mockapi.io/Anime/${id}`)
      .then(res => res.json())
      .then(setAnime)
      .catch(console.error)
      .finally(() => setLoading(false));

    const storedPlaylists = localStorage.getItem('playlists');
    const storedSelectedId = localStorage.getItem('selectedPlaylistId');

    if (storedPlaylists) {
      try {
        const parsed: Playlist[] = JSON.parse(storedPlaylists);
        setPlaylists(parsed);

        if (storedSelectedId && parsed.find(p => p.id === storedSelectedId)) {
          setSelectedPlaylistId(storedSelectedId);
        } else if (parsed.length > 0) {
          setSelectedPlaylistId(parsed[0].id);
        }
      } catch (e) {
        console.error('Gagal parsing playlist:', e);
      }
    }
  }, [id]);

  const handleAddToPlaylist = () => {
    if (!anime) return;

    if (!selectedPlaylistId) {
      setSnackbar({
        open: true,
        message: '⚠️ Pilih playlist terlebih dahulu.',
        severity: 'error',
      });
      return;
    }

    const playlist = playlists.find((pl) => pl.id === selectedPlaylistId);
    if (!playlist) {
      setSnackbar({
        open: true,
        message: '⚠️ Playlist tidak ditemukan.',
        severity: 'error',
      });
      return;
    }

    if (playlist.animes.some((a) => a.id === anime.id)) {
      setSnackbar({
        open: true,
        message: '⚠️ Anime sudah ada di playlist ini.',
        severity: 'error',
      });
      return;
    }

    const updatedPlaylists = playlists.map((pl) =>
      pl.id === selectedPlaylistId
        ? { ...pl, animes: [...pl.animes, anime] }
        : pl
    );

    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);
    setSnackbar({
      open: true,
      message: `✅ ${anime.title} berhasil ditambahkan ke "${playlist.name}"`,
      severity: 'success',
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #ffffff, #e0e0e0)',
        }}
      >
        <CircularProgress color="warning" />
      </Box>
    );
  }

  if (!anime) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #ffffff, #e0e0e0)',
        }}
      >
        <Typography color="error">Data anime tidak ditemukan.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: 2,
        pt: { xs: 10, md: 12 },
        pb: 6,
        background: 'linear-gradient(to bottom right, #ffffff, #e0e0e0)',
      }}
    >
      <Container
        maxWidth="md"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
      >
        {/* ✅ Dropdown di atas */}
        {playlists.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 250 }}>
            <InputLabel>Pilih Playlist</InputLabel>
            <Select
              value={selectedPlaylistId}
              label="Pilih Playlist"
              onChange={(e) => {
                const id = e.target.value;
                setSelectedPlaylistId(id);
                localStorage.setItem('selectedPlaylistId', id);
              }}
            >
              {playlists.map((pl) => (
                <MenuItem key={pl.id} value={pl.id}>
                  {pl.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Detail Card */}
        <AnimeDetails anime={anime} />

        {/* Tombol Aksi */}
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.push('/anime')}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            ← Kembali ke List
          </Button>

          <Button
            variant="contained"
            color="warning"
            onClick={handleAddToPlaylist}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Tambah ke Playlist
          </Button>
        </Stack>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
