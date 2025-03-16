import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CircularProgress } from '@mui/material';

const UserOrder = ({ handleCancelOrder, order }) => {
    const [timeLeft, setTimeLeft] = useState(600); // Default 10 minutes in seconds

    useEffect(() => {
        if (!order || !order.created_at) return; // Exit if there's no order or created_at is missing
        const createdAt = new Date(order.created_at).getTime(); // Get the created timestamp in milliseconds
        const currentTime = Date.now(); // Get current time in milliseconds
        const timePassed = Math.floor((currentTime - createdAt) / 1000); // Time passed in seconds
        const remainingTime = 600 - timePassed; // 600 seconds = 10 minutes

        if (remainingTime > 0) {
            setTimeLeft(remainingTime);
        } else {
            setTimeLeft(0);
        }
    }, [order]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Function to render different order status stages
    const renderOrderStatus = (status) => {
        switch (status) {
            case 'Pending':
                return (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="h6" color="warning">Order is Pending</Typography>
                        <Typography variant="body2">Your order is awaiting processing.</Typography>
                    </Box>
                );
            case 'Preparing':
                return (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="h6" color="warning">Order is being Prepared</Typography>
                        <Typography variant="body2">Your order is awaiting processing.</Typography>
                    </Box>
                );
            case 'Waiting for pick up':
                return (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="h6" color="info">Order Shipped</Typography>
                        <Typography variant="body2">Your order has been shipped and is on the way.</Typography>
                    </Box>
                );
            case 'Shipped':
                return (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="h6" color="info">Order Shipped</Typography>
                        <Typography variant="body2">Your order has been shipped and is on the way.</Typography>
                    </Box>
                );
            case 'Delivered':
                return (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="h6" color="success">Order Delivered</Typography>
                        <Typography variant="body2">Your order has been successfully delivered!</Typography>
                    </Box>
                );
            default:
                return null;
        }
    };

    if (!order) {
        return (
            <Box className="user-order" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h5" fontWeight="bold" color="error">No Order Found</Typography>
                <Typography variant="body1">Your order details are not available. Please place an order.</Typography>
            </Box>
        );
    }

    return (
        <Box className="user-order" sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
            <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={2}>
                Order Summary
            </Typography>

            <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Keep your order number safe for tracking
                    </Typography>
                    <Typography variant="body1"><strong>Order Number:</strong> {order.order_number}</Typography>
                    <Typography variant="body1"><strong>Payment Method:</strong> {order.payment_method}</Typography>
                    <Typography variant="body1"><strong>Order Status:</strong> {order.order_status}</Typography>
                </CardContent>
            </Card>

            {renderOrderStatus(order.order_status)} {/* This will display different order status stages */}

            <Box textAlign="center" mt={3}>
                <Typography variant="body2" color="error">
                    Order can be canceled within <strong>{formatTime(timeLeft)}</strong>
                </Typography>
                {timeLeft > 0 ? (
                    <CircularProgress variant="determinate" value={(timeLeft / 600) * 100} sx={{ mt: 1 }} />
                ) : (
                    <Typography variant="body2" color="error" mt={1}>Time Expired to cancel</Typography>
                )}
            </Box>

            {timeLeft > 0 ? (
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleCancelOrder}
                    fullWidth
                    sx={{ mt: 2, borderRadius: 2 }}
                >
                    Cancel Order
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 2, borderRadius: 2 }}
                    disabled
                >
                    Time Expired
                </Button>
            )}
        </Box>
    );
};

export default UserOrder;
