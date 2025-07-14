'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'List', href: '/anime' },
    { text: 'Playlist', href: '/playlist' },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1100,
          backgroundColor: '#D7CCC8', // Cokelat muda
          color: '#5D4037',           // Cokelat tua untuk teks
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              userSelect: 'none',
              cursor: 'pointer',
            }}
            component={Link}
            href="/"
          >
            AnimeRate
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                href={item.href}
                sx={{ color: '#5D4037', fontWeight: 'bold' }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer dari atas */}
      <Drawer
  anchor="top"
  open={open}
  onClose={toggleDrawer(false)}
  PaperProps={{
    sx: {
      background: '#EFEBE9',
      paddingTop: 2,
    },
  }}
>
  <Slide in={open} direction="down" mountOnEnter unmountOnExit>
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon sx={{ color: '#5D4037' }} />
        </IconButton>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            href={item.href}
            onClick={toggleDrawer(false)}
            sx={{
              justifyContent: 'center',
              py: 2,
              '&:hover': {
                backgroundColor: '#D7CCC8',
              },
            }}
          >
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                align: 'center',
                fontWeight: 'bold',
                color: '#5D4037',
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  </Slide>
</Drawer>
    </>
  );
}
