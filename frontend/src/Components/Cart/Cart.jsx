import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../Navbar/Navbar";
import "./Cart.scss";

const Cart = ({ cart, removeItem }) => {
  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + Object.values(item.price)[0], 0);
  };

  return (
    <Box className="cart">
      <Navbar />

      {/* Header */}
      <Box className="cart-header" textAlign="center" py={3}>
        <ShoppingCartIcon sx={{ color: "#ffcc00", fontSize: 40 }} />
        <Typography variant="h4" fontWeight="bold">
          {cart.length > 0 ? "Your Cart" : "Your cart is empty"}
        </Typography>
        {cart.length === 0 && (
          <Typography variant="h6" color="textSecondary">
            Explore our products and add items to your cart
          </Typography>
        )}
      </Box>

      {/* View Menu Button */}
      <Link to="/menu" style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          sx={{ display: "flex", alignItems: "center", gap: 1, color: "#ffcc00", borderColor: "#ffcc00", my: 2 }}
        >
          <ArrowBackIosIcon sx={{ fontSize: 18 }} />
          <Typography variant="body1">View Menu</Typography>
          <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
        </Button>
      </Link>

      {/* Cart Items */}
      {cart.length > 0 && (
        <>
          <Box className="cart-items">
            {cart.map((item, index) => (
              <Card key={index} className="cart-item" sx={{ my: 2, p: 2, position: "relative" }}>
                <CardContent>
                  <Typography variant="h6">{item.itemName}</Typography>
                  <Typography variant="body2">Category: {item.category}</Typography>
                  <Typography variant="body2">Ingredients: {item.ingredients.join(", ")}</Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  <Typography variant="body2" fontWeight="bold">Price: R{Object.values(item.price)[0]}</Typography>
                </CardContent>
                <IconButton
                  onClick={() => removeItem(index)}
                  sx={{ position: "absolute", bottom: 10, right: 10, color: "red" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Box>

          {/* Total Price & Checkout */}
          <Box className="cart-total" textAlign="center" mt={3}>
            <Typography variant="h5" fontWeight="bold">
              Grand Total: R{calculateTotal()}
            </Typography>
            <Link to="/order-information" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
              >
                <CheckCircleIcon />
                Proceed to Checkout
                <CheckCircleIcon />
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
