import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid for unique order numbers
import './PlaceAnOrder.scss';
import Navbar from '../Navbar/Navbar';
// import BankCard from '../BankCard/BankCard';

const PlaceAnOrder = () => {
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [collectionType, setCollectionType] = useState('delivery');
    const [orderData, setOrderData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user order data from localStorage
        const storedOrder = localStorage.getItem('userOrdering');
        if (storedOrder) {
            setOrderData(JSON.parse(storedOrder));
        }
    }, []);

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleOnlineCollectionPaymentType = (event) => {
        setCollectionType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!orderData) {
            Swal.fire("No order details found!", "Please start again.", "error");
            return;
        }
    
        Swal.fire({
            title: `Are you sure about ${paymentMethod === "online" ? `Online payment - ${collectionType}` : paymentMethod}?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                // Generate a unique order number
                const orderNumber = uuidv4().slice(0, 12); // Create a unique order number using uuid
    
                // Create final order object
                const finalOrder = {
                    ...orderData,
                    paymentMethod: paymentMethod === "online" ? `Online payment - ${collectionType}` : paymentMethod,
                    collectionType,
                    orderNumber, // Add the order number
                };
    
                // Save updated order in localStorage
                localStorage.setItem('userOrdering', JSON.stringify(finalOrder));
    
                Swal.fire("Successfully saved user information and order!", "", "success");
                navigate("/order_tracking");
                window.location.reload();
    
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };
    

    return (
        <section className="place-an-order">
            <Navbar />
            <h2 className="section-title">Order Payment</h2>
            <form onSubmit={handleSubmit} className="order-form">
                <div className="payment-options">
                    <label className={`payment-option ${paymentMethod === 'online' ? 'active' : ''}`}>
                        <input
                            type="radio"
                            value="online"
                            checked={paymentMethod === 'online'}
                            onChange={handlePaymentChange}
                        />
                        Online Payment
                    </label>
                    <label className={`payment-option ${paymentMethod === 'cash-on-delivery' ? 'active' : ''}`}>
                        <input
                            type="radio"
                            value="cash-on-delivery"
                            checked={paymentMethod === 'cash-on-delivery'}
                            onChange={handlePaymentChange}
                        />
                        Cash on Delivery
                    </label>
                    <label className={`payment-option ${paymentMethod === 'cash-on-pickup' ? 'active' : ''}`}>
                        <input
                            type="radio"
                            value="cash-on-pickup"
                            checked={paymentMethod === 'cash-on-pickup'}
                            onChange={handlePaymentChange}
                        />
                        Cash on Pickup
                    </label>
                </div>

                {paymentMethod === 'online' && (
                    <div className="card-form">
                        <div className="payment-options">
                            <label className={`payment-option ${collectionType === 'delivery' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    value="delivery"
                                    checked={collectionType === 'delivery'}
                                    onChange={handleOnlineCollectionPaymentType}
                                />
                                Delivery
                            </label>
                            <label className={`payment-option ${collectionType === 'pickup' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    value="pickup"
                                    checked={collectionType === 'pickup'}
                                    onChange={handleOnlineCollectionPaymentType}
                                />
                                Pickup
                            </label>
                        </div>
                        <h3>Card Details</h3>
                        {/* <BankCard /> */}
                    </div>
                )}

                <button type="submit" className="submit-button">Confirm Order</button>
            </form>
        </section>
    );
};

export default PlaceAnOrder;
