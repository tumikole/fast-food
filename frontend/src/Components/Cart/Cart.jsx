import React from "react";
import "./Cart.scss";
import Navbar from "../Navbar/Navbar";

const Cart = ({ cartItems, setCartItems }) => {
//   const updateQuantity = (id, amount) => {
//     setCartItems((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + amount) }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

  return (
    <div className="cart">
      <Navbar />
      <h2>Your Cart</h2>
      
    </div>
  );
};

export default Cart;
