import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import Background from '../../Asserts/download (4).jpeg';
import Navbar from '../Navbar/Navbar';

const ForgotPassword = ({ loginTabs, setLoginTab, loginTab }) => {
    return (
        <Box className='Login'>
            <Navbar />
            <Box sx={{ position: "relative", height: "100vh" }}>
                <img src={Background} alt="background Kota" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: "white" }}>
                    <Typography variant="h2" sx={{ fontWeight: "bold" }}>Forgot Password</Typography>
                </Box>
            </Box>

            <Box sx={{ padding: 4 }}>
                <Box className="login-form" sx={{ background: 'rgba(255, 255, 255, 0.8)', padding: 3, borderRadius: 2 }}>
                    <form>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                            />
                        </Box>

                        <Box className="login-form-guest-forgotPassword" sx={{ marginBottom: 2 }}>
                            {loginTabs.map((tab) => (
                                <Link to={`/${tab}`} key={tab}>
                                    <Typography 
                                        sx={{ 
                                            display: tab === "Forgot password" && "none", 
                                            cursor: "pointer", 
                                            textDecoration: "underline",
                                            color: "#00796b" 
                                        }} 
                                        onClick={() => setLoginTab(tab)}
                                    >
                                        {tab}
                                    </Typography>
                                </Link>
                            ))}
                        </Box>

                        <Box sx={{ marginTop: 2 }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                fullWidth 
                                type="button"
                            >
                                Reset Password
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default ForgotPassword;
