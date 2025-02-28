import React from "react";
import './HeroSection.scss'
import { Link } from "react-router-dom";
const HeroSection = () => {
    return (
        <section className="hero-section">
            <h1 className="hero-section-main-header">Olieven Kota & Grills</h1>
            <div className="text">
                <h1 className="primary">Olieven’s Best Kotas & It's an <span>Flame-Grilled Goodness!</span></h1>
                <p className="tertiary">Satisfy Your Kasi Cravings!</p>
                <Link to="/menu" className="btn btn-warning">Explore Menu 🍽️</Link>
            </div>
        </section>
    );
};

export default HeroSection;