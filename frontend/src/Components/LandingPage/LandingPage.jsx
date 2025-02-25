import React from "react";
import Navbar from "../Navbar/Navbar";
import HeroSection from "../HeroSection/HeroSection";
import HowItWorks from "../HowItWorks/HowItWorks";
import About from "../About/About";
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