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
    Add as AddIcon,
    Remove as RemoveIcon,
} from '@mui/icons-material';

const Menu = ({ addToCart, cart, allCategoryList, groupedItems, allMenuItems, activeCategory, setActiveCategory, setAllCategoryList, setGroupedItems, setAllMenuItems }) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [itemTotals, setItemTotals] = useState({});

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

    const getNutritionColor = (nutrition) => {
        switch (nutrition?.toLowerCase()) {
            case 'veg':
                return 'linear-gradient(45deg, #2ECC71, #27AE60)'; // Green gradient
            case 'non-veg':
                return 'linear-gradient(45deg, #E74C3C, #C0392B)'; // Red gradient
            default:
                return 'linear-gradient(45deg, #FF6B6B, #FF8E53)'; // Default orange gradient
        }
    };

    const updateQuantity = (itemId, ingredientName, action) => {
        setQuantities(prev => {
            const key = `${itemId}-${ingredientName}`;
            const currentQty = prev[key] || 0;
            const newQty = action === 'increment' ? currentQty + 1 : Math.max(0, currentQty - 1);

            const newQuantities = {
                ...prev,
                [key]: newQty
            };

            // Calculate total from all ingredients with their quantities
            if (currentItem.category !== "Kota") {
                const total = currentItem.ingredients.reduce((sum, ing) => {
                    const ingKey = `${itemId}-${ing.ingredient}`;
                    const quantity = ing.ingredient === ingredientName ? newQty : (newQuantities[ingKey] || 0);
                    return sum + (ing.totalAmount * quantity);
                }, 0);

                setItemTotals(prevTotals => ({
                    ...prevTotals,
                    [itemId]: total
                }));
            }

            return newQuantities;
        });
    };

    const updateKotaQuantity = (itemId, action) => {
        const baseAmount = currentItem.totalAmount;

        setQuantities(prev => {
            const key = `${itemId}-total`;
            const currentQty = prev[key] || 0;
            const newQty = action === 'increment' ? currentQty + 1 : Math.max(0, currentQty - 1);

            const newTotal = baseAmount * newQty;

            setItemTotals(prevTotals => ({
                ...prevTotals,
                [itemId]: newTotal
            }));

            return {
                ...prev,
                [key]: newQty
            };
        });
    };

    const handleAddToCart = () => {
        // Check if any quantity is selected
        const hasQuantity = currentItem.category === "Kota"
            ? (quantities[`${currentItem.id}-total`] || 0) > 0
            : currentItem.ingredients.some(ing => (quantities[`${currentItem.id}-${ing.ingredient}`] || 0) > 0);

        if (!hasQuantity) {
            return; // Don't add if no quantity selected
        }

        // Check if item with same name already exists in cart
        const existingItem = cart.find(item => item.itemName === currentItem.itemName);

        if (existingItem) {
            alert(`${currentItem.itemName} is already in your cart!`);
            return;
        }

        if (currentItem.category === "Kota") {
            const kotaQuantity = quantities[`${currentItem.id}-total`] || 0;
            const kotaTotal = currentItem.totalAmount * kotaQuantity;

            const kotaToAdd = {
                id: currentItem.id,
                category: currentItem.category,
                itemName: currentItem.itemName,
                imageUrl: currentItem.imageUrl,
                ingredients: currentItem.ingredients,
                nutrition: currentItem.nutrition,
                quantity: kotaQuantity,
                totalAmount: kotaTotal,
                basePrice: currentItem.totalAmount
            };

            addToCart(kotaToAdd);
        } else {
            const selectedIngredients = currentItem.ingredients.filter(ing =>
                (quantities[`${currentItem.id}-${ing.ingredient}`] || 0) > 0
            );

            if (selectedIngredients.length === 0) return;

            const itemToAdd = {
                id: currentItem.id,
                category: currentItem.category,
                itemName: currentItem.itemName,
                imageUrl: currentItem.imageUrl,
                ingredients: selectedIngredients.map(ing => ({
                    ingredient: ing.ingredient,
                    totalAmount: ing.totalAmount,
                    quantity: quantities[`${currentItem.id}-${ing.ingredient}`] || 0
                })),
                totalAmount: itemTotals[currentItem.id] || 0,
                basePrice: currentItem.totalAmount
            };

            addToCart(itemToAdd);
        }

        // Reset states after adding to cart
        setQuantities({});
        setItemTotals({});
    };

    useEffect(() => {
        if (currentItem) {
            // Reset quantities when item changes
            setQuantities({});

            if (currentItem.category !== "Kota") {
                // Initialize quantities to 0 for each ingredient
                const initialQuantities = {};
                currentItem.ingredients.forEach(ing => {
                    initialQuantities[`${currentItem.id}-${ing.ingredient}`] = 0;
                });
                setQuantities(initialQuantities);

                // Set initial total to 0
                setItemTotals(prev => ({
                    ...prev,
                    [currentItem.id]: 0
                }));
            } else {
                // For Kota items, initialize total quantity to 0
                setQuantities(prev => ({
                    ...prev,
                    [`${currentItem.id}-total`]: 0
                }));
                setItemTotals(prev => ({
                    ...prev,
                    [currentItem.id]: 0
                }));
            }
        }
    }, [currentItem]);

    return (
        <div className="menu-page">
            <Navbar cartLength={cart.length} />
            <Container maxWidth="lg" className="menu-container">

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
                        <Typography variant="subtitle1" mb={4} color="#ff9900" className="menu-subtitle">
                            Explore our delicious selection of South African street food, beverages, and sweet treats.
                        </Typography>

                        <Box className="category-navigation">
                            {allCategoryList.map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`category-chip ${activeCategory === category ? 'active-main' : ''}`}
                                />
                            ))}
                        </Box>

                        <Box className="menu-carousel" border="5px solid #E74C3C">
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
                                        sx={{
                                            height: '400px',
                                            objectFit: 'cover',
                                            width: '100%',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.05)'
                                            }
                                        }}
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
                                        </Box>

                                        <Box sx={{
                                            background: 'rgba(245, 247, 250, 0.95)',
                                            borderRadius: '12px',
                                            padding: '16px',
                                            mb: 2,
                                            mt: 2
                                        }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    mb: 2,
                                                    fontWeight: 600,
                                                    color: '#1a1a1a'
                                                }}
                                            >
                                                Ingredients
                                            </Typography>
                                            <Box sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '8px'
                                            }}>
                                                {currentItem.ingredients.map((item, idx) => {
                                                    if (currentItem.category === "Kota") {
                                                        // For Kota items, split the ingredients string and create separate chips
                                                        const ingredients = item.split(',').map(ing => ing.trim());
                                                        return ingredients.map((singleIngredient, subIdx) => (
                                                            <Box
                                                                key={`${idx}-${subIdx}`}
                                                                sx={{
                                                                    background: 'white',
                                                                    borderRadius: '12px',
                                                                    padding: '12px',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: '8px',
                                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                                    transition: 'all 0.2s ease',
                                                                    '&:hover': {
                                                                        transform: 'translateY(-2px)',
                                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                                    }
                                                                }}
                                                            >
                                                                <Typography sx={{
                                                                    fontWeight: 500,
                                                                    color: '#1a1a1a'
                                                                }}>
                                                                    {singleIngredient}
                                                                </Typography>
                                                            </Box>
                                                        ));
                                                    } else {
                                                        // For non-Kota items, keep the existing format
                                                        return (
                                                            <Box
                                                                key={idx}
                                                                sx={{
                                                                    background: 'white',
                                                                    borderRadius: '12px',
                                                                    padding: '12px',
                                                                    display: 'grid',
                                                                    gridTemplateColumns: '2fr 1fr 1fr',
                                                                    gap: '16px',
                                                                    alignItems: 'center',
                                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                                    width: '100%'
                                                                }}
                                                            >
                                                                {/* Ingredient Name */}
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 500,
                                                                        color: '#1a1a1a'
                                                                    }}
                                                                >
                                                                    {item.ingredient}
                                                                </Typography>

                                                                {/* Price */}
                                                                <Typography
                                                                    sx={{
                                                                        color: '#FF6B6B',
                                                                        fontWeight: 600,
                                                                        textAlign: 'right'
                                                                    }}
                                                                >
                                                                    R{item.totalAmount}
                                                                </Typography>

                                                                {/* Quantity Controls */}
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '8px',
                                                                    justifyContent: 'flex-end',
                                                                    border: '1px solid rgba(0,0,0,0.1)',
                                                                    borderRadius: '8px',
                                                                    padding: '4px',
                                                                    background: 'rgba(255,255,255,0.8)'
                                                                }}>
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => updateQuantity(currentItem.id, item.ingredient, 'decrement')}
                                                                        sx={{
                                                                            background: 'rgba(255,107,107,0.1)',
                                                                            '&:hover': {
                                                                                background: 'rgba(255,107,107,0.2)',
                                                                                transform: 'scale(1.1)'
                                                                            },
                                                                            transition: 'all 0.2s ease'
                                                                        }}
                                                                    >
                                                                        <RemoveIcon fontSize="small" />
                                                                    </IconButton>
                                                                    <Typography sx={{
                                                                        minWidth: '24px',
                                                                        textAlign: 'center',
                                                                        fontWeight: 600
                                                                    }}>
                                                                        {quantities[`${currentItem.id}-${item.ingredient}`] || 0}
                                                                    </Typography>
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => updateQuantity(currentItem.id, item.ingredient, 'increment')}
                                                                        sx={{
                                                                            background: 'rgba(255,107,107,0.1)',
                                                                            '&:hover': {
                                                                                background: 'rgba(255,107,107,0.2)',
                                                                                transform: 'scale(1.1)'
                                                                            },
                                                                            transition: 'all 0.2s ease'
                                                                        }}
                                                                    >
                                                                        <AddIcon fontSize="small" />
                                                                    </IconButton>
                                                                </Box>
                                                            </Box>
                                                        );
                                                    }
                                                })}
                                            </Box>
                                        </Box>

                                        <Box className="item-footer" sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mt: 2
                                        }}>
                                            {currentItem.category === "Kota" && (
                                                <>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: '#FF6B6B',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '16px'
                                                        }}
                                                    >
                                                        <span>R {currentItem.totalAmount}</span>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            border: '1px solid rgba(0,0,0,0.1)',
                                                            borderRadius: '8px',
                                                            padding: '4px'
                                                        }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => updateKotaQuantity(currentItem.id, 'decrement')}
                                                                sx={{
                                                                    background: 'rgba(255,107,107,0.1)',
                                                                    '&:hover': { background: 'rgba(255,107,107,0.2)' }
                                                                }}
                                                            >
                                                                <RemoveIcon fontSize="small" />
                                                            </IconButton>
                                                            <Typography sx={{ minWidth: '20px', textAlign: 'center' }}>
                                                                {quantities[`${currentItem.id}-total`] || 0}
                                                            </Typography>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => updateKotaQuantity(currentItem.id, 'increment')}
                                                                sx={{
                                                                    background: 'rgba(255,107,107,0.1)',
                                                                    '&:hover': { background: 'rgba(255,107,107,0.2)' }
                                                                }}
                                                            >
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </Typography>
                                                    <Box className="item-tags">
                                                        <Chip
                                                            size="small"
                                                            label={currentItem.nutrition}
                                                            sx={{
                                                                background: getNutritionColor(currentItem.nutrition),
                                                                color: 'white',
                                                                fontWeight: 'bold',
                                                                '&:hover': {
                                                                    background: getNutritionColor(currentItem.nutrition),
                                                                    transform: 'translateY(-2px)',
                                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                </>
                                            )}
                                        </Box>
                                    </CardContent>
                                    <CardActions className="card-actions">
                                        <Box sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0 16px'
                                        }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#FF6B6B'
                                                }}
                                            >
                                                Total: R{itemTotals[currentItem.id] || 0}.00
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                onClick={handleAddToCart}
                                                className="add-to-cart-button"
                                                sx={{
                                                    background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                                                    color: 'white',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
                                                    }
                                                }}
                                            >
                                                Add to Cart
                                            </Button>
                                        </Box>
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


