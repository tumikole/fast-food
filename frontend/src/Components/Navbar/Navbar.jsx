import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="menu">
      <input type="checkbox" style={{display: "none"}} id="check" />
      <label htmlFor="check" className="checkbtn">
        <ion-icon name="grid-outline"></ion-icon>
      </label>
      <label className="logo">Olieven Kota & Grills</label>
      <ul>
        <li><a href="#hero-section" className="active">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#testimonial">Reviews</a></li>
        {/* <li><a href="#app">Download App</a></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
