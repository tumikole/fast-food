import React from 'react';
import {Grid, Box } from '@mui/material';

const Navbar = ({ clientAdministratorTabs }) => {
  return (
    <Grid item xs={12} style={{position:"absolute", bottom:"1rem", left:"0", right:"0"}}>
    <Box display="flex" justifyContent="space-around" mt={2}>
        {clientAdministratorTabs.map((tab, index) => (
            <Box key={index} display="flex" flexDirection="column" alignItems="center">
                <Box color="white">{tab.icon}</Box>
                {/* <Typography variant="body2" color="textSecondary">{tab.tab}</Typography> */}
            </Box>
        ))}
    </Box>
</Grid>
  );
};

export default Navbar;
