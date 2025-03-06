import React, { useState } from 'react';
import LandingPage from './LandingPage/LandingPage';
import { Routes, Route, useNavigate } from "react-router-dom";
import About from './About/About';
import HowItWorks from './HowItWorks/HowItWorks';
import Menu from './Menu/Menu';
import Cart from './Cart/Cart';
import Reviews from './Reviews/Reviews';
import FAQ from './FAQ/FAQ';
import OrderInformation from './OrderInformation/OrderInformation';
import PlaceAnOrder from './PlaceAnOrder/PlaceAnOrder';
import Login from './Login/Login';
import ForgotPassword from './ForgotPassword/ForgotPassword'; // Fixed typo
import GuestLogin from './GuestLogin/GuestLogin';
import Adminstrator from './Adminstrator/Adminstrator';
import OrderTracking from './Tracking/OrderTracking';

const Main = () => {
    const [cart, setCart] = useState([]);
    // const [totalPrice, setTotalPrice] = useState(0);
    const [loginTab, setLoginTab] = useState("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginUser = e => {
        e.preventDefault();
        console.log({ username, password });
        const user = {
            username, password
        };
        localStorage.setItem('user', JSON.stringify(user));
        const fetchUser = JSON.parse(localStorage.getItem('user')) || {};
        if (fetchUser) {
            alert(`User logged in successfully`);
            navigate("/administrator");
        }

        console.log({ fetchUser });
    };

    const loginTabs = ["Login", "Forgot password"];

    // Update this to allow adding the same item multiple times to the cart
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, { ...item }]);
    };

    // Handle item removal by index
    const removeItem = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    // Recalculate total price whenever the cart changes
    // useEffect(() => {
    //     const newTotal = cart.reduce(
    //         (total, item) => total + (item.price ?? 0) * (item.quantity ?? 1),
    //         0
    //     );
    //     setTotalPrice(newTotal);
    // }, [cart]);

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
                <Route path="/order-information" element={<OrderInformation cart={cart} />} />
                <Route path="/place_an_order" element={<PlaceAnOrder />} />
                <Route path="/login" element={<Login loginTabs={loginTabs} setLoginTab={setLoginTab} loginTab={loginTab} loginUser={loginUser} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />} />
                <Route path="/forgot_password" element={<ForgotPassword loginTabs={loginTabs} setLoginTab={setLoginTab} loginTab={loginTab} />} /> {/* Fixed typo */}
                <Route path="/Guest" element={<GuestLogin loginTabs={loginTabs} setLoginTab={setLoginTab} loginTab={loginTab} />} />

                {/* ///// */}
                <Route path="/administrator" element={<Adminstrator />} />
                <Route path="/order_tracking" element={<OrderTracking />} />


                
            </Routes>
        </div>
    );
};

export default Main;
