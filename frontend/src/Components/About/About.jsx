import React from "react";
// import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container flex">
        <div className="visual">
          <img src="https://raw.githubusercontent.com/programmercloud/foodlover/main/img/about.png" alt="About Us" />
        </div>
        <div className="text">
          <h2 className="primary">About Our Restaurant</h2>
          <p>We provide impeccable service, quality delicious foods...</p>
          <a href="#menu" className="btn">Explore Menu</a>
        </div>
      </div>
    </section>
  );
};

export default About;
