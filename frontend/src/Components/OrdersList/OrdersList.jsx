import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, Divider, Grid, Button, FormControl, InputLabel, Select, MenuItem, Box, Modal, Backdrop, Fade, } from '@mui/material';
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


            <List sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
              {filteredOrders.map((order) => (
                <Card key={order.order_number} sx={{ borderRadius: 3, boxShadow: 3, width: "100%", transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {order.name}
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-between" }}>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Order #:</strong> {order.order_number}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong> {order.order_status}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Payment:</strong> {order.payment_method}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-between" }}>
                      <Typography variant="body2">
                        <strong>Phone:</strong> {order.phone_number}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Address:</strong> {order.address}
                      </Typography>
                    </Box>

                    {order.notes && order.notes.trim() !== "" && (
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic", color: "text.secondary" }}>
                        <strong>Note:</strong> {order.notes}
                      </Typography>
                    )}

                    {order.chef && order.chef.trim() !== "" && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Chef:</strong> {order.chef}
                      </Typography>
                    )}

                    {/* Order Items */}
                    {order.order_details?.order?.length > 0 && (
                      <Box sx={{ mt: 2, p: 1, background: "#f9f9f9", borderRadius: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Items:
                        </Typography>
                        <List sx={{ mt: 1 }}>
                          {order.order_details.order.map((item) => (
                            <ListItem key={item.id} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", p: 1 }}>
                              <Box sx={{ width: "100%" }}>
                                <Typography fontWeight="bold">{item.itemName}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {item.category}
                                </Typography>

                                {/* Display Ingredients */}
                                {item.category !== "Kota" && item.ingredients && item.ingredients.length > 0 ? (
                                  <Box sx={{ mt: 1, pl: 2 }}>
                                    <Typography variant="subtitle2" fontWeight="bold">Ingredients:</Typography>
                                    <List dense>
                                      {item.ingredients.map((ingredient, index) => (
                                        <ListItem key={index} sx={{ pl: 1 }}>
                                          <Typography variant="body2">
                                            • Item: {ingredient.ingredient}
                                            <br />
                                            • Price: {ingredient.totalAmount}
                                            <br />
                                            {item.category !== "Kota" &&
                                              <strong>• Quantity: {ingredient.quantity}</strong>}
                                          </Typography>
                                        </ListItem>
                                      ))}
                                    </List>
                                  </Box>
                                ) : (
                                  <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                                    No ingredients listed.
                                  </Typography>
                                )}
                                {item.category === "Kota" &&
                                  <Typography variant="body2">
                                    • <strong>Quantity: {item.quantity}</strong>
                                  </Typography>
                                }
                              </Box>
                              {item.category === "Kota" &&
                                <Box
                                  sx={{
                                    textAlign: "right",
                                    background: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                    }
                                  }}
                                >

                                  <Typography sx={{
                                    color: '#FF6B6B',
                                    fontWeight: '600'
                                  }}>
                                    R{item.totalAmount}
                                  </Typography>
                                </Box>}
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </CardContent>
                  <Box sx={{
                    background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    ml: "1rem",
                    mr: "1rem",
                    mb: "1rem",
                    textAlign: "center"
                  }}
                    onClick={() => handleSelectOrder(order)}
                  >
                    Select
                  </Box>
                </Card>
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
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  Order Number: {selectedOrder.order_number}
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                  {selectedOrder.name}
                </Typography>

                {selectedOrder.order_details.order.map((item, index) => (
                  <Box key={index} sx={{ marginBottom: 3, backgroundColor: 'background.paper', padding: 2, borderRadius: 1, boxShadow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      Item: {item.itemName} ({item.category})
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Ingredients: {item.ingredients.join(', ')}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Quantity: {item.quantity}
                    </Typography>
                  </Box>
                ))}

                <FormControl fullWidth sx={{ marginTop: 3, backgroundColor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={selectedOrder.order_status}
                    onChange={handleModalStatusChange}
                    label="Status"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'divider',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Preparing">Preparing</MenuItem>
                    <MenuItem value="Waiting for pick up">Waiting for pick up</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCloseModal}
                  sx={{
                    marginTop: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: 2,
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
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
