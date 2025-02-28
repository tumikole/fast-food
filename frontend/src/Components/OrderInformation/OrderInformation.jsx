import React from 'react';
import './OrderInformation.scss';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

const OrderInformation = ({ cart, setCart }) => {
    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const itemPrice = Object.values(item.price)[0] || 0;
            return total + (itemPrice * (item.quantity || 1));
        }, 0);
    };

    return (
        <div className="order-information">
            <Navbar />
            <h2>Order Information</h2>

            <div className="order-items">
                {cart.map((item, index) => (
                    <div key={index} className="order-item">
                        <div className="item-details">
                            <h3>{item.itemName}</h3>
                            <p>Category: {item.category}</p>
                            <p>Quantity: {item.quantity}</p>
                            {item.ingredients && item.ingredients.length > 0 && (
                                <div className="ingredients">
                                    <p>Ingredients:</p>
                                    <ul>
                                        {item.ingredients.map((ingredient, idx) => (
                                            <li key={idx}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <p className="price">R{Object.values(item.price)[0] * (item.quantity || 1)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="order-summary">
                <div className="total">
                    <h3>Total Amount:</h3>
                    <p>R{calculateTotal()}</p>
                </div>

                <div className="customer-info">
                    <h3>Customer Information</h3>
                    <form>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" placeholder="Enter your name" required />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="tel" placeholder="Enter your phone number" required />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <textarea placeholder="Enter your delivery address" required></textarea>
                        </div>
                        <div className="form-group">
                            <label>Notes:</label>
                            <textarea placeholder="Any special instructions?"></textarea>
                        </div>
                    </form>
                </div>
                <Link to="/place_an_order">
                    <button className="place-order-btn">
                        Place Order
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default OrderInformation;
