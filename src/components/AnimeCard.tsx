'use client';

import { Anime } from '@/types/anime';
import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Link from 'next/link';

type AnimeCardProps = {
  anime: Anime;
  onAddToPlaylist?: (anime: Anime) => void;
};

export default function AnimeCard({ anime, onAddToPlaylist }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`} passHref>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        style={{ width: '100%', cursor: 'pointer' }} // <-- FIX: gunakan 100% agar responsif
      >
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            overflow: 'hidden',
            bgcolor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <img
              src={anime.image}
              alt={anime.title}
              style={{
                width: '100%',
                aspectRatio: '2/3', // FIX: responsif proporsional
                objectFit: 'cover',
              }}
            />

            <Chip
              label="TV"
              size="small"
              color="primary"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                fontSize: 10,
                height: 20,
              }}
            />

            {onAddToPlaylist && (
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  onAddToPlaylist(anime);
                }}
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  bgcolor: 'rgba(255,255,255,0.85)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
                }}
                size="small"
              >
                <PlaylistAddIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <CardContent sx={{ p: 1, flexGrow: 1 }}>
            <Typography
              variant="body2"
              fontWeight="bold"
              noWrap
              align="center"
            >
              {anime.title}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              align="center"
            >
              {anime.genre}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 0.5,
                gap: 0.5,
              }}
            >
              <StarIcon fontSize="inherit" color="warning" />
              <Typography variant="caption">{anime.rating}</Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
