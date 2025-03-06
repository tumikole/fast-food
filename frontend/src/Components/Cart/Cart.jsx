import React from "react";
import "./Cart.scss";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Cart = ({ cart, removeItem }) => {
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
      {cart.length > 0 &&
        <div className="cart-header">

          <box-icon name='cart' color='#ffcc00' ></box-icon>

          <h2>
            Your Cart
          </h2>
        </div>
      }

      {cart.length === 0 &&
        <div className="cart-header">
          <box-icon name='cart' color='#ffcc00' ></box-icon>
          <h2>
            Your cart is empty
          </h2>
          <h3>Explore our products and add items to your cart</h3>
        </div>
      }


      <Link to="/menu">
        <div className="viewMenu" style={{ display: "flex" }}>
          <div><box-icon name='right-arrow-alt' animation='tada' color='#ffcc00' ></box-icon></div>
          <div>
            <h5 style={{ color: "#ffcc00" }}>View Menu</h5>
          </div>
          <div><box-icon name='left-arrow-alt' animation='tada' color='#ffcc00' ></box-icon></div>
        </div>
      </Link>

      {cart.length > 0 && (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-details">
                  <h4>{item.itemName}</h4>
                  <p>Category: {item.category}</p>
                  <p>Ingredients: {item.ingredients.join(", ")}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: R{Object.values(item.price)[0]}</p>
                  <div onClick={() => removeItem(index)} style={{ position: "absolute", bottom: 0, right: "1rem" }}>
                    <box-icon name='trash' size="1.8rem" animation='flashing' color='#ff0000' ></box-icon>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Grand Total: R{calculateTotal()}</h3>
            <Link to="/order-information">
              <button className="checkout-button" style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <div><box-icon name='check-circle'></box-icon></div>
                <div>Proceed to Checkout</div>
                <div><box-icon name='check-circle'></box-icon></div>
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
