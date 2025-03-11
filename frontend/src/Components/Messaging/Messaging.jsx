import React from 'react';
import { Box, Typography, Avatar, IconButton, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

const Messaging = () => {
  return (
    <Box m={0} p={0} sx={{ width: '100%', backgroundColor: '#f0f0f0' }}>
      <Box display="flex" alignItems="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
        <IconButton>
          <ArrowBackIcon sx={{ color: '#fff' }} />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>CHAT</Typography>
        <IconButton>
          <SearchIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Box>

      <Box p={1} sx={{ backgroundColor: 'grey', color: '#fff' }}>
        <Typography variant="body1">FRIENDS ONLINE (31)</Typography>
        <Box display="flex" gap={1} overflow="auto" p={1}>
          {[...Array(5)].map((_, index) => (
            <Avatar
              key={index}
              src={`https://randomuser.me/api/portraits/thumb/men/${index + 10}.jpg`}
              sx={{ border: '2px solid #25D366' }}
            />
          ))}
        </Box>
      </Box>

      <Divider />

      <Box p={2}>
        <Typography variant="body1">MESSAGES (173)</Typography>
        {['Julia Bethali', 'Tom Smith', 'Sam Raymon', 'Alex Blackwood'].map((name, index) => (
          <Box key={index} display="flex" alignItems="center" gap={2} p={1} m={1} sx={{ backgroundColor: '#fff', borderRadius: '15px', border: '1px solid #ddd' }}>
            <Avatar src={`https://randomuser.me/api/portraits/thumb/men/${index + 20}.jpg`} />
            <Box flex={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">{name}</Typography>
                <Typography variant="caption">{index % 2 === 0 ? '21:45' : 'Yesterday'}</Typography>
              </Box>
              <Typography variant="body2">Message content goes here...</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Messaging;
