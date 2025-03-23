import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider } from '@mui/material';

const OrderHistoryComponent = ({ orderHistory }) => {
    return (
        <Box mt={4}>
            <Typography variant="h5" color="#1976d2" gutterBottom>
                Order History
            </Typography>
            {orderHistory.length === 0 ? (
                <Typography>No orders found.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {orderHistory.map((order, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">{`Order #${order.id}`}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Date: {order.date}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Status: {order.status}
                                    </Typography>
                                    <Divider sx={{ margin: '10px 0' }} />
                                    <Typography variant="body2">Total: ${order.total}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default OrderHistoryComponent;
