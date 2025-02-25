import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home")
  return (
    <nav className="menu">
      <input type="checkbox" style={{ display: "none" }} id="check" />
      <label htmlFor="check" className="checkbtn"></label>
      <label className="logo">Olieven Kota & Grills</label>
      <ul>
        {[
          { path: "/", name: "Home", icon: "home-alt-2" },
          { path: "/about", name: "About", icon: "info-circle" },
          { path: "/how_it_works", name: "How it works", icon: "briefcase" },
          { path: "/menu", name: "Menu", icon: "food-menu" },
          { path: "/cart", name: "Cart", icon: "cart" },
          { path: "/review", name: "Reviews", icon: "low-vision" },
        ].map((item, index) => (
          <Link key={index} to={item.path}
            onClick={() => setActiveTab(item.name)}
            className={item.name === activeTab && "active"}
          >
            <li
              style={{ display: "flex", gap: "1rem" }}
            >
              <div>
                <box-icon name={item.icon} color="#ffffff"></box-icon>
              </div>
              <div>{item.name}</div>
            </li>
          </Link>
        ))}
      </ul>
      <label htmlFor="check" className="closebtn">
        <box-icon name="menu" animation="burst" color="#ffffff"></box-icon>
      </label>
    </nav>
  );
};

export default Navbar;
