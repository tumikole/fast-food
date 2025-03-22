import React, { useState, useEffect } from "react";
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
    InputLabel,
    ListItem,
    ListItemAvatar,
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
import { fetchClientsUsers, fetchUsers } from "../../Supabase/Login/AllUsers";

const Administrator = ({
    handleAddUserSubmit,
    setEmail, setPassword,
    email, password,
    username,
    setUsername,
    setRole,
    role,
    user,
    userCode,
    setUserCode,
    message
}) => {

    const [selectedTab, setSelectedTab] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [category, setCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsersTab, setSelectedUsersTab] = useState('Admin users');
    const [loading, setLoading] = useState(false);
    const [selectedUserPageTab, setSelectedUserPageTab] = useState("Users");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Initialize dropdown state


    const navigate = useNavigate();
    const administratorTabs = [
        { tab: "Users", icon: <PersonIcon /> },
        { tab: "Menu", icon: <InboxIcon /> },
        { tab: "Messages", icon: <MailIcon /> },
        { tab: "Notifications", icon: <SupportAgentIcon /> },
        { tab: "Orders", icon: <ShoppingCartIcon /> },
        { tab: "Settings", icon: <SettingsIcon /> },  // Add the Settings icon here

    ];

    const userTabs = ["Admin users", "Customers"]
    const tabs = ["Users", "Add users"]


    const userDetails = user || {};


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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

    const fetchAllAdminUsers = async () => {
        const userData = await fetchUsers();
        if (userData) {
            setUsers(userData);
        }
    };

    const fetchAllClientsUsers = async () => {
        const userData = await fetchClientsUsers();
        if (userData) {
            setUsers(userData);
        }
    };




    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                if (selectedUsersTab === "Admin users") {
                    await fetchAllAdminUsers();
                } else if (selectedUsersTab === "Customers") {
                    await fetchAllClientsUsers();
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [selectedUsersTab]);



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
                            <ul
                                className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm"
                                id="pillNav2"
                                role="tablist"
                                style={{
                                    '--bs-nav-link-color': 'var(--bs-white)',
                                    '--bs-nav-pills-link-active-color': 'var(--bs-primary)',
                                    '--bs-nav-pills-link-active-bg': 'var(--bs-white)',
                                    marginTop: "2rem",
                                    marginLeft: "1.1rem",
                                    marginRight: "1.1rem",

                                }}
                            >
                                {tabs.map((item, idx) => (
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${selectedUserPageTab === item ? "active" : ""} rounded-5`}
                                            id="home-tab2"
                                            data-bs-toggle="tab"
                                            type="button"
                                            role="tab"
                                            aria-selected="true"
                                            onClick={() => setSelectedUserPageTab(item)}

                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {selectedUserPageTab === "Add users" &&

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
                                            style={{ display: role ? "block" : "none" }}
                                        />
                                        <TextField
                                            label="Email"
                                            fullWidth
                                            margin="normal"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{ display: username ? "block" : "none" }}

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
                                                    style={{ display: email ? "block" : "none" }}

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
                                                    style={{ display: email ? "block" : "none" }}

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
                                                    style={{ display: userCode ? "block" : "none" }}

                                                />
                                            </>
                                        }

                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={handleAddUserSubmit}
                                            sx={{ mt: 2 }}
                                            style={{ display: userCode || password ? "block" : "none" }}
                                        >
                                            Add {role}
                                        </Button>
                                    </CardContent>
                                    {message.success && (
                                        <div className="alert alert-success" role="alert">
                                            {message.success}
                                        </div>
                                    )}

                                    {message.danger && (
                                        <div className="alert alert-danger" role="alert">
                                            {message.danger}
                                        </div>
                                    )}

                                    {message.warning && (
                                        <div className="alert alert-warning" role="alert">
                                            {message.warning}
                                        </div>
                                    )}

                                </Card>
                            }
                            {
                                selectedUserPageTab === "Users" &&

                                <CardContent marginBottom={2} marginLeft={2} marginRight={2}>
                                    <Typography variant="h6">User list</Typography>
                                    <br />
                                    <ul
                                        className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm"
                                        id="pillNav2"
                                        role="tablist"
                                        style={{
                                            '--bs-nav-link-color': 'var(--bs-white)',
                                            '--bs-nav-pills-link-active-color': 'var(--bs-primary)',
                                            '--bs-nav-pills-link-active-bg': 'var(--bs-white)',
                                        }}
                                    >
                                        {userTabs.map((item, idx) => (
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${selectedUsersTab === item ? "active" : ""} rounded-5`}
                                                    id="home-tab2"
                                                    data-bs-toggle="tab"
                                                    type="button"
                                                    role="tab"
                                                    aria-selected="true"
                                                    onClick={() => setSelectedUsersTab(item)}

                                                >
                                                    {item}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    <br />
                                    {loading ? (
                                        <Typography>Loading users...</Typography>
                                    ) : users.length > 0 ? (
                                        <List>
                                            {users.map((item, idx) => (
                                                <ListItem key={idx} sx={{ backgroundColor: item.email === user.email ? "#eee" : "white", borderBottom: item.email === user.email ? "1px solid #0d6efd" : "1px solid green", padding: "8px 16px" }}>
                                                    <ListItemAvatar>
                                                        <Avatar>{item.username.charAt(0)}</Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={item.username}
                                                        secondary={`Role: ${item.role}`}
                                                        sx={{
                                                            fontWeight: "bold",
                                                            marginBottom: "4px"
                                                        }}
                                                    />
                                                    {selectedUsersTab === "Customers" &&
                                                        <>
                                                            {/* <box-icon name='edit-alt' ></box-icon> */}
                                                            {/* <box-icon name='checkbox-checked' color='#008000' ></box-icon>
                                                            <box-icon name='checkbox' color='#FFA500' ></box-icon> */}
                                                            {/* <box-icon name='trash' type='solid' color='#ff0000' ></box-icon> */}
                                                        </>
                                                    }


                                                    {item.email === user.email ? (
                                                        <box-icon color="#0d6efd" name="user-circle"></box-icon>
                                                    ) : (
                                                        <>
                                                            <div className="dropdown">
                                                                <box-icon onClick={toggleDropdown} name="dots-vertical-rounded"></box-icon>
                                                                {isDropdownOpen && (
                                                                    <ul className="dropdown-menu" style={{ listStyleType: 'none', padding: 0, marginTop: '10px' }}>
                                                                        <li style={{ padding: '5px 10px' }}>
                                                                            <box-icon name="edit-alt"></box-icon> Edit
                                                                        </li>
                                                                        <li style={{ padding: '5px 10px', color: '#008000' }}>
                                                                            <box-icon name="checkbox-checked" color="#008000"></box-icon> Active
                                                                        </li>
                                                                        <li style={{ padding: '5px 10px', color: '#FFA500' }}>
                                                                            <box-icon name="checkbox" color="#FFA500"></box-icon> Pending
                                                                        </li>
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                </ListItem>

                                            ))
                                            }
                                        </List>
                                    ) : (
                                        <Typography>No users found</Typography>
                                    )}
                                </CardContent>
                            }
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
