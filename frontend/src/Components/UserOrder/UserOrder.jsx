import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserOrder.scss';
import Navbar from '../Navbar/Navbar';

const UserOrder = () => {
    const [orderData, setOrderData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user order data from localStorage
        const storedOrder = localStorage.getItem('userOrdering');
        if (storedOrder) {
            setOrderData(JSON.parse(storedOrder));
        } else {
            // If no order data is found, navigate to the PlaceAnOrder page
            navigate('/menu');
        }
    }, [navigate]);

    if (!orderData) {
        return (
            <div className="user-order">
                <Navbar />
                <h2 className="section-title">No Order Found</h2>
                <p>Your order details are not available. Please start placing an order.</p>
            </div>
        );
    }

    console.log({ order: orderData.order })

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
                    {orderData && orderData.order.map((item, index) => {
                        return (
                            <div >
                                <li style={{color:"#ffcc00"}}>{item.category}</li>
                                <li style={{color:"#ffcc00"}}>{item.itemName}</li>
                                <li style={{color:"#ffcc00"}}>{item.quantity}</li>

                                
                            </div>
                        )
                    })}
                </ul>
            </div>
            <caption>Order can be canceled within 10 minutes of ordering</caption>
            <button onClick={() => navigate('/cart')} className="modify-order-button">
                Cancel order
            </button>
        </div>

    );
};

export default UserOrder;
