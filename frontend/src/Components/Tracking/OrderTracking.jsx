import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import UserOrder from '../UserOrder/UserOrder';
import Navbar from '../Navbar/Navbar';
import { getOrderByNumber, updateOrderStatus } from '../../Supabase/PlaceAnOrder/PlaceAnOrder';

const OrderTracking = ({ orderNumber, setOrderNumber }) => {
  const [inputTracking, setInputTracking] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null)

  const navigate = useNavigate()


  useEffect(() => {

    const fetchUserOrder = async () => {
      const userOrder = await getOrderByNumber(orderNumber);

      if (userOrder.success && userOrder.data && userOrder.data.order_status !== "Canceled") {
        setOrder(userOrder.data); // Fix: Set the order to the data itself
      } else {
        navigate('/order_tracking');

      }
    };
    if (order === null) {
      fetchUserOrder()
    }

  }, [order, navigate, orderNumber]);


  const handleTrackingSubmit = async () => {
    setLoading(true);
    setError('');
    const userOrder = await getOrderByNumber(orderNumber = inputTracking);
    if (userOrder.success && userOrder.data && userOrder.data.order_status !== "Canceled") {
      setOrder(userOrder.data); // Fix: Set the order to the data itself
      setOrderNumber(userOrder.data.order_number)
      setLoading(false);
      setInputTracking("")

    } else if (userOrder.success && userOrder.data && userOrder.data.order_status === "Canceled") {
      navigate('/order_tracking');
      setLoading(true);
      setError('Order has been canceled');
      setTimeout(() => {
        if (!order || inputTracking !== order.order_number) {
          setInputTracking("")
          setLoading(false);
          setError('');

        }
      }, 2000);
    } else {
      navigate('/order_tracking');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (!order || inputTracking !== order.order_number) {
          setError('Invalid Tracking Number. Please check and try again.');
          setLoading(false);

        }
      }, 2000);
    }
  };

  const handleCancelOrder = async () => {
    setOrder(null);
    await updateOrderStatus(orderNumber, "Canceled")
  };

  return (
    <div>
      <Navbar />
      <Box className="order-tracking">
        {order && order ? (
          <>
            <UserOrder handleCancelOrder={handleCancelOrder} order={order} />
            <Box sx={{ marginTop: 3 }}>

            </Box>
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ textAlign: 'center', mt: 4, mb: 4, color: "white" }}>Order Tracking</Typography>
            <Box variant="h4" sx={{ backgroundColor: "white", ml: 2, mr: 2, pb: 3 }}>

              <Box sx={{ marginBottom: 2, color: "white", ml: 2, mr: 2 }}>
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
              <Box sx={{ marginTop: 3, ml: 2, mr: 2 }}>
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
