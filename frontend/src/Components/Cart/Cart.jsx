import React from "react";
import "./Cart.scss";
import Navbar from "../Navbar/Navbar";

const Cart = ({ cart, removeItem, totalPrice }) => {
  console.log("Cart contents:", cart);

  return (
    <div className="cart">
      <Navbar />
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-details">
                <h4>{item.itemName}</h4>
                <p>Category: {item.category}</p>
                <p>Ingredients: {item.ingredients.join(", ")}</p>
                <p>Price: R{item.price}</p>
                <button onClick={() => removeItem(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-total">
        <h3>Total: R{totalPrice}</h3>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
