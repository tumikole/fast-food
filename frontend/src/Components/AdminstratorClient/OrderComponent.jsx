import React, { useState } from 'react';
import { Button, Typography, Container } from '@mui/material';

const OrderComponent = () => {
  const [order, setOrder] = useState([]);

  // const handleAddToOrder = (item) => {
  //   setOrder([...order, item]);
  // };

  const handleCheckout = () => {
    // Proceed with checkout logic
    alert('Proceeding to checkout!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Order</Typography>
      <div>
        {order.length === 0 ? (
          <Typography>No items in the order</Typography>
        ) : (
          order.map((item, index) => (
            <Typography key={index}>{item.name} - {item.price}</Typography>
          ))
        )}
      </div>
      <Button onClick={handleCheckout} variant="contained" color="primary" fullWidth>
        Checkout
      </Button>
    </Container>
  );
};

export default OrderComponent;
