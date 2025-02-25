import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="menu">
      <input type="checkbox" style={{ display: "none" }} id="check" />
      <label htmlFor="check" className="checkbtn">
      </label>
      <label className="logo">Olieven Kota & Grills</label>
      <ul>
        <Link to="/">
          <li style={{ display: "flex", gap: "1rem" }} className="active">
            <div>
              <box-icon name='home-alt-2' color='#ffffff' ></box-icon>
            </div>
            <div
            >Home
            </div>
          </li>
        </Link>
        <Link to="/about">
          <li style={{ display: "flex", gap: "1rem" }}>
            <div>
              <box-icon name='info-circle' color='#ffffff'></box-icon>
            </div>
            <div>About</div>
          </li>
        </Link>
        <Link to="/how_it_works">
          <li style={{ display: "flex", gap: "1rem" }}>
            <div>
              <box-icon name='briefcase' color='#ffffff' ></box-icon>
            </div>
            <div>How it works</div>
          </li>
        </Link>
        <Link to="/menu">
          <li style={{ display: "flex", gap: "1rem" }}>
            <div><box-icon name='food-menu' color='#ffffff' ></box-icon></div>
            <div>Menu</div>
          </li></Link>
        <Link to="/cart">
          <li style={{ display: "flex", gap: "1rem" }}>
            <div><box-icon name='cart' color='#ffffff' ></box-icon></div>
            <div>Cart</div>
          </li>
        </Link>
        <Link to="/review">
          <li style={{ display: "flex", gap: "1rem" }}>
            <div><box-icon name='low-vision' color='#ffffff' ></box-icon></div>
            <div>Reviews</div>
          </li>
        </Link>
      </ul>
      <label htmlFor="check" className="closebtn">
        <box-icon name='menu' animation='burst' color='#ffffff' ></box-icon>
      </label>
    </nav>
  );
};

export default Navbar;
