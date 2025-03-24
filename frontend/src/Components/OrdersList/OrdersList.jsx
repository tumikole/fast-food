import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Grid, Button, FormControl, InputLabel, Select, MenuItem, Box, Modal, Backdrop, Fade } from '@mui/material';
import { getAllOrders, updateOrderChef } from '../../Supabase/PlaceAnOrder/PlaceAnOrder'; // Assuming this function exists
import supabase from '../../Supabase/supabase.config'; // Import your supabase client

const FoodOrdersList = ({ user }) => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order for modal
  const [openModal, setOpenModal] = useState(false); // Control modal open/close

  // Function to fetch orders from Supabase
  const fetchAllUserOrders = async () => {
    const orders = await getAllOrders();
    if (orders.success) {
      setAllOrders(orders.data);
    } else {
      console.error('Error fetching orders:', orders.error);
    }
  };

  useEffect(() => {
    // Fetch orders when the component mounts
    fetchAllUserOrders();

    // Set up real-time subscription using channel
    const ordersSubscription = supabase
      .channel('realtime:orders') // Create a unique channel for 'orders'
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        console.log('Change received!', payload);
        // Refetch orders on any change (insert, update, delete)
        fetchAllUserOrders();
      })
      .subscribe();

    // Cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(ordersSubscription);
    };
  }, []);

  // Filter orders based on the selected status
  const filteredOrders = selectedStatus === 'All'
    ? allOrders
    : allOrders.filter(order => order.order_status === selectedStatus);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Function to handle button click and open modal with order details
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  // Function to handle status change inside modal
  const handleModalStatusChange = async (event) => {
    const updatedStatus = event.target.value;
    const updated = await updateOrderChef(selectedOrder.id, user.username, updatedStatus);

    if (updated.success) {
      // Refetch orders to update UI with the latest data
      fetchAllUserOrders();
      setSelectedOrder({ ...selectedOrder, order_status: updatedStatus });
    } else {
      console.error('Error updating order status:', updated.error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null); // Reset the selected order when closing the modal
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Food Orders
            </Typography>

            {/* Status Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            {/* List of Orders */}
            <List>
              {filteredOrders.map((order) => (
                <Box key={order.id}>
                  <ListItem alignItems="flex-start" sx={{ padding: 2 }}>
                    <ListItemText
                      primary={<Typography variant="h6">{order.name}</Typography>}
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            Order Number: {order.order_number}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Status: {order.order_status}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Payment Method: {order.payment_method}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Chef: {order.chef ? order.chef : 'Not assigned'}
                          </Typography>
                          <Box mt={1}>
                            <Typography variant="subtitle2">Order Details:</Typography>
                            {order.order_details.order.map((item, index) => (
                              <Box key={index} sx={{ marginLeft: 2 }}>
                                <Typography variant="body2">
                                  Item: {item.itemName} ({item.category})
                                </Typography>
                                <Typography variant="body2">
                                  Ingredients: {item.ingredients.join(', ')}
                                </Typography>
                                <Typography variant="body2">
                                  Quantity: {item.quantity} | Price: R{Object.values(item.price)[0]}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </>
                      }
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleSelectOrder(order)} // Open modal with order details
                    >
                      Select
                    </Button>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Full-screen modal to view and update order status */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'white',
            padding: 4,
            overflowY: 'scroll',
            boxSizing: 'border-box',
          }}>
            {selectedOrder && (
              <>
                <Typography variant="h4" gutterBottom>
                  Order Number: {selectedOrder.order_number}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {selectedOrder.name}
                </Typography>

                {/* Order details */}
                {selectedOrder.order_details.order.map((item, index) => (
                  <Box key={index} sx={{ marginBottom: 2 }}>
                    <Typography variant="body1">
                      Item: {item.itemName} ({item.category})
                    </Typography>
                    <Typography variant="body2">
                      Ingredients: {item.ingredients.join(', ')}
                    </Typography>
                    <Typography variant="body2">
                      Quantity: {item.quantity} | Price: R{Object.values(item.price)[0]}
                    </Typography>
                  </Box>
                ))}

                {/* Status Dropdown in Modal */}
                <FormControl fullWidth sx={{ marginTop: 3 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={selectedOrder.order_status}
                    onChange={handleModalStatusChange}
                    label="Status"
                  >
                    <MenuItem value="Pending ">Pending</MenuItem>
                    <MenuItem value="Preparing">Preparing</MenuItem>
                    <MenuItem value="Waiting for pick up">Waiting for pick up</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>

                  </Select>
                </FormControl>

                {/* Close Modal Button */}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCloseModal}
                  sx={{ marginTop: 2 }}
                >
                  Close
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default FoodOrdersList;
