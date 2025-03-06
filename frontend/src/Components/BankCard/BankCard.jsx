import React, { useState } from "react";
import { TextField, Card, CardContent, Grid, Typography } from "@mui/material";
import "./BankCard.scss";

export default function BankCard() {
    const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
    const [expiry, setExpiry] = useState("");
    const [ccv, setCcv] = useState("");
    const [cardholder, setCardholder] = useState("");

    const handleCardNumberChange = (index, value) => {
        const newCardNumber = [...cardNumber];
        newCardNumber[index] = value;
        setCardNumber(newCardNumber);
    };

    return (
        <Card className="bank-card">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Process Transaction
                </Typography>

                <Grid container spacing={2}>
                    {/* Card Number Inputs */}
                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom>
                            Card Number
                        </Typography>
                        <Grid container spacing={1}>
                            {cardNumber.map((num, index) => (
                                <Grid item xs={3} key={index}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        inputProps={{ maxLength: 4 }}
                                        value={num}
                                        onChange={(e) =>
                                            handleCardNumberChange(index, e.target.value)
                                        }
                                        placeholder={index === 0 ? "5280" : "****"}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Expiry & CCV */}
                    <Grid item xs={6}>
                        <Typography variant="body2">Valid Thru</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            inputProps={{ maxLength: 5 }}
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM/YY"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">CCV</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            inputProps={{ maxLength: 3 }}
                            value={ccv}
                            onChange={(e) => setCcv(e.target.value)}
                            placeholder="123"
                        />
                    </Grid>

                    {/* Cardholder Name */}
                    <Grid item xs={12}>
                        <Typography variant="body2">Name on Card</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={cardholder}
                            onChange={(e) => setCardholder(e.target.value)}
                            placeholder="John Doe"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
