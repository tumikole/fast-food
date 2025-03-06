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
    Box
} from '@mui/material';
import BankCard from '../BankCard/BankCard';

const PlaceAnOrder = () => {
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [collectionType, setCollectionType] = useState('delivery');
    const [orderData, setOrderData] = useState(null);
    const navigate = useNavigate();

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

        Swal.fire({
            title: `Are you sure about ${paymentMethod === "online" ? `Online payment - ${collectionType}` : paymentMethod}?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                const orderNumber = uuidv4().slice(0, 12);
                const finalOrder = {
                    ...orderData,
                    paymentMethod: paymentMethod === "online" ? `Online payment - ${collectionType}` : paymentMethod,
                    collectionType,
                    orderNumber,
                };
                localStorage.setItem('userOrdering', JSON.stringify(finalOrder));
                Swal.fire("Successfully saved order!", "", "success");
                navigate("/order_tracking");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <div>
            <Navbar />
            <Container>
                <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Order Payment
                    </Typography>
                    <form onSubmit={handleSubmit} >
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend">Select Payment Method</FormLabel>
                            <RadioGroup
                                value={paymentMethod}
                                onChange={(event) => setPaymentMethod(event.target.value)}
                            >
                                <FormControlLabel value="online" control={<Radio />} label="Online Payment" />
                                <FormControlLabel value="cash-on-delivery" control={<Radio />} label="Cash on Delivery" />
                                <FormControlLabel value="cash-on-pickup" control={<Radio />} label="Cash on Pickup" />
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === 'online' && (
                            <Box mt={2}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend">Select Collection Type</FormLabel>
                                    <RadioGroup
                                        value={collectionType}
                                        onChange={(event) => setCollectionType(event.target.value)}
                                    >
                                        <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
                                        <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
                                    </RadioGroup>
                                </FormControl>
                                <BankCard />
                            </Box>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Confirm Order
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>

    );
};

export default PlaceAnOrder;
