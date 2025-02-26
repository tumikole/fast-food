import React from "react";
import "./Cart.scss";
import Navbar from "../Navbar/Navbar";

const Cart = ({ cart, removeItem, totalPrice }) => {
  console.log("Cart contents:", cart);

  // Calculate the total price of the cart (if not already done in the parent)
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = Object.values(item.price)[0]; // Get the price from the price object
      return total + itemPrice;
    }, 0);
  };

  return (
    <div className="cart">
      <Navbar />
      <h2>{cart.length > 0 ? "Your Cart" : "Your cart is empty"}</h2>

      {cart.length > 0 && (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-details">
                  <h4>{item.itemName}</h4>
                  <p>Category: {item.category}</p>
                  <p>Ingredients: {item.ingredients.join(", ")}</p>
                  <p>Price: R{Object.values(item.price)[0]}</p>
                  <button onClick={() => removeItem(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: R{calculateTotal()}</h3>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
