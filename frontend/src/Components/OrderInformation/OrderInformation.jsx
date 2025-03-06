import React, { useState } from 'react';
import Swal from 'sweetalert2'
import './OrderInformation.scss';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const OrderInformation = ({ cart }) => {
    const navigate = useNavigate()
    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const itemPrice = Object.values(item.price)[0] || 0;
            return total + (itemPrice * (item.quantity || 1));
        }, 0);
    };

    // State for form inputs
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [phone, setPhone] = useState(localStorage.getItem('phone') || '');
    const [address, setAddress] = useState(localStorage.getItem('address') || '');
    const [notes, setNotes] = useState(localStorage.getItem('notes') || '');

    // Save user info to localStorage when "Place Order" is clicked
    const handlePlaceOrder = () => {
        if (name && phone && address) {
            const userOrderingData = {
                userInformation: { name, phone, address, notes },
                order: cart
            };

            Swal.fire({
                title: "Confirm Your Order",
                text: "Are you sure you want to place this order?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, place order!"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.setItem('userOrdering', JSON.stringify(userOrderingData));

                    Swal.fire({
                        title: "Order Placed!",
                        text: "Your order has been successfully placed.",
                        icon: "success"
                    }).then(() => {
                        navigate('/place_an_order'); // Redirect only after confirmation
                    });
                }
            });
        } else {
            Swal.fire({
                title: "Missing Information",
                text: "Please fill in all required fields.",
                icon: "error"
            });
        }
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
                            <label>Name <span style={{color:"red"}}>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone <span style={{color:"red"}}>*</span></label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address <span style={{color:"red"}}>*</span></label>
                            <textarea
                                placeholder="Enter your delivery address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Notes <span style={{color:"green"}}>Optional</span></label>
                            <textarea
                                placeholder="Any special instructions?"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>
                    </form>
                </div>
                <button className="place-order-btn" onClick={handlePlaceOrder}>
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default OrderInformation;
