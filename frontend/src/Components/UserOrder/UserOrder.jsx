import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserOrder.scss';
import Navbar from '../Navbar/Navbar';

const UserOrder = () => {
    const [orderData, setOrderData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user order data from localStorage
        const storedOrder = localStorage.getItem('userOrdering');
        if (storedOrder) {
            setOrderData(JSON.parse(storedOrder));
        }
    }, [navigate]);

    useEffect(() => {
        if (timeLeft <= 0) return; // Stop countdown when time is up

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [timeLeft]);

    // Format time into MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!orderData) {
        return (
            <div className="user-order">
                <Navbar />
                <h2 className="section-title">No Order Found</h2>
                <p>Your order details are not available. Please start placing an order.</p>
            </div>
        );
    }

    return (
        <div className="user-order">
            <Navbar />
            <h2 className="section-title">Order Summary</h2>
            <caption>Keep your order number safe for tracking</caption>
            <div className="order-summary">
                <p><strong>Order Number:</strong> {orderData.orderNumber}</p>
                <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
                <p><strong>Collection Type:</strong> {orderData.collectionType}</p>
                <p><strong>Order Details:</strong></p>

                <ul>
                    {orderData.order.map((item, index) => (
                        <div key={index}>
                            <li style={{ color: "#ffcc00" }}>{item.category}</li>
                            <li style={{ color: "#ffcc00" }}>{item.itemName}</li>
                            <li style={{ color: "#ffcc00" }}>{item.quantity}</li>
                        </div>
                    ))}
                </ul>
            </div>
            <caption>
                Order can be canceled within <strong>{formatTime(timeLeft)}</strong>
            </caption>
            <button 
                onClick={() => navigate('/cart')} 
                className="modify-order-button"
                disabled={timeLeft <= 0} // Disable button when time runs out
            >
                {timeLeft > 0 ? "Cancel Order" : "Time Expired"}
            </button>
        </div>
    );
};

export default UserOrder;
