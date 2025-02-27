import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage/LandingPage';
import { Routes, Route } from "react-router-dom";
import About from './About/About';
import HowItWorks from './HowItWorks/HowItWorks';
import Menu from './Menu/Menu';
import Cart from './Cart/Cart';
import Reviews from './Reviews/Reviews';
import FAQ from './FAQ/FAQ';
import OrderInformation from './OrderInformation/OrderInformation';
import PlaceAnOrder from './PlaceAnOrder/PlaceAnOrder';

const Main = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Update this to allow adding the same item multiple times to the cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item }]);
  };

  // Handle item removal by index
  const removeItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Recalculate total price whenever the cart changes
  useEffect(() => {
    const newTotal = cart.reduce(
      (total, item) => total + (item.price ?? 0) * (item.quantity ?? 1),
      0
    );
    setTotalPrice(newTotal);
  }, [cart]);

  console.log({ cart });
  console.log({ totalPrice });

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/how_it_works" element={<HowItWorks />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeItem={removeItem} />} />
        <Route path="/review" element={<Reviews />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/order-information" element={<OrderInformation cart={cart}/>} />
        <Route path="/place_an_order" element={<PlaceAnOrder/>} />



        
      </Routes>
    </div>
  );
};

export default Main;
