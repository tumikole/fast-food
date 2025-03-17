import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Grid
} from '@mui/material';
import '../Login.scss'
// import supabase from '../../../Supabase/supabase.config';
import Background from '../../../Asserts/download (4).jpeg';
import Navbar from '../../Navbar/Navbar';

const CustomerLogin = ({ loginTabs, setLoginTab, loginTab }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // try {
        //     const { data, error } = await supabase.auth.signInWithPassword({
        //         email,
        //         // Add password field if needed
        //     });

        //     if (error) throw error;

        // } catch (error) {
        //     setError(error.message);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <Box className="Login">
            <Navbar />
            <Box sx={{ position: "relative", height: "100vh" }}>
                <img src={Background} alt="background Kota" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
                {/* <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: "white" }}>
                    <Typography variant="h2" sx={{ fontWeight: "bold" }}>Sign In</Typography>
                </Box> */}
            </Box>

            <Box sx={{ padding: 4 }}>
                <Box className="login-form" sx={{ background: 'rgba(255, 255, 255, 0.8)', padding: 3, borderRadius: 2 }}>
                    <form onSubmit={handleLogin}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box className="login-form-guest-forgotPassword">
                                    {loginTabs.map((tab) => (
                                        <Typography
                                            key={tab}
                                            sx={{
                                                display: tab === loginTab || tab === "Forgot password" ? "none" : "block",
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                                color: "#00796b",
                                                marginBottom: 1
                                            }}
                                            onClick={() => setLoginTab(tab)}
                                        >
                                            {tab}
                                        </Typography>
                                    ))}
                                </Box>
                            </Grid>

                            {error && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        {error}
                                    </Alert>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Authorizing...' : 'Authorize'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default CustomerLogin;
