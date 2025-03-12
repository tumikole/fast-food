import React, { useState, useEffect } from 'react';
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
import { addOrdererInformation } from '../../Supabase/OrdererInformation/OrdererInformation'; // Fixed import
import BankCard from '../BankCard/BankCard';

const PlaceAnOrder = () => {
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [collectionType, setCollectionType] = useState('delivery');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();

    // Handle orderer information submission
    const handleOrdererInformation = async () => {
        if (name && phoneNumber && address) {
            await addOrdererInformation(name, phoneNumber, address, notes);
        }
    };

    useEffect(() => {
        const storedOrder = localStorage.getItem('userOrdering');
        if (storedOrder) {
            setOrderData(JSON.parse(storedOrder));
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!orderData) {
            Swal.fire("No order details found!", "Please start again.", "error");
            return;
        }

        if (!name || !phoneNumber || !address) {
            Swal.fire("Please fill in all required fields!", "Name, Phone Number, and Address are required.", "error");
            return;
        }

        Swal.fire({
            title: `Are you sure about ${paymentMethod === "online" ? `Online payment - ${collectionType}` : paymentMethod}?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Confirm Order",
            denyButtonText: `Cancel`
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true); // Start loading
                const orderNumber = uuidv4().slice(0, 12);
                const finalOrder = {
                    ...orderData,
                    paymentMethod: paymentMethod === "online" ? `Online payment - ${collectionType}` : paymentMethod,
                    collectionType,
                    orderNumber,
                };
                localStorage.setItem('userOrdering', JSON.stringify(finalOrder));

                await handleOrdererInformation(); // Save the orderer information
                setLoading(false); // Stop loading after saving information

                Swal.fire("Order successfully placed!", "You will be redirected to the order tracking page.", "success");
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
                                <FormControlLabel value="online" control={<Radio />} label="Online Payment" />
                                <FormControlLabel value="delivery" control={<Radio />} label="Cash on Delivery" />
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === 'online' && (
                            <Box mt={2}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend">Choose Collection Type</FormLabel>
                                    <RadioGroup
                                        value={collectionType}
                                        onChange={(event) => setCollectionType(event.target.value)}
                                    >
                                        <FormControlLabel value="delivery" control={<Radio />} label="Home Delivery" />
                                        <FormControlLabel value="pickup" control={<Radio />} label="Pickup from Store" />
                                    </RadioGroup>
                                </FormControl>
                                <BankCard />
                            </Box>
                        )}

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
