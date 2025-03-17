import React from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import Background from '../../Asserts/download (4).jpeg';
import Navbar from '../Navbar/Navbar';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import CustomerLogin from './CustomerLogin/CustomerLogin';

const Login = ({ loginTabs, setLoginTab, loginTab, loginUser, setEmail, setPassword, email, password }) => {

    if (loginTab === "Login") {
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
                        <form onSubmit={loginUser}>
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
                                    <TextField
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Box className="login-form-guest-forgotPassword">
                                        {loginTabs.map((tab) => (
                                            // <Link to={`/${tab === "Forgot password" ? "forgot_password" : tab}`} key={tab}>
                                                <Typography 
                                                    sx={{ 
                                                        display: tab === loginTab && "none", 
                                                        cursor: "pointer", 
                                                        textDecoration: "underline",
                                                        color: "#00796b" 
                                                    }} 
                                                    onClick={() => setLoginTab(tab)}
                                                >
                                                    {tab}
                                                </Typography>
                                            // </Link>
                                        ))}
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        fullWidth 
                                        type="submit"
                                    >
                                        Sign In
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Box>
        );
    } else if (loginTab === "Forgot password") {
        return <ForgotPassword />;
    } else if (loginTab === "Customer Login") {
        return <CustomerLogin loginTabs={loginTabs} setLoginTab={setLoginTab} loginTab={loginTab} />;
    }

    return null; // In case no login tab is selected
}

export default Login;
