'use client';

import { Box, Button, Container, Typography, Paper } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 6, md: 12 },
        px: 2,
        background: 'linear-gradient(to bottom right, #ffffff, #e0e0e0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Paper
            elevation={4}
            sx={{
              p: { xs: 4, sm: 5 },
              borderRadius: 4,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              textAlign: 'center',
              color: '#333',
            }}
          >
            <PlayCircleFilledWhiteIcon
              sx={{
                fontSize: { xs: 60, sm: 80 },
                mb: 2,
                color: '#1976d2',
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                lineHeight: 1.2,
                fontSize: { xs: '1.8rem', sm: '2.5rem' },
              }}
            >
              Anime Rating App
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                maxWidth: 500,
                mx: 'auto',
                color: '#555',
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              🌸 Temukan dan rating anime favoritmu, buat playlist, dan bagikan rekomendasi tontonan terbaik untuk komunitasmu.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/anime')}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                borderRadius: 3,
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #0072ff, #00c6ff)',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
                },
                transition: 'all 0.3s ease',
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              🎬 Mulai Jelajahi Anime
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
