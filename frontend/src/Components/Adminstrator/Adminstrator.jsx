import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    List,
    ListItemButton,
    ListItemText,
    Typography,
    Card,
    CardContent,
    Box,
    Button,
    Grid,
    TextField,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Divider,
    Avatar,
    FormControl,
    InputLabel
} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Messaging from "../Messaging/Messaging";
import Notifications from "../Notifications/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";  // Import the Settings icon
import './Administrator.scss';
import Settings from "../Settings/Settings";
// import { getAllUsers } from "../../Supabase/Login/AllUsers";
import OrdersList from '../OrdersList/OrdersList'

const Administrator = ({ handleAddUserSubmit, setEmail, setPassword, email, password, username, setUsername, setRole, role, user, userCode, setUserCode }) => {
    const [selectedTab, setSelectedTab] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [category, setCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [totalAmount, setTotalAmount] = useState('');

    // const [allUsers, setAllUsers] = useState([])

    const navigate = useNavigate();
    const administratorTabs = [
        { tab: "Users", icon: <PersonIcon /> },
        { tab: "Menu", icon: <InboxIcon /> },
        { tab: "Messages", icon: <MailIcon /> },
        { tab: "Notifications", icon: <SupportAgentIcon /> },
        { tab: "Orders", icon: <ShoppingCartIcon /> },
        { tab: "Settings", icon: <SettingsIcon /> },  // Add the Settings icon here

    ];

    const userDetails = user || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSignOutClick = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.clear();
        navigate('/');
    };
    const handleGenerateCustomerAccessCode = () => {
        const generateCode = uuidv4()
        setUserCode(generateCode)
    }

    return (
        <div className="administrator-container">
            <Grid container>
                <Box className="user-profile">
                    <Avatar sx={{ width: 60, height: 60, marginBottom: 2 }} />
                    <Typography variant="h6" color="#1976d2" className="welcome-text">
                        Hi {userDetails.username}, <br />Welcome to Kota and Grills admin portal!
                    </Typography>
                </Box>
                <Box className="user-profile" mt={2}>
                    <Typography variant="h6" color="#1976d2" className="welcome-text">
                        Role: {userDetails && userDetails.role}
                    </Typography>
                </Box>
                <Grid item className="sidebar">
                    <Card className="sidebar-card">
                        <CardContent>
                            <Divider sx={{ margin: '10px 0' }} />
                            <List className="sidebar-list">
                                {administratorTabs.map((item) => (
                                    <ListItemButton
                                        key={item.tab}
                                        onClick={() => handleTabClick(item.tab)}
                                        className={`tab-button ${selectedTab === item.tab ? 'active' : ''}`}
                                        style={{
                                            display: user.role === "Admin" || (item.tab !== "Notifications" && item.tab !== "Users") ? "block" : "none"
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" gap={2}>
                                            {item.icon}
                                            <ListItemText primary={item.tab} />
                                        </Box>
                                    </ListItemButton>
                                ))}

                            </List>
                            <Grid container justifyContent="flex-end" className="signout-container">
                                <IconButton onClick={handleSignOutClick} className="signout-button">
                                    <Typography>Sign Out</Typography>
                                </IconButton>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Full Screen Modal (Dialog) */}
            <Dialog open={openModal} onClose={handleCloseModal} fullScreen className="dialog-container">
                <DialogContent sx={{ p: 0 }}>
                    {selectedTab === "Users" && (
                        <>
                            <Card className="form-card">
                                <CardContent>
                                    <Typography variant="h6" mb={2} className="form-title">Add New User</Typography>

                                    <FormControl fullWidth>
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            label="Role"
                                            fullWidth
                                            margin="normal"
                                        >
                                            <MenuItem value="Admin">Admin</MenuItem>
                                            <MenuItem value="User">User</MenuItem>
                                            <MenuItem value="Customer">Customer</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Username"
                                        fullWidth
                                        margin="normal"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        label="Email"
                                        fullWidth
                                        margin="normal"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {role !== "Customer" &&
                                        <>
                                            <TextField
                                                label="Password"
                                                fullWidth
                                                margin="normal"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </>
                                    }

                                    {role === "Customer" &&
                                        <>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={handleGenerateCustomerAccessCode}
                                                sx={{ mt: 2 }}
                                            >
                                                Generate customer auth
                                            </Button>
                                            <TextField
                                                label="Access code"
                                                fullWidth
                                                margin="normal"
                                                type="text"
                                                value={userCode}
                                                disabled
                                            />
                                        </>
                                    }

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddUserSubmit}
                                        sx={{ mt: 2 }}
                                    >
                                        Add User
                                    </Button>
                                </CardContent>
                            </Card>
                            {/* <br />
                            <Typography>User list</Typography>
                            <br /> */}


                        </>
                    )}
                    {selectedTab === "Menu" && (
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h6" className="form-title">Add a New Menu Item</Typography>
                            <Card className="form-card">
                                <CardContent>
                                    <Select
                                        label="Category"
                                        fullWidth
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        margin="normal"
                                        required
                                    >
                                        <MenuItem value="">Select a Category</MenuItem>
                                        <MenuItem value="Kota">Kota</MenuItem>
                                        <MenuItem value="Extras">Extras</MenuItem>
                                        <MenuItem value="Chips">Chips</MenuItem>
                                        <MenuItem value="Beverages">Beverages</MenuItem>
                                    </Select>

                                    <TextField
                                        label="Item Name"
                                        fullWidth
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                        margin="normal"
                                        required
                                    />
                                    <input
                                        type="file"
                                        onChange={(e) => setImageUrl(URL.createObjectURL(e.target.files[0]))}
                                        required
                                    />
                                    <TextField
                                        label="Ingredients (comma separated)"
                                        fullWidth
                                        value={ingredients}
                                        onChange={(e) => setIngredients(e.target.value)}
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="Total Amount"
                                        fullWidth
                                        type="number"
                                        value={totalAmount}
                                        onChange={(e) => setTotalAmount(e.target.value)}
                                        margin="normal"
                                        required
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        sx={{ mt: 2 }}
                                        disabled={!category || !itemName || !imageUrl || !ingredients || !totalAmount}
                                    >
                                        Add Menu Item
                                    </Button>
                                </CardContent>
                            </Card>
                        </form>
                    )}
                    {selectedTab === "Messages" && <Messaging userDetails={userDetails} />}
                    {selectedTab === "Notifications" && <Notifications />}
                    {selectedTab === "Orders" && (

                        <OrdersList user={user} />
                    )}
                    {selectedTab === "Settings" && (
                        <Settings userDetails={userDetails} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Administrator;
