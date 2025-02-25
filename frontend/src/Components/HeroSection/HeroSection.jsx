import React from "react";
import './HeroSection.scss'
import HeroImage from '../../Asserts/d8e84e0b52f14089bbfa0fc06231b71d.webp'
const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="text">
                <h1 className="primary">Olieven’s Best Kotas & <br /> It's an <span>Flame-Grilled Goodness!</span></h1>
                <p className="tertiary">Satisfy Your Kasi Cravings!</p>
                <a href="#menu" className="btn">Explore Menu</a>
            </div>
            <div className="visual">
                <img src={HeroImage} alt="Food Banner" />
            </div>
        </section>
    );
};

export default HeroSection;