import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home")
  return (
    <nav className="menu">
      <input type="checkbox" style={{ display: "none" }} id="check" />
      <label htmlFor="check" className="checkbtn"></label>
      <Link to="/"><label className="logo">Olieven Kota & Grills</label></Link>

      <ul>
        <li style={{
          fontWeight: "700",
          textTransform: "uppercase",
          borderBottom: "1px solid #e74c3c",
          fontSize: "2rem",
          color: "#e74c3c",
        }}>
          <p style={{
            marginLeft: "1rem",
          }}>
            Olieven Kota & Grills
          </p>
        </li>

        {[
          { path: "/", name: "Home", icon: "home-alt-2" },
          { path: "/how_it_works", name: "How it works", icon: "briefcase" },
          { path: "/menu", name: "Menu", icon: "food-menu" },
          { path: "/cart", name: "Cart", icon: "cart" },
          { path: "/review", name: "Reviews", icon: "low-vision" },
          { path: "/about", name: "About", icon: "info-circle" },
          { path: "/order_tracking", name: "Tracking", icon: "info-circle" },
          { path: "/faq", name: "FAQ's", icon: "info-circle" },

        ].map((item, index) => (
          <Link key={index} to={item.path}
            onClick={() => setActiveTab(item.name)}
            className={item.name === activeTab && "active"}
          >
            <li
              style={{ display: "flex", gap: "1rem" }}
            >
              <div>
                <box-icon name={item.icon} color="#ffcc00"></box-icon>
              </div>
              <div>{item.name}</div>
            </li>
          </Link>
        ))}
      </ul>
      <label htmlFor="check" className="closebtn">
        <box-icon name="menu" animation="burst" color="#ffcc00"></box-icon>
      </label>
    </nav>
  );
};

export default Navbar;
