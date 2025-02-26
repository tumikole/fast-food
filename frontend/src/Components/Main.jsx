import React, { useState } from 'react';
import LandingPage from './LandingPage/LandingPage';
import { Routes, Route } from "react-router-dom";
import About from './About/About';
import HowItWorks from './HowItWorks/HowItWorks';
import Menu from './Menu/Menu';
import Cart from './Cart/Cart';
import Reviews from './Reviews/Reviews';
import FAQ from './FAQ/FAQ';

const Main = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  console.log({cart})

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  console.log({totalPrice})
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/how_it_works" element={<HowItWorks />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeItem={removeItem}/>} />
        <Route path="/review" element={<Reviews />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </div>
  );
};

export default Main;
