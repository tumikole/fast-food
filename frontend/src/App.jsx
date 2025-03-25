import React, { useState } from 'react';

const [cart, setCart] = useState([]);

const removeFromCart = (itemToRemove) => {
    setCart(prevCart => prevCart.filter(item => item.itemName !== itemToRemove.itemName));
};

<Cart cart={cart} removeFromCart={removeFromCart} /> 