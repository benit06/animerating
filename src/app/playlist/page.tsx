'use client';

import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  Container,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AnimeCard from '@/components/AnimeCard';
import { Anime } from '@/types/anime';
import { motion, AnimatePresence } from 'framer-motion';

type Playlist = {
  id: string;
  name: string;
  animes: Anime[];
};

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info',
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('playlists');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPlaylists(parsed);
        } else {
          localStorage.removeItem('playlists');
        }
      }
    } catch (error) {
      console.error('Failed to parse playlists:', error);
      localStorage.removeItem('playlists');
    }
  }, []);

  const saveToStorage = (data: Playlist[]) => {
    localStorage.setItem('playlists', JSON.stringify(data));
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const addPlaylist = () => {
    const trimmedName = newPlaylistName.trim();
    if (!trimmedName) {
      showSnackbar('⚠️ Nama playlist tidak boleh kosong.', 'error');
      return;
    }
    if (playlists.some((pl) => pl.name.toLowerCase() === trimmedName.toLowerCase())) {
      showSnackbar('⚠️ Playlist dengan nama ini sudah ada.', 'error');
      return;
    }
    const newPL: Playlist = {
      id: Date.now().toString(),
      name: trimmedName,
      animes: [],
    };
    const updated = [...playlists, newPL];
    setPlaylists(updated);
    saveToStorage(updated);
    setNewPlaylistName('');
    showSnackbar(`✅ Playlist "${trimmedName}" berhasil ditambahkan.`, 'success');
  };

  const deletePlaylist = (id: string) => {
    if (!confirm('Yakin ingin menghapus playlist ini?')) return;
    const updated = playlists.filter((p) => p.id !== id);
    setPlaylists(updated);
    saveToStorage(updated);
    showSnackbar('Playlist berhasil dihapus.', 'success');
  };

  const renamePlaylist = (id: string, newName: string) => {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      showSnackbar('⚠️ Nama playlist tidak boleh kosong.', 'error');
      return;
    }
    const updated = playlists.map((p) =>
      p.id === id ? { ...p, name: trimmedName } : p
    );
    setPlaylists(updated);
    saveToStorage(updated);
    showSnackbar('Nama playlist diperbarui.', 'success');
  };

  const removeAnimeFromPlaylist = (playlistId: string, animeId: string) => {
    const updated = playlists.map((p) =>
      p.id === playlistId ? { ...p, animes: p.animes.filter((a) => a.id !== animeId) } : p
    );
    setPlaylists(updated);
    saveToStorage(updated);
    showSnackbar('Anime dihapus dari playlist.', 'info');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 8, md: 10 },
        pb: 6,
        px: 2,
        background: 'linear-gradient(to bottom right, #ffffff, #f7f7f7)',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #007BFF, #00C6FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          🎶 Playlist Anime Kamu
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <TextField
            label="Nama Playlist Baru"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            fullWidth
            size="small"
          />
          <Button
            onClick={addPlaylist}
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ whiteSpace: 'nowrap', width: { xs: '100%', sm: 'auto' } }}
          >
            Tambah
          </Button>
        </Box>

        {playlists.length === 0 ? (
          <Typography align="center" color="text.secondary">
            Belum ada playlist. Tambahkan sekarang!
          </Typography>
        ) : (
          <Box sx={{ display: 'grid', gap: 3 }}>
            <AnimatePresence>
              {playlists.map((pl) => (
                <motion.div
                  key={pl.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card sx={{ borderRadius: 2, p: 2 }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <TextField
                          defaultValue={pl.name}
                          label="Edit Nama Playlist"
                          onBlur={(e) => renamePlaylist(pl.id, e.target.value)}
                          size="small"
                          fullWidth
                        />
                        <IconButton
                          onClick={() => deletePlaylist(pl.id)}
                          sx={{
                            bgcolor: '#f8d7da',
                            '&:hover': { bgcolor: '#f5c2c7' },
                          }}
                        >
                          <DeleteIcon sx={{ color: '#721c24' }} />
                        </IconButton>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      {pl.animes.length === 0 ? (
                        <Typography align="center" color="text.secondary">
                          Belum ada anime di playlist ini.
                        </Typography>
                      ) : (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                              xs: 'repeat(auto-fit, minmax(140px, 1fr))',
                              sm: 'repeat(auto-fit, minmax(160px, 1fr))',
                            },
                            gap: 1.5,
                          }}
                        >
                          {pl.animes.map((anime) => (
                            <Box key={anime.id} sx={{ width: '100%' }}>
                              <AnimeCard anime={anime} />
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => removeAnimeFromPlaylist(pl.id, anime.id)}
                                fullWidth
                                sx={{ mt: 1 }}
                              >
                                Hapus
                              </Button>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
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
