import React from 'react'
import LandingPage from './LandingPage/LandingPage'
import { Routes, Route } from "react-router-dom";
import About from './About/About';
import HowItWorks from './HowItWorks/HowItWorks';
import Menu from './Menu/Menu';
import Cart from './Cart/Cart';


const Main = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/how_it_works" element={<HowItWorks />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />



        
      </Routes>

    </div>
  )
}

export default Main
