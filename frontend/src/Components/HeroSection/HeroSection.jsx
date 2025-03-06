import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import './HeroSection.scss';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Typography variant="h1" className="hero-section-main-header">
        Olieven Kota & Grills
      </Typography>
      <div className="text">
        <Typography variant="h4" className="primary">
          Olieven’s Best Kotas & It's an <span>Flame-Grilled Goodness!</span>
        </Typography>
        <Typography variant="h6" className="tertiary">
          Satisfy Your Kasi Cravings!
        </Typography>
        <Button 
          variant="contained" 
          color="warning" 
          className="explore-menu-btn" 
          component={Link} 
          to="/menu"
        >
          Explore Menu 🍽️
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
