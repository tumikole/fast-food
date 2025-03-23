import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const OrderConfirmationComponent = ({ orderId, onTrackOrder }) => {
    return (
        <Box mt={4} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" color="#1976d2" gutterBottom>
                Thank you for your order!
            </Typography>
            <Typography variant="body1" color="textSecondary">
                Your order number is #{orderId}.
            </Typography>
            <Button variant="outlined" color="primary" onClick={onTrackOrder} sx={{ marginTop: 2 }}>
                Track Order
            </Button>
        </Box>
    );
};

export default OrderConfirmationComponent;
