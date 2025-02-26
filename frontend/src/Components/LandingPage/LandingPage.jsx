import React from "react";
import Navbar from "../Navbar/Navbar";
import HeroSection from "../HeroSection/HeroSection";
import "./LandingPage.css";
import Footer from "../Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default LandingPage;