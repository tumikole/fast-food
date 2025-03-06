import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Card, CardContent, List, ListItem, CircularProgress } from '@mui/material';

const UserOrder = () => {
    const [orderData, setOrderData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const navigate = useNavigate();

    useEffect(() => {
        const storedOrder = localStorage.getItem('userOrdering');
        if (storedOrder) {
            setOrderData(JSON.parse(storedOrder));
        }
    }, []);

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

    if (!orderData) {
        return (
            <Box className="user-order" sx={{ textAlign: 'center', mt: 4 }}>
                {/* <Navbar /> */}
                <Typography variant="h5" fontWeight="bold" color="error">No Order Found</Typography>
                <Typography variant="body1">Your order details are not available. Please place an order.</Typography>
            </Box>
        );
    }

    return (
        <Box className="user-order" sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
            {/* <Navbar /> */}
            <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={2}>
                Order Summary
            </Typography>

            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Keep your order number safe for tracking
                    </Typography>

                    <Typography variant="body1"><strong>Order Number:</strong> {orderData.orderNumber}</Typography>
                    <Typography variant="body1"><strong>Payment Method:</strong> {orderData.paymentMethod}</Typography>
                    <Typography variant="body1"><strong>Collection Type:</strong> {orderData.collectionType}</Typography>

                    <Typography variant="h6" mt={2}>Order Details:</Typography>
                    <List>
                        {orderData.order.map((item, index) => (
                            <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography variant="body1" color="secondary">{item.category}</Typography>
                                <Typography variant="body1" color="text.primary">{item.itemName}</Typography>
                                <Typography variant="body2" color="text.secondary">Quantity: {item.quantity}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>

            <Box textAlign="center" mt={3}>
                <Typography variant="body2" color="error">
                    Order can be canceled within <strong>{formatTime(timeLeft)}</strong>
                </Typography>
                {timeLeft > 0 ? (
                    <CircularProgress variant="determinate" value={(timeLeft / 600) * 100} sx={{ mt: 1 }} />
                ) : (
                    <Typography variant="body2" color="error" mt={1}>Time Expired</Typography>
                )}
            </Box>

            <Button 
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2, borderRadius: 2 }}
                onClick={() => navigate('/cart')}
                disabled={timeLeft <= 0}
            >
                {timeLeft > 0 ? "Cancel Order" : "Time Expired"}
            </Button>
        </Box>
    );
};

export default UserOrder;
