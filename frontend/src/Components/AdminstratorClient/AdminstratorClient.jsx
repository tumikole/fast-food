import React, { useState } from 'react';
import {
    Grid, Box, Avatar, Typography
} from "@mui/material";
import Navbar from './Navbar';
import HeroComponent from './HeroComponent';
import MenuComponent from './MenuComponent';


// Import necessary icons from MUI
import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import OrderComponent from './OrderComponent';
import OrderConfirmationComponent from './OrderConfirmationComponent';

const AdminstratorClient = ({
    userDetails,
    handleSignOutClick,
    allCategoryList,
    groupedItems,
    setGroupedItems,
    allMenuItems,
    setAllMenuItems,
    setAllCategoryList,
    setActiveCategory,
    activeCategory,
    addToCart,
    cart,
    setCart
}) => {
    const [selectedTab, setSelectedTab] = useState("Home")
    const storedOrder = localStorage.getItem('userOrdering');

    const clientAdministratorTabs = [
        { tab: "Home", icon: <HomeIcon /> },
        { tab: "Menu", icon: <FastfoodIcon /> },
        { tab: "Messages", icon: <MessageIcon /> },
        { tab: "Notifications", icon: <NotificationsIcon /> },
        { tab: "Orders", icon: <ShoppingCartIcon /> },
        { tab: "Settings", icon: <SettingsIcon /> },
    ];

    return (
        <Grid>

            {
                selectedTab === "Home" && storedOrder === null &&
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Box className="user-profile" display="flex">
                            <Avatar sx={{ width: 60, height: 60, marginBottom: 2 }} />
                            <Typography variant="h6" color="#1976d2" className="welcome-text" align="left">
                                Hi {userDetails.username}, <br />Welcome to Kota and Grills customer portal!
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box className="user-profile" mt={2} textAlign="left">
                            <Typography variant="h6" color="#1976d2" textAlign="left" className="welcome-text">
                                Role: {userDetails && userDetails.role}
                            </Typography>
                        </Box>
                        <Box className="user-profile" mt={2} textAlign="left">
                            <Typography variant="h6" color="#1976d2" textAlign="left" className="welcome-text">
                                Auth: {userDetails && userDetails.auth}
                            </Typography>
                        </Box>
                    </Grid>
                    <HeroComponent setSelectedTab={setSelectedTab} />
                </Grid>
            }

            {selectedTab === "Menu" && storedOrder === null &&
                <Grid item xs={12}>
                    <MenuComponent
                        allCategoryList={allCategoryList}
                        groupedItems={groupedItems}
                        setActiveCategory={setActiveCategory}
                        activeCategory={activeCategory}
                        addToCart={addToCart}
                        cart={cart}
                        allMenuItems={allMenuItems}
                        setAllCategoryList={setAllCategoryList}
                        setGroupedItems={setGroupedItems}
                        setAllMenuItems={setAllMenuItems}
                    />
                </Grid>
            }

            {
                selectedTab === "Orders" && storedOrder === null &&
                <Grid item xs={12}>
                    <OrderComponent
                        cart={cart}
                        setCart={setCart}
                    />
                </Grid>
            }

{
                storedOrder !== null  && selectedTab &&
                <Grid item xs={12}>
                    <OrderConfirmationComponent
                    setCart={setCart}
                    />
                </Grid>
            }
            <Navbar clientAdministratorTabs={clientAdministratorTabs} handleSignOutClick={handleSignOutClick} setSelectedTab={setSelectedTab} cartLength={cart.length}

            />
        </Grid>
    );
};

export default AdminstratorClient;
