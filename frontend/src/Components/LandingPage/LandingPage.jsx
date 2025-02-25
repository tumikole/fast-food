import React from "react";
import Navbar from "../Navbar/Navbar";
import HeroSection from "../HeroSection/HeroSection";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <HowItWorks />
      <About /> */}
    </div>
  );
};

export default LandingPage;