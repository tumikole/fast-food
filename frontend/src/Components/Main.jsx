import React, { useState } from 'react';
import LandingPage from './LandingPage/LandingPage';
import { Routes, Route, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
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
import { login } from '../Supabase/Login/Login'
import signUp from '../Supabase/Login/SignUp'
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';

const Main = () => {
    const [cart, setCart] = useState([]);
    // const [totalPrice, setTotalPrice] = useState(0);
    const [loginTab, setLoginTab] = useState("Login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");


    const loginTabs = ["Login", "Forgot password"];
    const userToken = JSON.parse(localStorage.getItem('sb-ccovgcyugrypthfgduxm-auth-token'));

    const navigate = useNavigate();

    const loginUser = async e => {
        e.preventDefault();
        const userData = await login(email, password);
        if (userData.session.access_token) {
            console.log({ userData })
            Swal.fire({
                title: `Hi, ${userData.user.user_metadata.username}, Welcome to Olieven Kota and Grills`,
                icon: "success",
                draggable: true
            });
            const userRole = userData.session.user.role || "user"; // assuming role info is available
            localStorage.setItem('userRole', JSON.stringify(userRole)); // Store role in localStorage
            navigate('/administrator');
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const handleAddUserSubmit = async () => {
        if (!email || !password || !username || !role) {
            Swal.fire({
                text: "Please fill in all fields.",
                icon: "question"
            });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                text: "Please enter a valid email address.",
                icon: "question"
            });
            return;
        }

        const result = await signUp(email, password, username, role);
        if (result.error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.error,
            });
        } else {
            Swal.fire({
                title: "Good job!",
                text: "User added successfully!",
                icon: "success"
            });
            // Optionally reset the form
            setUsername("");
            setEmail("");
            setPassword("");
            setRole("");
        }
    };




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
                <Route path="/login" element={<Login loginTabs={loginTabs} setLoginTab={setLoginTab} loginTab={loginTab} loginUser={loginUser} setEmail={setEmail} setPassword={setPassword} email={email} password={password} />} />
                <Route path="/forgot_password" element={<ForgotPassword loginTabs={loginTabs} setLoginTab={setLoginTab} loginTab={loginTab} />} /> {/* Fixed typo */}
                <Route path="/Guest" element={<GuestLogin loginTabs={loginTabs} setLoginTab={setLoginTab} loginTab={loginTab} />} />
                <Route path="/order_tracking" element={<OrderTracking />} />


                <Route element={<PrivateRoutes userToken={userToken} />}>
                    <Route path="/administrator" element={<Adminstrator handleAddUserSubmit={handleAddUserSubmit} setEmail={setEmail} setPassword={setPassword} email={email} password={password} username={username} setUsername={setUsername} setRole={setRole} role={role} />} />
                </Route>





            </Routes>
        </div>
    );
};

export default Main;
