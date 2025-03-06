import React from "react";
import { Box, Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: "#222", color: "#fff" }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ borderBottom: "2px solid #e74c3c", pb: 1 }}>
              About
            </Typography>
            <Typography variant="body2">
              Olieven Kota & Grills, a place where authentic South African flavors meet quality ingredients.
              We serve the best kotas, flame-grilled meats, and classic township-style meals.
            </Typography>
          </Grid>

          {/* Menu Section */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ borderBottom: "2px solid #e74c3c", pb: 1 }}>
              Our Menu
            </Typography>
            <List dense>
              {["Kota", "Kota Extras", "Soft Drinks", "Chips", "Burger Patty"].map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ borderBottom: "2px solid #e74c3c", pb: 1 }}>
              Quick Links
            </Typography>
            <List dense>
              {[
                { path: "/how_it_works", name: "How it works" },
                { path: "/menu", name: "Menu" },
                { path: "/cart", name: "Cart" },
                { path: "/review", name: "Reviews" },
                { path: "/about", name: "About Us" },
                { path: "/faq", name: "FAQ's" },
                { path: "/services", name: "Services" },
                { path: "/contact_us", name: "Contact Us" },
              ].map((link, idx) => (
                <ListItem key={idx} disablePadding>
                  <Link to={link.path} style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItemText primary={link.name} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Get in Touch */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ borderBottom: "2px solid #e74c3c", pb: 1 }}>
              Get in Touch
            </Typography>
            <List dense>
              {["Support Center", "Feedback", "Suggestion"].map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Account Section */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ borderBottom: "2px solid #e74c3c", pb: 1 }}>
              Account
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItemText primary="Account" />
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>

      {/* Copyright Section */}
      <Box sx={{ textAlign: "center", mt: 4, py: 2, backgroundColor: "#111" }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Olieven Kota & Grills. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
