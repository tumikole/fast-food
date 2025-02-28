import React, { useState } from 'react';
import './PlaceAnOrder.scss';
import Navbar from '../Navbar/Navbar';

const PlaceAnOrder = () => {
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
    });

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleCardChange = (event) => {
        const { name, value } = event.target;
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
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
                        Pay Online
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
                        Pickup
                    </label>
                </div>

                {paymentMethod === 'online' && (
                    <div className="card-form">
                        <h3>Card Details</h3>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={cardDetails.cardNumber}
                            onChange={handleCardChange}
                            required
                        />
                        <input
                            type="text"
                            name="cardHolder"
                            placeholder="Card Holder Name"
                            value={cardDetails.cardHolder}
                            onChange={handleCardChange}
                            required
                        />
                        <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={cardDetails.expiryDate}
                            onChange={handleCardChange}
                            required
                        />
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            required
                        />
                    </div>
                )}

                <button type="submit" className="submit-button">Confirm Order</button>
            </form>
        </section>
    );
};

export default PlaceAnOrder;
