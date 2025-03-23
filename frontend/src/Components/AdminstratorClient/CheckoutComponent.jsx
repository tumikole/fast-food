import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CheckoutComponent = ({ cartItems, onPlaceOrder }) => {
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit');

    const getTotalCost = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" color="#1976d2" gutterBottom>
                Checkout
            </Typography>

            <TextField
                label="Name"
                fullWidth
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Payment Method</InputLabel>
                <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    label="Payment Method"
                >
                    <MenuItem value="credit">Credit Card</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                </Select>
            </FormControl>

            <Divider sx={{ margin: '20px 0' }} />

            <Typography variant="h6">
                Order Summary:
            </Typography>
            <Grid container spacing={2}>
                {cartItems.map((item, index) => (
                    <Grid item xs={12} key={index}>
                        <Typography>{`${item.name} - $${item.price} x ${item.quantity}`}</Typography>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Total: ${getTotalCost()}
            </Typography>

            <Button variant="contained" color="primary" onClick={onPlaceOrder} sx={{ marginTop: 2 }}>
                Place Order
            </Button>
        </Box>
    );
};

export default CheckoutComponent;
