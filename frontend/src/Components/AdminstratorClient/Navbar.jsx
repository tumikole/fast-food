import React from 'react';
import { Grid, Box } from '@mui/material';

const Navbar = ({ clientAdministratorTabs, handleSignOutClick, setSelectedTab }) => {
  return (
    <Grid
      item
      xs={12}
      style={{
        position: 'absolute',
        bottom: '1rem',
        left: '0',
        right: '0',
        background: 'rgba(255, 255, 255, 0.1)', // semi-transparent white background
        backdropFilter: 'blur(10px)', // applies the frosted glass effect
        borderRadius: '10px', // rounded corners for a smoother glass effect
        padding: '1rem', // some padding inside the grid
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // slight shadow for depth
        // display: 'flex',
        // justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1, // make sure it's above other content
      }}
    >
      <Box display="flex" justifyContent="space-around">
        {clientAdministratorTabs.map((tab, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="center"
            onClick={() => setSelectedTab(tab.tab)}
          >
            <Box color="white">{tab.icon}</Box>
          </Box>
        ))}
        <Box onClick={handleSignOutClick}>
          <Box color="white">
            <box-icon color="white" name="upload" />
          </Box>
        </Box>
      </Box>
    </Grid>

  );
};

export default Navbar;
