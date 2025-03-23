import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid
} from '@mui/material';
import '../Login.scss'
import Background from '../../../Asserts/download (4).jpeg';
import Navbar from '../../Navbar/Navbar';

const CustomerLogin = ({ loginTabs, setLoginTab, loginTab, userCode, setUserCode, loginUser }) => {


    return (
        <Box className="Login">
            <Navbar />
            <Box sx={{ position: "relative", height: "100vh" }}>
                <img src={Background} alt="background Kota" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
            </Box>

            <Box sx={{ padding: 4 }}>
                <Box className="login-form" sx={{ background: 'rgba(255, 255, 255, 0.8)', padding: 3, borderRadius: 2 }}>
                    <form onSubmit={loginUser}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Enter client code..."
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => setUserCode(e.target.value)}
                                    value={userCode}
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

                            {/* {error && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        {error}
                                    </Alert>
                                </Grid>
                            )} */}

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    // disabled={loading}
                                >
                                    Authorize
                                    {/* {loading ? 'Authorizing...' : 'Authorize'} */}
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
