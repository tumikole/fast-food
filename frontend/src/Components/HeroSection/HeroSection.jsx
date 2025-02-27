import React from "react";
import './HeroSection.scss'
import { Link } from "react-router-dom";
const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="text">
                <h1 className="primary">Olieven’s Best Kotas & It's an <span>Flame-Grilled Goodness!</span></h1>
                <p className="tertiary">Satisfy Your Kasi Cravings!</p>
                <Link to="/menu" className="btn">Explore Menu 🍽️</Link>
            </div>
            <div className="visual">
                <img src="https://tb-static.uber.com/prod/image-proc/processed_images/f270d72a3f1dd44c3bc07206db9176a4/c4114ef7f0cc2f8ee04dbb216969493e.jpeg" alt="Food Banner" />
            </div>
        </section>
    );
};

export default HeroSection;