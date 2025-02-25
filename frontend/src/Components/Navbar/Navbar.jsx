import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="menu">
      <input type="checkbox" style={{ display: "none" }} id="check" />

      <label htmlFor="check" className="checkbtn">
        {/* <box-icon name='menu' color='#ffffff' ></box-icon> */}
      </label>
      <label className="logo">Olieven Kota & Grills</label>
      <ul>
        <li><a href="#hero-section" className="active">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#testimonial">Reviews</a></li>
      </ul>
      <label htmlFor="check" className="closebtn">
        <box-icon name='menu' animation='burst' color='#ffffff' ></box-icon>
      </label>
    </nav>
  );
};

export default Navbar;
