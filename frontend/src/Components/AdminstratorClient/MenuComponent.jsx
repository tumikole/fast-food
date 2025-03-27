import React, { useState, useEffect, useCallback } from "react";
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

const MenuComponent = ({ addToCart, cart, allCategoryList, groupedItems, allMenuItems, activeCategory, setActiveCategory, setAllCategoryList, setGroupedItems, setAllMenuItems }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [itemTotals, setItemTotals] = useState({});

  const fetchAllMenuItems = useCallback(async () => {
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
}, [setActiveCategory, setAllCategoryList, setAllMenuItems, setGroupedItems]);


  useEffect(() => {
    if (!allMenuItems || allMenuItems.length === 0) {
      fetchAllMenuItems();
    }
  }, [allMenuItems, fetchAllMenuItems]);

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
      {/* <Navbar cartLength={cart.length} /> */}
      <Container maxWidth="lg" className="menu-container">

        {!currentItem ? (
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="50vh">
            <CircularProgress />
            <Typography className="loading-text">Loading menu...</Typography>
          </Box>
        ) : (
          <Box className="menu-content">
            <Typography variant="h3" className="menu-title-customer">
              Our Menu
            </Typography>
            <Typography variant="subtitle1" mb={4} color="#1976d2" className="menu-subtitle">
              Explore our delicious selection of South African street food, beverages, and sweet treats.
            </Typography>

            <Box className="category-navigation">
              {allCategoryList.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`category-chip ${activeCategory === category ? 'active-customer' : ''}`}
                />
              ))}
            </Box>

            <Box className="menu-carousel" border="5px solid #1976d2">
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
                          color: '#1976d2'
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
                                  color: '#1976d2'
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
                                    color: '#1976d2'
                                  }}
                                >
                                  {item.ingredient}
                                </Typography>

                                {/* Price */}
                                <Typography
                                  sx={{
                                    color: '#1976d2',
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
                                      background: 'rgba(25, 118, 210, 0.52)',
                                      '&:hover': {
                                        background: '#1976d2',
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
                                      background: 'rgba(25, 118, 210, 0.52)',
                                      '&:hover': {
                                        background: '#1976d2',
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
                              color: '#1976d2',
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
                              border: '1px solid #1976d2',
                              borderRadius: '8px',
                              padding: '4px'
                            }}>
                              <IconButton
                                size="small"
                                onClick={() => updateKotaQuantity(currentItem.id, 'decrement')}
                                sx={{
                                  background: 'rgba(25, 118, 210, 0.52)',
                                  '&:hover': {
                                    background: '#1976d2',
                                  }
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography sx={{ color: "#1976d2", minWidth: '20px', textAlign: 'center' }}>
                                {quantities[`${currentItem.id}-total`] || 0}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => updateKotaQuantity(currentItem.id, 'increment')}
                                sx={{
                                  background: 'rgba(25, 118, 210, 0.52)',
                                  '&:hover': {
                                    background: '#1976d2'
                                  }
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
                                background: "#1976d2",
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
                          color: '#1976d2'
                        }}
                      >
                        Total: R{itemTotals[currentItem.id] || 0}.00
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        className="add-to-cart-button"
                        sx={{
                          background: 'linear-gradient(45deg, #1976d2, #1976d2)',
                          color: 'white',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1976d2, #1976d2)',
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
              <Typography color="#1976d2">
                {currentItemIndex + 1} / {groupedItems[activeCategory]?.length}
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default MenuComponent;