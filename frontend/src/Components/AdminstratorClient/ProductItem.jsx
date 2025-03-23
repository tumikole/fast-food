import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ProductItem = ({ product }) => {
  return (
    <Card style={{ maxWidth: 345, margin: '20px' }}>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" style={{ marginTop: '10px' }}>
          {product.price}
        </Typography>
        <Button variant="contained" color="primary" fullWidth>
          Add to Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
