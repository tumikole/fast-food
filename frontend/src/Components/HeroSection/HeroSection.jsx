import React from "react";
// import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section flex">
      <div className="text">
        <h1 className="primary">Olieven’s Best Kotas & <br /> It's an <span>Flame-Grilled Goodness!</span></h1>
        <p className="tertiary">Satisfy Your Kasi Cravings!</p>
        <a href="#menu" className="btn">Explore Menu</a>
      </div>
      <div className="visual">
        <img src="https://raw.githubusercontent.com/programmercloud/foodlover/main/img/home-banner.png" alt="Food Banner" />
      </div>
    </section>
  );
};

export default HeroSection;