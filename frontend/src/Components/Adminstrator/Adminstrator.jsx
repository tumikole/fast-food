import React, { useState } from "react";
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
    DialogTitle,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { signUp } from '../../Supabase/Login/SignUp';

const Administrator = ({ handleAddUserSubmit, setEmail, setPassword, email, password, username, setUsername, setRole, role }) => {
    const [selectedTab, setSelectedTab] = useState("");
    const [openModal, setOpenModal] = useState(false); // State to control modal visibility
    const [category, setCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [totalAmount, setTotalAmount] = useState('');

    const administratorTabs = [
        { tab: "Users", icon: <PersonIcon /> },
        { tab: "Menu", icon: <InboxIcon /> },
        { tab: "Messages", icon: <MailIcon /> },
        { tab: "Notifications", icon: <SupportAgentIcon /> },
        { tab: "Orders", icon: <ShoppingCartIcon /> }
    ];

    // Safely parse user details
    const userDetails = JSON.parse(localStorage.getItem('sb-ccovgcyugrypthfgduxm-auth-token')) || {};
    const userEmail = userDetails?.user?.email || "Admin";

    const handleAddUser = async () => {
        await signUp();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle the form submission logic here for the Menu tab
        console.log("Submitting menu item:", { category, itemName, imageUrl, ingredients, totalAmount });
    };

    // Handle open modal when a tab is clicked
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setOpenModal(true); // Open modal when a tab is clicked
    };

    // Close modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div className="administrator">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Welcome, {userEmail}</Typography>
                            <List>
                                {administratorTabs.map((item) => (
                                    <ListItemButton key={item.tab} onClick={() => handleTabClick(item.tab)}>
                                        <Box display="flex" alignItems="center">
                                            {item.icon}
                                            <ListItemText primary={item.tab} />
                                        </Box>
                                    </ListItemButton>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Full Screen Modal (Dialog) */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                fullScreen
            >
                <DialogTitle>{selectedTab}</DialogTitle>
                <DialogContent>
                    {/* Content changes based on selectedTab */}
                    {selectedTab === "Users" && (
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Add User</Typography>
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
                                <TextField
                                    label="Password"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Select
                                    fullWidth
                                    label="Role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    margin="normal"
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="User">User</MenuItem>
                                </Select>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddUser}
                                    sx={{ mt: 2 }}
                                >
                                    Add User
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                    {selectedTab === "Menu" && (
                        <form onSubmit={handleSubmit}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Add a New Menu Item</Typography>

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
                                    {/* Replace this with a proper file input for images */}
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
                                        disabled={!category || !itemName || !imageUrl || !ingredients || !totalAmount }
                                    >
                                        Add Menu Item
                                    </Button>
                                </CardContent>
                            </Card>
                        </form>
                    )}
                    {selectedTab === "Messages" && (
                        <Typography variant="body1">
                            <h2>Messages</h2>
                            <List>
                                <ListItemButton>
                                    <ListItemText primary="Message from User1" />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Message from User2" />
                                </ListItemButton>
                            </List>
                        </Typography>
                    )}
                    {selectedTab === "Notifications" && (
                        <Typography variant="body1">
                            <h2>Notifications</h2>
                            <List>
                                <ListItemButton>
                                    <ListItemText primary="New User Registration" />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Order #1234 Shipped" />
                                </ListItemButton>
                            </List>
                        </Typography>
                    )}
                    {selectedTab === "Orders" && (
                        <Typography variant="body1">
                            <h2>Orders</h2>
                            <List>
                                <ListItemButton>
                                    <ListItemText primary="Order #1001 - Pending" />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Order #1002 - Completed" />
                                </ListItemButton>
                            </List>
                        </Typography>
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
