'use client';

import { useEffect, useState } from 'react';
import { getAllAnime } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import { Anime } from '@/types/anime';
import {
  Container,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';

type Playlist = {
  id: string;
  name: string;
  animes: Anime[];
};

export default function AnimeListPage() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    getAllAnime().then(setAnimes).catch(console.error);

    const stored = localStorage.getItem('playlists');
    if (stored) {
      try {
        const parsed: Playlist[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPlaylists(parsed);
          if (parsed.length > 0) {
            setSelectedPlaylistId(parsed[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to parse playlists:', error);
      }
    }
  }, []);

  const savePlaylists = (data: Playlist[]) => {
    localStorage.setItem('playlists', JSON.stringify(data));
    setPlaylists(data);
  };

  const handleAddToPlaylist = (anime: Anime) => {
    if (playlists.length === 0) {
      setSnackbar({
        open: true,
        message: '⚠️ Buat playlist terlebih dahulu.',
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

    if (playlist.animes.find((a) => a.id === anime.id)) {
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

    savePlaylists(updatedPlaylists);
    setSnackbar({
      open: true,
      message: `✅ ${anime.title} berhasil ditambahkan ke "${playlist.name}".`,
      severity: 'success',
    });
  };

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
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: '#333',
            textAlign: 'center',
            lineHeight: 1.3,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          🎥 Daftar Anime
        </Typography>

        {playlists.length > 0 && (
          <Box
            sx={{
              maxWidth: 300,
              mx: 'auto',
              mb: 4,
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Pilih Playlist</InputLabel>
              <Select
                value={selectedPlaylistId}
                label="Pilih Playlist"
                onChange={(e) => setSelectedPlaylistId(e.target.value)}
              >
                {playlists.map((pl) => (
                  <MenuItem key={pl.id} value={pl.id}>
                    {pl.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {animes.length === 0 ? (
          <Typography align="center" color="text.secondary">
            Loading anime...
          </Typography>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              {animes.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  onAddToPlaylist={handleAddToPlaylist}
                />
              ))}
            </Box>
          </motion.div>
        )}

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
      </Container>
    </Box>
  );
}
