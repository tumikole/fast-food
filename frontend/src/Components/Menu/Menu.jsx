import React, { useState, useEffect } from "react";
import "./Menu.scss";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { getAllMenuItems } from "../../Supabase/addMenuItems/addMenuItems";
import {
    Container,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
    CircularProgress,
    Box,
    Chip,
    IconButton,
    Fade,
} from "@mui/material";
import {
    NavigateNext,
    NavigateBefore,
} from '@mui/icons-material';

const Menu = ({ addToCart }) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(false);
    const [allMenuItems, setAllMenuItems] = useState([]);
    const [allCategoryList, setAllCategoryList] = useState([]);
    const [groupedItems, setGroupedItems] = useState({});

    // Fetch menu items from Supabase
    const fetchAllMenuItems = async () => {
        const dataList = await getAllMenuItems();
        setAllMenuItems(dataList);

        // Create grouped items by category
        const grouped = dataList.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
        setGroupedItems(grouped);

        const uniqueCategories = [...new Set(dataList.map(item => item.category))];
        setAllCategoryList(uniqueCategories);

        if (uniqueCategories.length > 0) {
            setActiveCategory(uniqueCategories[0]);
        }
    };

    useEffect(() => {
        if (allMenuItems.length === 0) {
            fetchAllMenuItems();
        }
    }, [allMenuItems]);

    const handleNext = () => {
        if (groupedItems[activeCategory]) {
            if (currentItemIndex < groupedItems[activeCategory].length - 1) {
                setCurrentItemIndex(prev => prev + 1);
            } else {
                // Move to next category
                const currentCategoryIndex = allCategoryList.indexOf(activeCategory);
                if (currentCategoryIndex < allCategoryList.length - 1) {
                    setActiveCategory(allCategoryList[currentCategoryIndex + 1]);
                    setCurrentItemIndex(0);
                }
            }
        }
    };

    const handlePrevious = () => {
        if (currentItemIndex > 0) {
            setCurrentItemIndex(prev => prev - 1);
        } else {
            // Move to previous category
            const currentCategoryIndex = allCategoryList.indexOf(activeCategory);
            if (currentCategoryIndex > 0) {
                setActiveCategory(allCategoryList[currentCategoryIndex - 1]);
                setCurrentItemIndex(groupedItems[allCategoryList[currentCategoryIndex - 1]].length - 1);
            }
        }
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentItemIndex(0);
    };

    const currentItem = groupedItems[activeCategory]?.[currentItemIndex];
    console.log({ currentItem })
    return (
        <div className="menu-page">
            <Navbar />
            <Container maxWidth="lg" className="menu-container">
                {/* <p style={{ color: "green" }}>{JSON.stringify(currentItem)}</p> */}

                {!currentItem ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="50vh">
                        <CircularProgress />
                        <Typography className="loading-text">Loading menu...</Typography>
                    </Box>
                ) : (
                    <Box className="menu-content">
                        <Typography variant="h3" className="menu-title">
                            Our Menu
                        </Typography>

                        <Box className="category-navigation">
                            {allCategoryList.map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`category-chip ${activeCategory === category ? 'active' : ''}`}
                                />
                            ))}
                        </Box>

                        <Box className="menu-carousel">
                            <Fade in={true}>
                                <Card className="menu-card">
                                    {imageLoading && (
                                        <CircularProgress className="image-loader" />
                                    )}
                                    <CardMedia
                                        component="img"
                                        image={currentItem.imageUrl}
                                        alt={currentItem.itemName}
                                        onLoad={() => setImageLoading(false)}
                                        onError={() => setImageLoading(false)}
                                        className="menu-image"
                                    />
                                    <IconButton
                                        className="nav-button prev"
                                        onClick={handlePrevious}
                                        disabled={currentItemIndex === 0 && activeCategory === allCategoryList[0]}
                                    >
                                        <NavigateBefore />
                                    </IconButton>
                                    <IconButton
                                        className="nav-button next"
                                        onClick={handleNext}
                                        disabled={currentItemIndex === groupedItems[activeCategory]?.length - 1 &&
                                            activeCategory === allCategoryList[allCategoryList.length - 1]}
                                    >
                                        <NavigateNext />
                                    </IconButton>
                                    <CardContent className="menu-content">
                                        <Box className="item-header">
                                            <Typography variant="h5" className="item-name">
                                                {currentItem.itemName}
                                            </Typography>
                                            {/* <IconButton className="favorite-button">
                                                <FavoriteBorder />
                                            </IconButton> */}
                                        </Box>
                                        <Box>
                                            <Typography className="item-ingredients">
                                                Ingredients
                                            </Typography>
                                            {currentItem.ingredients.map((item, idx) => (
                                                <li key={idx}>
                                                    {currentItem.category === "Kota"
                                                        ? item
                                                        : `${item.ingredient} R${item.totalAmount}`
                                                    }
                                                </li>
                                            ))}
                                        </Box>
                                        <Box className="item-footer">
                                            {currentItem.category === "Kota" &&
                                                <Typography className="item-price">
                                                    R {currentItem.totalAmount}
                                                </Typography>}
                                            <Box className="item-tags">
                                                <Chip
                                                    size="small"
                                                    label={currentItem.isVeg ? 'Veg' : 'Non-Veg'}
                                                    className={`tag ${currentItem.isVeg ? 'veg' : 'non-veg'}`}
                                                />

                                            </Box>
                                        </Box>

                                    </CardContent>
                                    <CardActions className="card-actions">
                                        <Button
                                            variant="contained"
                                            onClick={() => addToCart(currentItem)}
                                            className="add-to-cart-button"
                                        >
                                            Add to Cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Fade>
                        </Box>

                        <Box className="pagination-indicator">
                            <Typography>
                                {currentItemIndex + 1} / {groupedItems[activeCategory]?.length}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default Menu;


// const handleAddToCart = (item) => {
//     const currentImageData = item.images[imageIndexes[item.id]];

//     // For items with multiple selections, create separate cart items
//     if (selectedIngredients[item.id]?.length > 0 && item.id !== 1) {  // Not Kota
//         selectedIngredients[item.id].forEach(ingredientName => {
//             const ingredientPrice = currentImageData.ingredients.find(
//                 ing => ing.name === ingredientName
//             )?.itemPrice || 0;

//             const singleItem = {
//                 category: item.category,
//                 itemName: ingredientName,
//                 ingredients: [ingredientName],
//                 price: { [item.id]: ingredientPrice * (quantities[ingredientName] || 1) },
//                 quantity: quantities[ingredientName] || 1
//             };

//             // Check if this specific ingredient is already in cart
//             const itemIndex = cart.findIndex(cartItem =>
//                 cartItem.itemName === ingredientName &&
//                 JSON.stringify(cartItem.ingredients) === JSON.stringify([ingredientName])
//             );

//             if (itemIndex === -1) {
//                 // Add new item
//                 addToCart(singleItem);
//             } else {
//                 // Update existing item
//                 const updatedCart = [...cart];
//                 updatedCart[itemIndex] = {
//                     ...singleItem,
//                     quantity: quantities[ingredientName] || 1
//                 };
//                 setCart(updatedCart);
//             }
//         });
//     } else {
//         // Handle Kota items (item.id === 1) or single selections
//         const currentQuantity = quantities[currentImageData.itemName] || 1;
//         const currentTotal = itemTotals[item.id] || 0;

//         const selectedItem = {
//             category: `${item.category} 🍞🥖🧈🧀🍟`,
//             itemName: currentImageData.itemName,
//             ingredients: selectedIngredients[item.id] || [],
//             price: { [item.id]: currentTotal },
//             quantity: currentQuantity
//         };

//         const itemIndex = cart.findIndex(cartItem =>
//             cartItem.itemName === selectedItem.itemName &&
//             JSON.stringify(cartItem.ingredients) === JSON.stringify(selectedItem.ingredients)
//         );

//         if (itemIndex === -1) {
//             addToCart(selectedItem);
//         } else {
//             const updatedCart = [...cart];
//             updatedCart[itemIndex] = {
//                 ...selectedItem,
//                 quantity: currentQuantity
//             };
//             setCart(updatedCart);
//         }
//     }

//     // Reset states after adding to cart
//     setSelectedIngredients((prev) => ({ ...prev, [item.id]: [] }));
//     setItemTotals((prev) => ({ ...prev, [item.id]: 0 }));
//     setQuantities(prev => {
//         const newQuantities = { ...prev };
//         if (item.id !== 1) {  // Not Kota
//             selectedIngredients[item.id]?.forEach(ingredientName => {
//                 delete newQuantities[ingredientName];
//             });
//         }
//         delete newQuantities[currentImageData.itemName];
//         return newQuantities;
//     });
//     setSelectAllChecked(false);
// };


// const selectAllIngredients = (itemId) => {
//     // Toggle the selectAllChecked state
//     setSelectAllChecked((prevChecked) => {
//         const newCheckedState = !prevChecked;  // Toggle the state
//         setSelectedIngredients((prevSelected) => {
//             const ingredients = menuItems.find(item => item.id === itemId)
//                 .images[imageIndexes[itemId]].ingredients;

//             if (newCheckedState) {
//                 // Select all ingredients
//                 const allIngredientNames = ingredients.map(ingredient => ingredient.name);

//                 // Set the selected ingredients to include all ingredients
//                 const updatedSelected = { ...prevSelected, [itemId]: allIngredientNames };

//                 // Calculate the total for the selected ingredients
//                 setItemTotals((prevTotals) => {
//                     const totalAmount = ingredients.reduce((total, ingredient) => {
//                         return total + ingredient.itemPrice; // Sum of all ingredient prices
//                     }, 0);

//                     return { ...prevTotals, [itemId]: totalAmount };
//                 });

//                 return updatedSelected;
//             } else {
//                 // Deselect all ingredients
//                 const updatedSelected = { ...prevSelected };
//                 delete updatedSelected[itemId];  // Remove the selected ingredients for this item

//                 // Reset the total for this item
//                 setItemTotals((prevTotals) => {
//                     const updatedTotals = { ...prevTotals };
//                     delete updatedTotals[itemId];  // Remove the total for this item
//                     return updatedTotals;
//                 });

//                 return updatedSelected;
//             }
//         });

//         return newCheckedState;  // Return the new checkbox state
//     });
// };

// const updateQuantityPlus = (ingredientName, itemId, itemPrice) => {
//     // Don't update if ingredient isn't selected
//     if (!selectedIngredients[itemId]?.includes(ingredientName)) return;

//     // Update quantities
//     setQuantities(prev => {
//         const currentQuantity = prev[ingredientName] || 1;
//         return {
//             ...prev,
//             [ingredientName]: currentQuantity + 1
//         };
//     });

//     // Update total price
//     setItemTotals(totals => ({
//         ...totals,
//         [itemId]: Math.max((totals[itemId] || 0) + itemPrice, 0)
//     }));
// };

// const updateQuantityMinus = (ingredientName, itemId, itemPrice) => {
//     // Get current quantity
//     const currentQuantity = quantities[ingredientName] || 1;

//     // Don't update if quantity would go below 1
//     if (currentQuantity <= 1) {
//         return;
//     }

//     // Update quantities
//     setQuantities(prev => ({
//         ...prev,
//         [ingredientName]: currentQuantity - 1
//     }));

//     // Update total price
//     setItemTotals(totals => ({
//         ...totals,
//         [itemId]: Math.max((totals[itemId] || 0) - itemPrice, 0)
//     }));
// };

// // Separate Kota quantity handlers
// const updateKotaQuantityPlus = (itemName, itemId, totalAmount) => {
//     const currentQuantity = quantities[itemName] || 1;
//     const newQuantity = currentQuantity + 1;

//     setQuantities(prev => ({
//         ...prev,
//         [itemName]: newQuantity
//     }));

//     setItemTotals(prev => ({
//         ...prev,
//         [itemId]: totalAmount * newQuantity
//     }));
// };

// const updateKotaQuantityMinus = (itemName, itemId, totalAmount) => {
//     const currentQuantity = quantities[itemName] || 1;
//     if (currentQuantity <= 1) {
//         // Reset all states for this Kota item
//         setQuantities(prev => {
//             const { [itemName]: removed, ...rest } = prev;
//             return rest;
//         });
//         setItemTotals(prev => ({
//             ...prev,
//             [itemId]: 0
//         }));
//         setSelectAllChecked(false);
//         return;
//     }

//     const newQuantity = currentQuantity - 1;

//     setQuantities(prev => ({
//         ...prev,
//         [itemName]: newQuantity
//     }));

//     setItemTotals(prev => ({
//         ...prev,
//         [itemId]: totalAmount * newQuantity
//     }));
// };

// const filteredMenu =
//     activeCategory === "All"
//         ? menuItems
//         : menuItems.filter((item) => item.category === activeCategory);


