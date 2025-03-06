import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import UserOrder from '../UserOrder/UserOrder';
import Navbar from '../Navbar/Navbar';

const OrderTracking = ({ orderStatus = "Preparing" }) => {
  const [orderData, setOrderData] = useState(null);
  const [inputTracking, setInputTracking] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    // Retrieve user order data from localStorage
    const storedOrder = localStorage.getItem('userOrdering');
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    }
  }, []);

  const handleTrackingSubmit = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      if (!orderData || inputTracking !== orderData.trackingNumber) {
        setError('Invalid Tracking Number. Please check and try again.');
      }
    }, 2000);
  };

  const handleCancelOrder = () => {
    localStorage.removeItem('userOrdering');
    setOrderData(null);
  };

  return (
    <div>
      <Navbar />
      <Box className="order-tracking">
        {orderData ? (
          <>
            <UserOrder handleCancelOrder={handleCancelOrder} />
            <Box sx={{ marginTop: 3 }}>

            </Box>
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ textAlign: 'center', mt: 4, mb: 4, color: "white" }}>Order Tracking</Typography>
            <Box variant="h4" sx={{ backgroundColor: "white",  ml: 2, mr: 2, pb: 3 }}>

              <Box sx={{ marginBottom: 2, color: "white",ml: 2, mr: 2 }}>
                <Typography variant="body1" sx={{ color: "white" }}><strong>Tracking Number:</strong></Typography>
                <TextField
                  fullWidth
                  label="Enter Tracking Number"
                  variant="outlined"
                  value={inputTracking}
                  onChange={(e) => setInputTracking(e.target.value)}
                  error={!!error}
                  helperText={error}

                />
              </Box>
              {/* <Typography variant="body1"><strong>Status:</strong> {orderStatus}</Typography> */}
              {/* <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <div className={`status-circle ${orderStatus === 'Shipped' ? 'shipped' : 'pending'}`}></div>
                <Typography variant="body1" sx={{ marginLeft: 2 }}>
                  {orderStatus === 'Shipped' ? 'On the way!' : 'Processing Order'}
                </Typography>
              </Box> */}
              <Box sx={{ marginTop: 3,  ml: 2, mr: 2 }}>
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
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default OrderTracking;
