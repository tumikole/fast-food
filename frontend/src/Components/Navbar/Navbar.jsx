import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Box, Button, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReviewsIcon from "@mui/icons-material/Reviews";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Link } from "react-router-dom";
import supabase from "../../Supabase/supabase.config";
import { getNotifications } from "../../Supabase/Notifications/Notifications";
import Logo from '../../Asserts/Logo.jpeg'

// Import custom icons for each time category
import AnnouncementIcon from "@mui/icons-material/Announcement";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [openModal, setOpenModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleModalToggle = () => {
    setOpenModal(!openModal);
  };

  const menuItems = [
    { path: "/", name: "Home", icon: <HomeIcon /> },
    { path: "/how_it_works", name: "How it works", icon: <WorkIcon /> },
    { path: "/menu", name: "Menu", icon: <RestaurantMenuIcon /> },
    { path: "/cart", name: "Cart", icon: <ShoppingCartIcon /> },
    { path: "/review", name: "Reviews", icon: <ReviewsIcon /> },
    { path: "/about", name: "About", icon: <InfoIcon /> },
    { path: "/order_tracking", name: "Tracking", icon: <LocalShippingIcon /> },
    { path: "/faq", name: "FAQ's", icon: <QuestionAnswerIcon /> },
  ];

  const getNotificationIcon = (timestamp) => {
    const currentTime = Date.now();
    const timeDifference = currentTime - new Date(timestamp).getTime();
    const hours = timeDifference / (1000 * 60 * 60);

    if (hours <= 6) {
      return <AnnouncementIcon sx={{ color: "#f44336" }} />;
    } else if (hours <= 12) {
      return <InfoOutlinedIcon sx={{ color: "#ff9800" }} />;
    } else if (hours <= 18) {
      return <NotificationsNoneIcon sx={{ color: "#ffeb3b" }} />;
    } else if (hours <= 24) {
      return <InfoOutlinedIcon sx={{ color: "#2196f3" }} />;
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data);
    };
    fetchNotifications();

    const notificationSubscription = supabase
      .channel('realtime:notifications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, (payload) => {
        console.log('Change received!', payload);
        fetchNotifications();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(notificationSubscription);
    };
  }, []);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#e74c3c" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems:"center", gap:"1rem" }}>
            <Typography>|</Typography>

              <img  src={Logo} alt="Logo" style={{ width: 40, height: 40, borderRadius: "50%" }}/>
              <Typography>Olieven Kota & Grills</Typography>
            </Link>
          </Typography>

          {notifications.length > 0 && (
            <div onClick={handleModalToggle} style={{ cursor: "pointer" }}>
              <Badge badgeContent={notifications.length} color="error">
                <box-icon name="bell" animation="tada" color="#ffffff"></box-icon>
              </Badge>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => {
                  setActiveTab(item.name);
                  handleDrawerToggle();
                }}
                selected={activeTab === item.name}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Modal open={openModal} onClose={handleModalToggle}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 600,
              height: "auto",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              padding: 4,
              overflow: "auto",
              position: "relative",
            }}
          >
            <Typography variant="h4" gutterBottom align="center" sx={{ color: "#333", fontWeight: "bold" }}>
              Information
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginBottom: 3 }}>
              {notifications.length} {notifications.length > 1 ? "messages" : "message"}
            </Typography>

            <Box sx={{ maxHeight: "60vh", overflowY: "auto", marginBottom: 3 }}>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      padding: 2,
                      borderRadius: 1,
                      marginBottom: 2,
                      boxShadow: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ marginRight: 2 }}>
                      {getNotificationIcon(notification.created_at)}
                    </Box>
                    <Typography variant="body1" sx={{ color: "#333", fontWeight: "500" }}>
                      {notification.note}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: "#bbb" }}>
                  No new notifications.
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Button variant="contained" color="error" onClick={handleModalToggle}>
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
