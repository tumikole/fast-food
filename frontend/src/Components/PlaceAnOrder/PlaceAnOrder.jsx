import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../Navbar/Navbar';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Typography,
    Container,
    Paper,
    Box,
    CircularProgress,
    TextField
} from '@mui/material';
import { addOrder } from '../../Supabase/PlaceAnOrder/PlaceAnOrder'; // Fixed import

const PlaceAnOrder = ({ paymentMethod,
    setPaymentMethod,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    notes,
    setNotes,
    orderData,
    setOrderData,
    loading,
    setLoading,
    setOrderNumber,
    orderNumber,
    setCart
}) => {

    const navigate = useNavigate();

    const handleOrdererInformation = async (finalOrder, orderNumber) => {
        try {
            const response = await addOrder(
                finalOrder,
                orderNumber,
                paymentMethod,
                name,
                phoneNumber,
                address,
                notes
            );



            if (response.success) {
                Swal.fire("Order successfully saved!", "Your order has been placed successfully.", "success");
                navigate("/order_tracking");
            } else {
                Swal.fire("Failed to save order", response.error, "error");
            }
        } catch (error) {
            console.error("Unexpected error while saving order:", error.message);
            Swal.fire("Error", "An unexpected error occurred while saving the order.", "error");
        }
    };

    useEffect(() => {
        const storedOrder = localStorage.getItem('userOrdering');
        if (storedOrder) {
            setOrderData(JSON.parse(storedOrder));
        }
    }, [setOrderData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!orderData) {
            Swal.fire("No order details found!", "Please start again.", "error");
            return;
        }

        if (!paymentMethod || !name || !phoneNumber || !address) {
            Swal.fire("Please fill in all required fields!", "Payment Method, Name, Phone Number, and Address are required.", "error");
            return;
        }

        Swal.fire({
            title: `Are you sure about ${paymentMethod}?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Confirm Order",
            denyButtonText: `Cancel`
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true); // Start loading
                const userOrderNumber = uuidv4().slice(0, 12);
                const orderNumber = userOrderNumber
                setOrderNumber(userOrderNumber);
                const finalOrder = {
                    order: orderData,
                };

                await handleOrdererInformation(finalOrder, orderNumber); // Save the orderer information
                setLoading(false); // Stop loading after saving information
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Order successfully placed! You will be redirected to the order tracking page.",
                    showConfirmButton: false,
                    timer: 1500
                });
                setPaymentMethod("")
                setName("")
                setPhoneNumber("")
                setAddress("")
                setNotes("")
                localStorage.clear();
                setCart([])
                navigate("/order_tracking");
            } else if (result.isDenied) {
                Swal.fire("Order not saved", "You can modify your details and try again.", "info");
            }
        });
    };


    return (
        <div>
            <Navbar />
            <Container>
                <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Order Payment Details
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend">Choose Payment Method</FormLabel>
                            <RadioGroup
                                value={paymentMethod}
                                onChange={(event) => setPaymentMethod(event.target.value)}
                            >
                                <FormControlLabel value="pick-up" control={<Radio />} label="Cash on Pick-up" />
                                <FormControlLabel value="delivery" control={<Radio />} label="Cash on Delivery" />
                            </RadioGroup>
                        </FormControl>

                        <Box mt={2}>
                            <TextField
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Enter your full name"
                            />
                        </Box>

                        <Box mt={2}>
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                placeholder="Enter your phone number"
                                type="tel"
                            />
                        </Box>

                        <Box mt={2}>
                            <TextField
                                label="Delivery Address"
                                variant="outlined"
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                placeholder="Enter your delivery address"
                            />
                        </Box>

                        <Box mt={2}>
                            <TextField
                                label="Additional Notes (Optional)"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add any special instructions (e.g., delivery instructions)"
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            disabled={loading} // Disable button while loading
                            startIcon={loading ? <CircularProgress size={24} /> : null} // Show spinner when loading
                        >
                            {loading ? 'Processing...' : 'Confirm Order'}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default PlaceAnOrder;
