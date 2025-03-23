import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';

const HeroComponent = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(https://via.placeholder.com/150)',
        backgroundSize: 'cover',
        height: '60vh',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="h2">Olieven’s Best Kotas</Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
          Order Now
        </Button>
      </Container>
    </Box>
  );
};

export default HeroComponent;
