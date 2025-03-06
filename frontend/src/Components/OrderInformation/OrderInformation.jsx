import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { 
  TextField, Button, Card, CardContent, Typography, Grid 
} from "@mui/material";
import "./OrderInformation.scss";

const OrderInformation = ({ cart }) => {
  const navigate = useNavigate();

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = Object.values(item.price)[0] || 0;
      return total + itemPrice * (item.quantity || 1);
    }, 0);
  };

  // State for form inputs
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [notes, setNotes] = useState(localStorage.getItem("notes") || "");

  // Validate phone number
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  // Handle order submission
  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields.",
        icon: "error"
      });
      return;
    }

    if (!validatePhone(phone)) {
      Swal.fire({
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
        icon: "error"
      });
      return;
    }

    const orderData = {
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
        localStorage.setItem("userOrdering", JSON.stringify(orderData));
        Swal.fire({
          title: "Order Placed!",
          text: "Your order has been successfully placed.",
          icon: "success"
        }).then(() => navigate("/place_an_order"));
      }
    });
  };

  return (
    <div className="order-information">
      <Navbar />
      <Typography variant="h4" align="center" gutterBottom>
        Order Information
      </Typography>

      {/* Order Items */}
      <Grid container spacing={2} justifyContent="center">
        {cart.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="order-item">
              <CardContent>
                <Typography variant="h6">{item.itemName}</Typography>
                <Typography variant="body2">Category: {item.category}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                {item.ingredients?.length > 0 && (
                  <div>
                    <Typography variant="body2">Ingredients:</Typography>
                    <ul>
                      {item.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Typography variant="h6" color="primary">
                  R{Object.values(item.price)[0] * (item.quantity || 1)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Order Summary */}
      <Card className="order-summary">
        <CardContent>
          <Typography variant="h5">Total Amount: R{calculateTotal()}</Typography>

          {/* Customer Information Form */}
          <Typography variant="h6" gutterBottom>
            Customer Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                required
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                required
                variant="outlined"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Delivery Address"
                required
                variant="outlined"
                multiline
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes (Optional)"
                variant="outlined"
                multiline
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handlePlaceOrder}
          >
            Submit Order Information
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderInformation;
