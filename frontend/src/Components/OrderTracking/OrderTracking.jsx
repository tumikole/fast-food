import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './OrderTracking.scss';
import UserOrder from '../UserOrder/UserOrder';
import Navbar from '../Navbar/Navbar';

const OrderTracking = ({ trackingNumber, orderStatus = "Preparing" }) => {
  const [orderData, setOrderData] = useState(null);
  const [inputTracking, setInputTracking] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user order data from localStorage
    const storedOrder = localStorage.getItem('userOrdering');
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    } else {
      // If no order data is found, navigate to the PlaceAnOrder page
      // navigate('/menu');
    }
  }, [navigate]);

  const handleTrackingSubmit = () => {
    setLoading(true);
    // Simulate tracking check
    setTimeout(() => {
      setLoading(false);
      // You can add logic here to validate or fetch order info based on inputTracking
    }, 2000);
  };

  return (
    <Box className="order-tracking" sx={{ padding: 3 }}>
      <Navbar />
      {orderData ? (
        <UserOrder />
      ) : (
        <>
          <Typography variant="h4" className="tracking-title">Order Tracking</Typography>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1"><strong>Tracking Number:</strong></Typography>
            <TextField
              fullWidth
              label="Enter Tracking Number"
              variant="outlined"
              value={inputTracking}
              onChange={(e) => setInputTracking(e.target.value)}
            />
          </Box>
          <Typography variant="body1"><strong>Status:</strong> {orderStatus}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <div className={`status-circle ${orderStatus === 'Shipped' ? 'shipped' : 'pending'}`}></div>
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
              {orderStatus === 'Shipped' ? 'On the way!' : 'Processing Order'}
            </Typography>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTrackingSubmit}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Track Order'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OrderTracking;
