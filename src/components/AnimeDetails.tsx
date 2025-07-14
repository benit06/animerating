'use client';

import { Anime } from '@/types/anime';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Box,
} from '@mui/material';

export default function AnimeDetails({ anime }: { anime: Anime }) {
  return (
    <Card
      sx={{
        maxWidth: 500,
        width: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: 4,
      }}
    >
      <Box
        component="img"
        src={anime.image}
        alt={anime.title}
        sx={{
          width: '100%',
          height: 300,
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {anime.title}
        </Typography>
        <Chip label={anime.genre} color="primary" sx={{ mb: 1 }} />
        <Typography variant="body2" color="text.secondary" gutterBottom>
          ⭐ {anime.rating}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" color="text.primary">
          {anime.description || 'Tidak ada deskripsi.'}
        </Typography>
      </CardContent>
    </Card>
  );
}
