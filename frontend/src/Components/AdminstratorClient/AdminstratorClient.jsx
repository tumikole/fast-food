import React from 'react';
import {
    Grid,
} from "@mui/material";
import Navbar from './Navbar';
import HeroComponent from './HeroComponent';

// Import necessary icons from MUI
import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';

const AdminstratorClient = ({ userDetails }) => {

    const clientAdministratorTabs = [
        { tab: "Home", icon: <HomeIcon /> },
        { tab: "Menu", icon: <FastfoodIcon /> },
        { tab: "Messages", icon: <MessageIcon /> },
        { tab: "Notifications", icon: <NotificationsIcon /> },
        { tab: "Order Now", icon: <ShoppingCartIcon /> },
        { tab: "Settings", icon: <SettingsIcon /> },
    ];

    return (
        <Grid>
            {/* <Grid item xs={12}>
                <Box className="user-profile" display="flex" flexDirection="column" alignItems="center">
                    <Avatar sx={{ width: 60, height: 60, marginBottom: 2 }} />
                    <Typography variant="h6" color="#1976d2" className="welcome-text" align="center">
                        Hi {userDetails.username}, <br />Welcome to Kota and Grills client portal!
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box className="user-profile" mt={2} textAlign="center">
                    <Typography variant="h6" color="#1976d2" className="welcome-text">
                        Role: {userDetails && userDetails.role}
                    </Typography>
                </Box>
            </Grid> */}

            <Grid item xs={12}>
                <HeroComponent />
            </Grid>

            {/* <Grid item xs={12}>
                <MenuComponent />
            </Grid> */}


            {/* Render tabs with icons */}
            <Navbar clientAdministratorTabs={clientAdministratorTabs}/>
        </Grid>
    );
};

export default AdminstratorClient;
