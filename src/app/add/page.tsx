'use client';

import { useRouter } from 'next/navigation';
import AnimeForm from '@/components/AnimeForm';
import { createAnime } from '@/lib/api';
import { Container, Typography, Paper } from '@mui/material';

export default function AddAnimePage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await createAnime(data);
    router.push('/anime');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Add New Anime
        </Typography>
        <AnimeForm onSubmit={handleCreate} />
      </Paper>
    </Container>
  );
}
