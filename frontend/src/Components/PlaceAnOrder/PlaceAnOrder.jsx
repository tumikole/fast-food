import React, { useState } from 'react';
import './PlaceAnOrder.scss';
import Navbar from '../Navbar/Navbar';
import BankCard from '../BankCard/BankCard';

const PlaceAnOrder = () => {
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [collectionType, setCollectionType] = useState('delivery');


    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleOnlineCollectionPaymentType = (event) => {
        setCollectionType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle order submission logic here
        alert(`Order placed with payment method: ${paymentMethod}`);
    };

    return (
        <section className="place-an-order">
            <Navbar />
            <h2 className="section-title">Place Your Order</h2>
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

                {paymentMethod === 'online' &&

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
                        <BankCard />
                    </div>

                }

                <button type="submit" className="submit-button">Confirm Order</button>
            </form>
        </section>
    );
};

export default PlaceAnOrder;
