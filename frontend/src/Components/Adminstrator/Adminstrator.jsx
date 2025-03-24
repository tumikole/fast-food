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
    CardMedia
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
import AdminstratorClient from "../AdminstratorClient/AdminstratorClient";
import { addMenuItems, getAllMenuItems} from "../../Supabase/addMenuItems/addMenuItems";
import EditDeleteModal from "./EditDeleteModal/EditDeleteModal";
import Spinner from "../Spinner/Spinner";

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
    message,
    setMessage
}) => {

    const [selectedTab, setSelectedTab] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [category, setCategory] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [itemName, setItemName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [totalAmount, setTotalAmount] = useState('0.00');
    const [users, setUsers] = useState([]);
    const [selectedUsersTab, setSelectedUsersTab] = useState('Admin users');
    const [selectedMenuTab, setSelectedMenuTab] = useState('Menu list');
    const [loading, setLoading] = useState(false);
    const [selectedUserPageTab, setSelectedUserPageTab] = useState("Users");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Initialize dropdown state
    const [allMenuItems, setAllMenuItems] = useState([]);
    const [openEditDeleteModal, setOpenEditDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [categoryList, setCategoriesList] = useState([]);





    const fetchAllMenuItems = async () => {
        const userData = await getAllMenuItems();

        if (userData) {
            setAllMenuItems(userData);
            const list = [...new Set(userData.map(item => item.category))];
            setCategoriesList(list);
        }

    };

    const filterByCategory = async (item) => {

        // Ensure that allMenuItems is not undefined or null before proceeding
        if (!Array.isArray(allMenuItems)) {
            console.error("allMenuItems is not an array or not initialized correctly.");
            return;
        }

        // Fetch all menu items once and filter them based on the category
        setLoading(true);
        await fetchAllMenuItems();

        // Filter items based on category selection
        let dataItems;
        if (item === "All") {
            dataItems = allMenuItems; // Use allMenuItems directly for "All" category
        } else if (item === "Kota" || item === "Kota") {
            dataItems = allMenuItems.filter(items => items.category === "Kota");
        } else if (item === "Chips" || item === "Chips") {
            dataItems = allMenuItems.filter(items => items.category === "Chips");
        } else if (item === "Extras" || item === "Extras") {
            dataItems = allMenuItems.filter(items => items.category === "Extras");
        } else if (item === "Beverages" || item === "Beverages") {
            dataItems = allMenuItems.filter(items => items.category === "Beverages");
        } else {
            // If an invalid category is selected, return early
            console.error(`Category '${item}' is invalid.`);
            return;
        }

        // Update state with filtered items
        setAllMenuItems(dataItems);
        setLoading(false);
    };



    const handleAddIngredient = () => {
        if (category === "Kota") {

            if (ingredient.trim() !== "") {
                setIngredients((prev) => [...prev, ingredient]);
                setIngredient(""); // Clear the input field after adding
            }
        } else {
            if (ingredient.trim() !== "") {
                setIngredients((prev) => [...prev, { ingredient, totalAmount }]);
                setIngredient(""); // Clear the input field after adding]
                setTotalAmount("0.00")
            }
        }
    };

    const addMenu = async (e) => {
        e.preventDefault()
        if (itemName && imageUrl && ingredients) {

            try {
                const result = await addMenuItems(category, itemName, imageUrl, ingredients, totalAmount);
                if (result.status === "Ok") {
                    setAllMenuItems("Menu list")
                    setCategory('');
                    setItemName('');
                    setImageUrl('');
                    setIngredients([]);
                    setTotalAmount('00.00');
                    setMessage({ success: 'Menu item added successfully!' })
                    setTimeout(async () => {
                        setMessage("")
                        await fetchAllMenuItems()
                        setSelectedMenuTab("Menu list")
                    }, 3000);

                }
            } catch (err) {
                console.error('Error adding menu item:', err);
                alert('Failed to add menu item');
            }
        } else {
            alert('Please fill in all the fields.');
        }
    };

    const handleEditDeleteOpenModalClose = () => {
        setOpenEditDeleteModal(false);
        setSelectedItem(null);
    };

    const handleViewItem = (item) => {
        setSelectedItem(item);
        setOpenEditDeleteModal(true);
    };


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
    const menuTabs = ["Menu list", "Add menu"]



    const userDetails = user || {};


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSignOutClick = () => {
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

        if (allMenuItems.length === 0) {
            fetchAllMenuItems()
        }
        fetchUsers();
    }, [selectedUsersTab, allMenuItems]);


    if (userDetails && userDetails.role !== "Customer") {
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
                                            <Spinner />

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
                            <>
                                <CardContent marginBottom={2} marginLeft={2} marginRight={2} >
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
                                        {menuTabs.map((item, idx) => (
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${selectedMenuTab === item ? "active" : ""} rounded-5`}
                                                    id="home-tab2"
                                                    data-bs-toggle="tab"
                                                    type="button"
                                                    role="tab"
                                                    aria-selected="true"
                                                    onClick={() => setSelectedMenuTab(item)}

                                                >
                                                    {item}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    {
                                        selectedMenuTab === "Add menu" &&

                                        <form>
                                            <Typography marginTop={2} className="form-title">Add a New Menu Item</Typography>
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
                                                    {category &&
                                                        <>
                                                            <TextField
                                                                label="Item Name"
                                                                fullWidth
                                                                value={itemName}
                                                                onChange={(e) => setItemName(e.target.value)}
                                                                margin="normal"
                                                                required
                                                            />
                                                            <label htmlFor="">Upload menu image</label>
                                                            <Box display="flex" gap="2rem" mt="1rem">
                                                                {/* File input for selecting an image */}
                                                                <input
                                                                    type="file"
                                                                    id="file-input"  // Unique id for file selection
                                                                    accept="image/*"
                                                                    onChange={(e) => setImageUrl(e.target.files[0])}
                                                                    required
                                                                    style={{ display: "none" }}
                                                                />
                                                                <input
                                                                    type="file"
                                                                    id="camera-input"  // Unique id for camera capture
                                                                    accept="image/*"
                                                                    capture="camera"  // Opens the camera on mobile devices
                                                                    onChange={(e) => setImageUrl(e.target.files[0])}
                                                                    required
                                                                    style={{ display: "none" }}
                                                                />

                                                                {/* Labels that trigger the file input */}
                                                                <label htmlFor="file-input">
                                                                    <box-icon size="md" name="upload"></box-icon>
                                                                </label>

                                                                <label htmlFor="camera-input">
                                                                    <box-icon size="md" name="camera"></box-icon>
                                                                </label>
                                                            </Box>


                                                            <>
                                                                <Box display="flex" gap="1rem">
                                                                    <TextField
                                                                        label="Ingredient"
                                                                        fullWidth
                                                                        value={ingredient}
                                                                        onChange={(e) => setIngredient(e.target.value)}
                                                                        margin="normal"
                                                                    />
                                                                    {category !== "Kota" &&
                                                                        <TextField
                                                                            type="number"
                                                                            label="Price"
                                                                            fullWidth
                                                                            value={totalAmount}
                                                                            onChange={(e) => setTotalAmount(e.target.value)}
                                                                            margin="normal"
                                                                            required
                                                                        />
                                                                    }
                                                                </Box>
                                                                <Box mb="1rem">
                                                                    <label htmlFor="">Add ingridient to list...</label>
                                                                </Box>
                                                                <Box onClick={handleAddIngredient}>
                                                                    <box-icon size="md" name='add-to-queue'></box-icon>
                                                                </Box>

                                                                {ingredients.length > 0 && (
                                                                    <Box sx={{ mt: 2 }}>
                                                                        <Typography
                                                                            variant="h6"
                                                                            color="text.primary"
                                                                            sx={{ mb: 1, fontWeight: "bold" }}
                                                                        >
                                                                            Ingredients:
                                                                        </Typography>
                                                                        <ul style={{ paddingLeft: "20px", margin: 0 }}>
                                                                            {category === "Kota" ? (
                                                                                ingredients.map((item, idx) => (
                                                                                    <Typography
                                                                                        key={idx}
                                                                                        variant="body2"
                                                                                        color="text.secondary"
                                                                                        sx={{ mb: 0.5, listStyleType: "circle" }}
                                                                                        component="li"
                                                                                    >
                                                                                        Menu item: {item}
                                                                                    </Typography>
                                                                                ))
                                                                            ) : (
                                                                                ingredients.map((item, idx) => (
                                                                                    <Typography
                                                                                        key={idx}
                                                                                        variant="body2"
                                                                                        color="text.secondary"
                                                                                        sx={{ mb: 0.5, listStyleType: "circle" }}
                                                                                        component="li"
                                                                                    >
                                                                                        Menu item: {item.ingredient} - Price: R {item.totalAmount}
                                                                                    </Typography>
                                                                                ))
                                                                            )}
                                                                        </ul>
                                                                    </Box>
                                                                )}


                                                                <TextField
                                                                    style={{ display: category === "Kota" ? "block" : "none" }}
                                                                    type="number"
                                                                    label="Total Price"
                                                                    fullWidth
                                                                    value={totalAmount}
                                                                    onChange={(e) => setTotalAmount(e.target.value)}
                                                                    margin="normal"
                                                                    required
                                                                />
                                                            </>

                                                            <Button
                                                                fullWidth
                                                                variant="contained"
                                                                color="primary"
                                                                type="submit"
                                                                sx={{ mt: 2 }}
                                                                disabled={ingredients.length <= 0}
                                                                onClick={addMenu}
                                                            >
                                                                Add Menu Item
                                                            </Button>
                                                        </>
                                                    }
                                                </CardContent>
                                                {message.success && (
                                                    <div className="alert alert-success" role="alert">
                                                        {message.success}
                                                    </div>
                                                )}
                                            </Card>
                                        </form>
                                    }
                                    {selectedMenuTab === "Menu list" && (
                                        <Box sx={{ padding: "8px 16px" }}>
                                            <Typography variant="h6">Menu List</Typography>
                                            <Box sx={{ mt: 2, mb: 2 }}>
                                                <Typography sx={{ mt: 2, mb: 2 }}>Filter by category</Typography>
                                                <Select
                                                    label="Category"
                                                    fullWidth
                                                    onChange={(e) => filterByCategory(e.target.value)}
                                                    margin="normal"
                                                    required
                                                >
                                                    <MenuItem value="All">All</MenuItem>

                                                    {categoryList && categoryList.map((item, idx) => {
                                                        return (
                                                            <MenuItem key={idx} value={item}>{item}</MenuItem>
                                                        )
                                                    })}

                                                </Select>
                                            </Box>
                                            {message.success && (
                                                    <div className="alert alert-success" role="alert">
                                                        {message.success}
                                                    </div>
                                                )}
                                            <List
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    // padding: "16px",
                                                }}
                                            >
                                                {
                                                    loading ?
                                                        <Spinner />
                                                        :
                                                        allMenuItems &&
                                                        allMenuItems.map((item) => (
                                                            <Card
                                                                key={item.id}
                                                                sx={{
                                                                    margin: "8px",
                                                                    width: "100%",
                                                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                                                    borderRadius: "8px",
                                                                }}
                                                            >
                                                                <CardMedia
                                                                    component="img"
                                                                    height="350"
                                                                    image={item.imageUrl}
                                                                    alt={item.itemName}
                                                                    sx={{
                                                                        borderTopLeftRadius: "8px",
                                                                        borderTopRightRadius: "8px",
                                                                    }}
                                                                />
                                                                <CardContent>
                                                                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                                                                        {item.itemName}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                                        Category: {item.category}
                                                                    </Typography>

                                                                    {Array.isArray(item.ingredients) && item.ingredients.length > 0 && (
                                                                        <Box sx={{ mt: 1 }}>
                                                                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                                                Ingredients:
                                                                            </Typography>
                                                                            <ul style={{ paddingLeft: "20px", margin: 0 }}>
                                                                                {item.category === "Kota" ? (
                                                                                    item.ingredients.map((ingredient, idx) => (
                                                                                        <Typography
                                                                                            key={idx}
                                                                                            variant="body2"
                                                                                            color="text.secondary"
                                                                                            sx={{ mb: 0.5, listStyleType: "circle" }}
                                                                                            component="li"
                                                                                        >
                                                                                            {ingredient}
                                                                                        </Typography>
                                                                                    ))
                                                                                ) : (
                                                                                    item.ingredients.map((ingredientObj, idx) => (
                                                                                        <Typography
                                                                                            key={idx}
                                                                                            variant="body2"
                                                                                            color="text.secondary"
                                                                                            sx={{ mb: 0.5, listStyleType: "circle" }}
                                                                                            component="li"
                                                                                        >
                                                                                            {ingredientObj.ingredient} - R{ingredientObj.totalAmount}
                                                                                        </Typography>
                                                                                    ))
                                                                                )}
                                                                            </ul>
                                                                        </Box>
                                                                    )}

                                                                    {item.category === "Kota" && (
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="text.secondary"
                                                                            sx={{ fontWeight: "bold", mt: 1 }}
                                                                        >
                                                                            Total Price: R{item.totalAmount}
                                                                        </Typography>
                                                                    )}
                                                                </CardContent>
                                                                <hr />
                                                                <Box
                                                                    marginBottom="1rem"
                                                                    marginLeft="1rem"
                                                                >
                                                                    <box-icon
                                                                        name='low-vision'
                                                                        color='#969DF8'
                                                                        onClick={() => handleViewItem(item)}
                                                                    >
                                                                    </box-icon>
                                                                </Box>
                                                            </Card>
                                                        ))}
                                                
                                            </List>

                                            <EditDeleteModal
                                                open={openEditDeleteModal}
                                                onClose={handleEditDeleteOpenModalClose}
                                                item={selectedItem}
                                                fetchAllMenuItems={fetchAllMenuItems}
                                                setMessage={setMessage}
                                            />
                                        </Box>
                                    )}

                                </CardContent>

                            </>
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
    } else if (userDetails && userDetails.role === "Customer") {
        return (
            <div className="administrator-container">
                <AdminstratorClient userDetails={userDetails} handleSignOutClick={handleSignOutClick} />
            </div>
        )
    }
};

export default Administrator;
