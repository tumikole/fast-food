import React, { useEffect, useState } from 'react';
import LandingPage from './LandingPage/LandingPage';
import { Routes, Route, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import About from './About/About';
import HowItWorks from './HowItWorks/HowItWorks';
import Menu from './Menu/Menu';
import Cart from './Cart/Cart';
import Reviews from './Reviews/Reviews';
import FAQ from './FAQ/FAQ';
import PlaceAnOrder from './PlaceAnOrder/PlaceAnOrder';
import Login from './Login/Login';
import ForgotPassword from './ForgotPassword/ForgotPassword'; // Fixed typo
import GuestLogin from './GuestLogin/GuestLogin';
import Adminstrator from './Adminstrator/Adminstrator';
import OrderTracking from './Tracking/OrderTracking';
import { clientLogin, login } from '../Supabase/Login/Login'
import { signUp, clientSignUp } from '../Supabase/Login/SignUp'
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import Settings from './Settings/Settings';

const Main = () => {
    const [cart, setCart] = useState([]);
    const [loginTab, setLoginTab] = useState("Login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [userCode, setUserCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [message, setMessage] = useState({});


    const loginTabs = ["Login", "Forgot password", "Customer Login"];
    const userToken = JSON.parse(localStorage.getItem('auth-token'));
    const user = JSON.parse(localStorage.getItem('user'));


    const navigate = useNavigate();

    const loginUser = async e => {
        e.preventDefault();
        if (loginTab === "Login") {
            const userData = await login(email, password);
            try {
                if (userData) {
                    Swal.fire({
                        title: `Hi, ${userData.data.username && userData.data.username}, Welcome to Olieven Kota and Grills`,
                        icon: "success",
                        draggable: true
                    });
                    navigate('/administrator');
                    setEmail("")
                    setPassword("")
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        } else if (loginTab === "Customer Login") {
            const userData = await clientLogin(userCode);
            try {
                if (userData) {
                    Swal.fire({
                        title: `Hi, ${userData.data.username && userData.data.username}, Welcome to Olieven Kota and Grills client portal`,
                        icon: "success",
                        draggable: true
                    });
                    navigate('/administrator');
                    setEmail("")
                    setPassword("")
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        }

    };

    const handleAddUserSubmit = async () => {
        if (role !== "Customer") {
            if (!email || !password || !username) {
                Swal.fire({
                    text: "Please fill in all fields.",
                    icon: "question"
                });
                setMessage({ warning: "Please fill in all fields." })
                setTimeout(() => {
                    setMessage("")
                }, 5000);
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                setMessage({ warning: "Please enter a valid email address." })
                setTimeout(() => {
                    setMessage("")
                }, 5000);
                return;
            }

            const result = await signUp(email, password, username, role);
            if (result.error) {
                setMessage({ danger: result.message })
                setTimeout(() => {
                    setMessage("")
                }, 5000);
            } else {
                setMessage({ success: result.message })
                setUsername("");
                setEmail("");
                setPassword("");
                setRole("");
                setTimeout(() => {
                    setMessage("")
                }, 5000);
            }
        } else {
            if (!email || !userCode || !username) {
                setMessage({ warning: "Please fill in all fields." })
                setTimeout(() => {
                    setMessage("")
                }, 5000);
                return;
            }

            const result = await clientSignUp(email, userCode, username, role);
            if (result.error) {
                setMessage({ danger: "Something went wrong, try again..." })
                setTimeout(() => {
                    setMessage("")
                }, 5000);
            } else {
                setMessage({ danger: result.message })
                setTimeout(() => {
                    setMessage("")
                }, 5000);
                // Optionally reset the form
                setUsername("");
                setEmail("");
                setUserCode("");
                setRole("");
            }
        }

    };

    useEffect(() => {
        if (user && userToken) {
            navigate('/administrator')
        }
    }, [user, userToken, navigate])





    // Update this to allow adding the same item multiple times to the cart
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, { ...item }]);
    };

    // Handle item removal by index
    const removeItem = (index) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== index));
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/how_it_works" element={<HowItWorks />} />
                <Route path="/menu" element={<Menu addToCart={addToCart} cart={cart} setCart={setCart} />} />
                <Route path="/cart" element={<Cart cart={cart} removeItem={removeItem} cartLength={cart.length}/>} />
                <Route path="/review" element={<Reviews />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/place_an_order" element={
                    <PlaceAnOrder
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        name={name}
                        setName={setName}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        address={address}
                        setAddress={setAddress}
                        notes={notes}
                        setNotes={setNotes}
                        orderData={orderData}
                        setOrderData={setOrderData}
                        loading={loading}
                        setLoading={setLoading}
                        setOrderNumber={setOrderNumber}
                        orderNumber={orderNumber}
                        setCart={setCart}
                    />
                } />
                <Route path="/login" element={
                    <Login
                        loginTabs={loginTabs}
                        setLoginTab={setLoginTab}
                        loginTab={loginTab}
                        loginUser={loginUser}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        email={email}
                        password={password}
                        userCode={userCode}
                        setUserCode={setUserCode}
                    />}
                />
                <Route path="/forgot_password" element={<ForgotPassword loginTabs={loginTabs} setLoginTab={setLoginTab} loginTab={loginTab} />} /> {/* Fixed typo */}
                <Route path="/Guest" element={<GuestLogin loginTabs={loginTabs} setLoginTab={setLoginTab} loginTab={loginTab} />} />
                <Route path="/order_tracking" element={<OrderTracking orderNumber={orderNumber} setOrderNumber={setOrderNumber} />} />
                <Route path="/settings" element={<Settings />} />


                <Route element={<PrivateRoutes userToken={userToken} />}>
                    <Route path="/administrator" element={
                        <Adminstrator
                            handleAddUserSubmit={handleAddUserSubmit}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            email={email}
                            password={password}
                            username={username}
                            setUsername={setUsername}
                            setRole={setRole}
                            role={role}
                            user={user}
                            userCode={userCode}
                            setUserCode={setUserCode}
                            message={message}
                            setMessage={setMessage}
                        />
                    }
                    />
                </Route>





            </Routes>
        </div>
    );
};

export default Main;
