import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { RemoveCircle, AddCircle, Delete } from '@mui/icons-material';

const CartComponent = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
    const getTotalCost = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" color="#1976d2" gutterBottom>
                Your Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <>
                    <List>
                        {cartItems.map((item, index) => (
                            <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                <ListItemText
                                    primary={item.name}
                                    secondary={`$${item.price} x ${item.quantity}`}
                                />
                                <IconButton onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                                    <RemoveCircle />
                                </IconButton>
                                <IconButton onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                                    <AddCircle />
                                </IconButton>
                                <IconButton onClick={() => onRemoveItem(item.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ margin: '10px 0' }} />
                    <Typography variant="h6">
                        Total: ${getTotalCost()}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={onCheckout} sx={{ marginTop: 2 }}>
                        Checkout
                    </Button>
                </>
            )}
        </Box>
    );
};

export default CartComponent;
