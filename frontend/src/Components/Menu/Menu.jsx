import React, { useState, useMemo, useEffect } from "react";
import "./Menu.scss";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Menu = ({ addToCart, cart, setCart }) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [imageIndexes, setImageIndexes] = useState({});
    const [itemTotals, setItemTotals] = useState({}); // Track total price per item
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [imageLoading, setImageLoading] = useState({});

    // Add this at the top of your component to track if there are selected items
    const hasSelectedItems = Object.values(selectedIngredients).some(items => items.length > 0);

    const categories = useMemo(
        () => [
            "All",
            "Kota",
            "Extras",
            "Chips",
        ],
        []
    );

    const menuItems = useMemo(() => [
        {
            id: 1,
            category: "Kota",
            images: [
                {
                    imageId: 1,
                    itemName: "JOZI",
                    imageItem: "https://tb-static.uber.com/prod/image-proc/processed_images/24fc780275e5be8892280739f5fdd70a/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "ATCHAAR", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                    ],
                    totalAmount: 15.00,
                    quantity: 1
                },
                {
                    imageId: 2,
                    itemName: "BEE",
                    imageItem: "https://tb-static.uber.com/prod/image-proc/processed_images/a175223c84ce9e9464b879d9ecc28014/7f4ae9ca0446cbc23e71d8d395a98428.jpeg  ",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "ATCHAAR", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "HALF VIENNA", itemPrice: 5.00 }
                    ],
                    totalAmount: 20.00,
                    quantity: 1
                },
                {
                    imageId: 3,
                    itemName: "MAMAZALA",
                    imageItem: "https://tb-static.uber.com/prod/image-proc/processed_images/407a0815eb03fd396e73e756040a59f3/58f691da9eaef86b0b51f9b2c483fe63.jpeg",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "ATCHAAR", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "FULL VIENNA", itemPrice: 15.00 }
                    ],
                    totalAmount: 26.00,
                    quantity: 1
                },
                {
                    imageId: 4,
                    itemName: "VALUE",
                    imageItem: "https://kotashop.co.za/images/uploaded/3/kota2.jpg",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "ATCHAAR", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "HALF VIENNA", itemPrice: 5.00 },
                        { name: "CHEESE", itemPrice: 15.00 }
                    ],
                    totalAmount: 0,
                    quantity: 1
                },
                {
                    imageId: 5,
                    itemName: "MINISTER",
                    imageItem: "https://tb-static.uber.com/prod/image-proc/processed_images/6e33f7119e134c2fa41ba6365a3d3e25/4218ca1d09174218364162cd0b1a8cc1.jpeg",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "ATCHAAR", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "HALF RUSSIAN", itemPrice: 5.00 }
                    ],
                    totalAmount: 0,
                    quantity: 1
                },
                {
                    imageId: 6,
                    itemName: "BOSS",
                    imageItem: "https://lh3.googleusercontent.com/Z8mvD571wzzUOq92HQUUaxxCUR4L3GZkAd3CMgg8gVedx6cKZQVVpFCKMNOQSQwrL1f32i5hsdOhhMZyb6yA12FLHzyf9WM",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "ATCHAAR", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "FULL RUSSIAN", itemPrice: 5.00 }
                    ],
                    totalAmount: 0,
                    quantity: 1
                },
                {
                    imageId: 7,
                    itemName: "KLASSIC",
                    imageItem: "https://www.southafricanmi.com/uploads/6/9/3/7/69372701/kota-bunnychow-food-street-south-africa-google-image_1_orig.jpg",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "LETTUCE", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "FULL RUSSSIAN", itemPrice: 15.00 },
                        { name: "CHEESE", itemPrice: 15.00 }

                    ],
                    totalAmount: 35.00,
                    quantity: 1
                },
                {
                    imageId: 9,
                    itemName: "MASINGITA",
                    imageItem: "https://lh3.googleusercontent.com/40I6BfXs29ybMx9KBZGsBOYBXkXZYc4Y2pOo32G6AF4XShhWnD3VEkZ4W8iX65g0yXcUqIahFududEmDWGtECDpZ8zWFZRS0EjY-=s750",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "LETTUCE", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "FULL RUSSSIAN", itemPrice: 15.00 },
                        { name: "CHEESE", itemPrice: 15.00 },
                        { name: "FULL VIENNA", itemPrice: 15.00 }

                    ],
                    totalAmount: 43.00,
                    quantity: 1
                },
                {
                    imageId: 10,
                    itemName: "MAKHADZI",
                    imageItem: "https://joburg.co.za/wp-content/uploads/2024/09/500-by-500-26.png",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "LETTUCE", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "FULL RUSSSIAN", itemPrice: 15.00 },
                        { name: "BURGER PATTY", itemPrice: 15.00 },

                    ],
                    totalAmount: 48.00,
                    quantity: 1
                },
                {
                    imageId: 11,
                    itemName: "MALEMA",
                    imageItem: "https://lh3.googleusercontent.com/40I6BfXs29ybMx9KBZGsBOYBXkXZYc4Y2pOo32G6AF4XShhWnD3VEkZ4W8iX65g0yXcUqIahFududEmDWGtECDpZ8zWFZRS0EjY-=s750",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "LETTUCE", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "FULL RUSSSIAN", itemPrice: 15.00 },
                        { name: "BURGER PATTY", itemPrice: 15.00 },
                        { name: "CHEESE", itemPrice: 15.00 },
                        { name: "EGGS", itemPrice: 15.00 },

                    ],
                    totalAmount: 60.00,
                    quantity: 1
                },
                {
                    imageId: 12,
                    itemName: "RAMAPHOSA",
                    imageItem: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Spatlo01.jpg/640px-Spatlo01.jpg",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "LETTUCE", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "FULL RUSSSIAN", itemPrice: 15.00 },
                        { name: "BURGER PATTY", itemPrice: 15.00 },
                        { name: "CHEESE", itemPrice: 15.00 },
                        { name: "EGGS", itemPrice: 15.00 },
                        { name: "FULL VIENNA", itemPrice: 15.00 }

                    ],
                    totalAmount: 65.00,
                    quantity: 1
                },
            ],
            price: 25.00
        },
        {
            id: 2,
            category: "Extras",
            images: [
                {
                    imageId: 1,
                    itemName: "VIENNA",
                    imageItem: "https://www.shutterstock.com/image-photo/raw-pork-chicken-sausages-lie-600nw-1815242408.jpg",
                    ingredients: [
                        { name: "FULL VIENNA", itemPrice: 8.00 },
                        { name: "HALF VIENNA", itemPrice: 6.00 },
                    ]
                },
                {
                    imageId: 2,
                    itemName: "RUSSIAN",
                    imageItem: "https://static.vecteezy.com/system/resources/previews/035/063/350/non_2x/ai-generated-grilled-sausage-free-png.png",
                    ingredients: [
                        { name: "FULL RUSSIAN", itemPrice: 15.00 },
                        { name: "HALF RUSSIAN", itemPrice: 10.00 },
                    ]
                },
                {
                    imageId: 3,
                    itemName: "CHEESE",
                    imageItem: "https://cdn.diys.com/wp-content/uploads/2014/09/can-you-freeze-cheese-slices.jpg",
                    ingredients: [
                        { name: "CHEESE", itemPrice: 4.00, quantity: 1 },

                    ]
                }
                ,
                {
                    imageId: 4,
                    itemName: "EGG",
                    imageItem: "https://img.freepik.com/premium-photo/top-view-photo-fried-egg-white-background_908985-53217.jpg",
                    ingredients: [
                        { name: "EGG", itemPrice: 4.00, quantity: 1 },

                    ]
                }
                ,
                {
                    imageId: 5,
                    itemName: "B/PATTY",
                    imageItem: "https://t4.ftcdn.net/jpg/10/23/64/65/360_F_1023646511_aVjBB3EOxCfroQoyRr9q7yVtGgKs7JcR.jpg",
                    ingredients: [
                        { name: "PATTY", itemPrice: 15.00, quantity: 1 },

                    ]
                }
            ],
            price: 30.00
        },
        {
            id: 3,
            category: "Chips",
            images: [
                {
                    imageId: 1,
                    itemName: "CHIPS",
                    imageItem: "https://cdn.britannica.com/34/206334-050-7637EB66/French-fries.jpg",
                    ingredients: [
                        { name: "SMALL CHIPS", itemPrice: 20.00, quantity: 1 },
                        { name: "MID CHIPS", itemPrice: 25.00, quantity: 1 },
                        { name: "LARGER CHIPS	", itemPrice: 30.00, quantity: 1 },
                        { name: "X LARGER CHIPS", itemPrice: 40.00 },
                        { name: "MED CHIPS + RUSSIAN", itemPrice: 45.00, quantity: 1 },

                    ]
                }
            ],
            price: 35.00
        },
        {
            id: 4,
            category: "Beverages",
            images: [
                {
                    imageId: 1,
                    itemName: "Soft drinks",
                    imageItem: "https://eu-images.contentstack.com/v3/assets/blta023acee29658dfc/blta9f158c45627aa62/651dbb742365a678d7ec7f18/AdobeStock_279692163_Editorial_Use_Only-Beverage-FTR-new.jpg",
                    ingredients: [
                        { name: "Coke", itemPrice: 12.00, quantity: 1 },
                        { name: "Fanta", itemPrice: 25.00, quantity: 1 },
                        { name: "Pepsi", itemPrice: 10.00, quantity: 1 },
                        { name: "Sprite", itemPrice: 25.00, quantity: 1 },
                        { name: "Lipton", itemPrice: 25.00, quantity: 1 },
                        { name: "Miranda", itemPrice: 25.00, quantity: 1 },
                        { name: "Scwepes", itemPrice: 25.00, quantity: 1 },



                    ]
                },
                {
                    imageId: 2,
                    itemName: "Beer",
                    imageItem: "https://lh3.googleusercontent.com/-1VuBtZIqhqJodQKoCS4BUSETWOT9HWEZE07loreo3xFd__MRuI5epacVfElr8kaLzS2hmiSCeqatAdRM-4K96SlWb8vW2re03CD2Lm-EbAh=s1500",
                    ingredients: [
                        { name: "Blac label", itemPrice: 22.00, quantity: 1 },
                        { name: "Amstel", itemPrice: 22.00, quantity: 1 },
                        { name: "Hansa Pilsner", itemPrice: 20.00, quantity: 1 },
                        { name: "Castle Milk Stout", itemPrice: 25.00, quantity: 1 },
                        { name: "Castle Lite", itemPrice: 22.00, quantity: 1 },
                        { name: "Castle Larger", itemPrice: 20.00, quantity: 1 }
                    ]
                }
            ],
            price: 20.00
        }
    ], []);



    useEffect(() => {
        const initImageIndexes = {};
        menuItems.forEach((item) => {
            initImageIndexes[item.id] = 0; // Initial image index for each item
        });
        setImageIndexes(initImageIndexes);
    }, [menuItems]);


    const handleNextImage = (id) => {
        setImageIndexes((prevIndexes) => {
            const currentIndex = prevIndexes[id] || 0;
            const nextIndex = (currentIndex + 1) % menuItems.find((item) => item.id === id).images.length;
            return { ...prevIndexes, [id]: nextIndex };
        });
        resetSelections(id);
        setSelectAllChecked(false)
    };

    const handlePreviousImage = (id) => {
        setImageIndexes((prevIndexes) => {
            const currentIndex = prevIndexes[id] || 0;
            const item = menuItems.find((item) => item.id === id);

            // If no item found or no images exist, return previous indexes without change
            if (!item || !item.images || item.images.length === 0) {
                return prevIndexes;
            }

            // Get the next image index (loop back to the last image if at the beginning)
            const nextIndex = (currentIndex - 1 + item.images.length) % item.images.length;

            return { ...prevIndexes, [id]: nextIndex };
        });

        resetSelections(id);
        setSelectAllChecked(false)

    };

    const resetSelections = (id) => {
        // Get the current item and image data
        const item = menuItems.find(item => item.id === id);
        const currentImageData = item.images[imageIndexes[id]];

        setSelectedIngredients((prevState) => ({
            ...prevState,
            [id]: [],
        }));

        setItemTotals((prevTotals) => ({
            ...prevTotals,
            [id]: 0,
        }));

        // Reset quantities for the current item
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            // Remove quantity for the current item
            if (currentImageData) {
                delete newQuantities[currentImageData.itemName];
            }
            setItemTotals({})
            return newQuantities;
        });
    };


    const handleIngredientToggle = (itemId, ingredientName, itemPrice) => {
        // Get current state values
        const selectedItems = selectedIngredients[itemId] || [];
        const isChecked = selectedItems.includes(ingredientName);
        const currentQuantity = quantities[ingredientName] || 1;

        // Update selected ingredients
        const updatedSelectedItems = isChecked
            ? selectedItems.filter((name) => name !== ingredientName)
            : [...selectedItems, ingredientName];

        // Update all states in parallel
        setSelectedIngredients(prev => ({
            ...prev,
            [itemId]: updatedSelectedItems
        }));

        // Reset quantity if unchecking
        setQuantities(prevQuantities => {
            if (isChecked) {
                const { [ingredientName]: removed, ...rest } = prevQuantities;
                return rest;
            }
            return {
                ...prevQuantities,
                [ingredientName]: 1
            };
        });

        // Update total price considering quantity
        setItemTotals(prevTotals => {
            const currentTotal = prevTotals[itemId] || 0;
            const priceAdjustment = isChecked
                ? -(itemPrice * currentQuantity) // Subtract total price (price * quantity)
                : itemPrice; // Add base price when checking

            return {
                ...prevTotals,
                [itemId]: Math.max(currentTotal + priceAdjustment, 0)
            };
        });
    };


    const handleAddToCart = (item) => {
        const currentImageData = item.images[imageIndexes[item.id]];

        // For items with multiple selections, create separate cart items
        if (selectedIngredients[item.id]?.length > 0 && item.id !== 1) {  // Not Kota
            selectedIngredients[item.id].forEach(ingredientName => {
                const ingredientPrice = currentImageData.ingredients.find(
                    ing => ing.name === ingredientName
                )?.itemPrice || 0;

                const singleItem = {
                    category: item.category,
                    itemName: ingredientName,
                    ingredients: [ingredientName],
                    price: { [item.id]: ingredientPrice * (quantities[ingredientName] || 1) },
                    quantity: quantities[ingredientName] || 1
                };

                // Check if this specific ingredient is already in cart
                const itemIndex = cart.findIndex(cartItem =>
                    cartItem.itemName === ingredientName &&
                    JSON.stringify(cartItem.ingredients) === JSON.stringify([ingredientName])
                );

                if (itemIndex === -1) {
                    // Add new item
                    addToCart(singleItem);
                } else {
                    // Update existing item
                    const updatedCart = [...cart];
                    updatedCart[itemIndex] = {
                        ...singleItem,
                        quantity: quantities[ingredientName] || 1
                    };
                    setCart(updatedCart);
                }
            });
        } else {
            // Handle Kota items (item.id === 1) or single selections
            const currentQuantity = quantities[currentImageData.itemName] || 1;
            const currentTotal = itemTotals[item.id] || 0;

            const selectedItem = {
                category: `${item.category} 🍞🥖🧈🧀🍟`,
                itemName: currentImageData.itemName,
                ingredients: selectedIngredients[item.id] || [],
                price: { [item.id]: currentTotal },
                quantity: currentQuantity
            };

            const itemIndex = cart.findIndex(cartItem =>
                cartItem.itemName === selectedItem.itemName &&
                JSON.stringify(cartItem.ingredients) === JSON.stringify(selectedItem.ingredients)
            );

            if (itemIndex === -1) {
                addToCart(selectedItem);
            } else {
                const updatedCart = [...cart];
                updatedCart[itemIndex] = {
                    ...selectedItem,
                    quantity: currentQuantity
                };
                setCart(updatedCart);
            }
        }

        // Reset states after adding to cart
        setSelectedIngredients((prev) => ({ ...prev, [item.id]: [] }));
        setItemTotals((prev) => ({ ...prev, [item.id]: 0 }));
        setQuantities(prev => {
            const newQuantities = { ...prev };
            if (item.id !== 1) {  // Not Kota
                selectedIngredients[item.id]?.forEach(ingredientName => {
                    delete newQuantities[ingredientName];
                });
            }
            delete newQuantities[currentImageData.itemName];
            return newQuantities;
        });
        setSelectAllChecked(false);
    };


    const selectAllIngredients = (itemId) => {
        // Toggle the selectAllChecked state
        setSelectAllChecked((prevChecked) => {
            const newCheckedState = !prevChecked;  // Toggle the state
            setSelectedIngredients((prevSelected) => {
                const ingredients = menuItems.find(item => item.id === itemId)
                    .images[imageIndexes[itemId]].ingredients;

                if (newCheckedState) {
                    // Select all ingredients
                    const allIngredientNames = ingredients.map(ingredient => ingredient.name);

                    // Set the selected ingredients to include all ingredients
                    const updatedSelected = { ...prevSelected, [itemId]: allIngredientNames };

                    // Calculate the total for the selected ingredients
                    setItemTotals((prevTotals) => {
                        const totalAmount = ingredients.reduce((total, ingredient) => {
                            return total + ingredient.itemPrice; // Sum of all ingredient prices
                        }, 0);

                        return { ...prevTotals, [itemId]: totalAmount };
                    });

                    return updatedSelected;
                } else {
                    // Deselect all ingredients
                    const updatedSelected = { ...prevSelected };
                    delete updatedSelected[itemId];  // Remove the selected ingredients for this item

                    // Reset the total for this item
                    setItemTotals((prevTotals) => {
                        const updatedTotals = { ...prevTotals };
                        delete updatedTotals[itemId];  // Remove the total for this item
                        return updatedTotals;
                    });

                    return updatedSelected;
                }
            });

            return newCheckedState;  // Return the new checkbox state
        });
    };

    const updateQuantityPlus = (ingredientName, itemId, itemPrice) => {
        // Don't update if ingredient isn't selected
        if (!selectedIngredients[itemId]?.includes(ingredientName)) return;

        // Update quantities
        setQuantities(prev => {
            const currentQuantity = prev[ingredientName] || 1;
            return {
                ...prev,
                [ingredientName]: currentQuantity + 1
            };
        });

        // Update total price
        setItemTotals(totals => ({
            ...totals,
            [itemId]: Math.max((totals[itemId] || 0) + itemPrice, 0)
        }));
    };

    const updateQuantityMinus = (ingredientName, itemId, itemPrice) => {
        // Get current quantity
        const currentQuantity = quantities[ingredientName] || 1;

        // Don't update if quantity would go below 1
        if (currentQuantity <= 1) {
            return;
        }

        // Update quantities
        setQuantities(prev => ({
            ...prev,
            [ingredientName]: currentQuantity - 1
        }));

        // Update total price
        setItemTotals(totals => ({
            ...totals,
            [itemId]: Math.max((totals[itemId] || 0) - itemPrice, 0)
        }));
    };

    // Separate Kota quantity handlers
    const updateKotaQuantityPlus = (itemName, itemId, totalAmount) => {
        const currentQuantity = quantities[itemName] || 1;
        const newQuantity = currentQuantity + 1;

        setQuantities(prev => ({
            ...prev,
            [itemName]: newQuantity
        }));

        setItemTotals(prev => ({
            ...prev,
            [itemId]: totalAmount * newQuantity
        }));
    };

    const updateKotaQuantityMinus = (itemName, itemId, totalAmount) => {
        const currentQuantity = quantities[itemName] || 1;
        if (currentQuantity <= 1) {
            // Reset all states for this Kota item
            setQuantities(prev => {
                const { [itemName]: removed, ...rest } = prev;
                return rest;
            });
            setItemTotals(prev => ({
                ...prev,
                [itemId]: 0
            }));
            setSelectAllChecked(false);
            return;
        }

        const newQuantity = currentQuantity - 1;

        setQuantities(prev => ({
            ...prev,
            [itemName]: newQuantity
        }));

        setItemTotals(prev => ({
            ...prev,
            [itemId]: totalAmount * newQuantity
        }));
    };

    const filteredMenu =
        activeCategory === "All"
            ? menuItems
            : menuItems.filter((item) => item.category === activeCategory);

    return (
        <div>
            <Navbar />
            <div className="section-menu" id="menu">
                <div className="menu-container">
                    <h2 className="menu-header">
                        🔥 Kasi Flavors, Straight from the Streets! 🍗
                    </h2>
                    <ul className="category" style={{ display: "none" }}>
                        {categories.map((category) => (
                            <li
                                key={category}
                                className={activeCategory === category ? "active" : ""}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                    <h3 className="active-category" style={{ display: "none" }}>
                        {activeCategory}
                    </h3>
                    <div className="cart-info">
                        <div>
                            <button disabled className="btn btn-warning" style={{ display: "flex" }}>
                                <div><box-icon name='cart' color="#ffcc00" ></box-icon></div>
                                <div>{cart.length} items</div>
                            </button>
                        </div>
                        {hasSelectedItems && <div
                            style={{
                                position: 'fixed',
                                bottom: '0',
                                left: '2rem',
                                right: '2rem',
                                backgroundColor: '#34495e',
                                border: '1px solid #b8daff',
                                color: 'red',
                                padding: '5px',
                                textAlign: 'center',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                zIndex: 1000,
                                animation: 'fadeIn 0.3s ease-in',

                            }}
                        >
                            <div>
                                <div><box-icon name='cart-download' animation='tada' color='red' ></box-icon></div>
                                <div>You have pending items...</div>
                            </div>


                        </div>
                        }
                        {
                            cart.length > 0 &&
                            <div>
                                <Link to="/cart" style={{ listStyle: "none" }}>
                                    <button className="btn btn-warning" style={{ display: "flex" }}>
                                        <div><box-icon name='cart-alt' color="#ffcc00" type='solid' ></box-icon></div>
                                        <div>View cart</div>
                                    </button>
                                </Link>
                            </div>
                        }
                    </div>

                    <div className="restaurant-menu-container">
                        {filteredMenu.map((item) => {
                            const currentIdx = imageIndexes[item.id] || 0;
                            const currentImageData = item.images[currentIdx];

                            // Ensure currentImageData exists before trying to access its properties
                            if (!currentImageData) {
                                return null;  // Skip rendering if currentImageData is undefined
                            }

                            return (
                                <div key={item.id} className="menu-category">
                                    <div className="restaurant-menu">
                                        <div className="menu-item">
                                            <div className="menu-item-header">
                                                <div style={{ position: 'relative', width: '100%', height: '200px' }}> {/* Adjust height as needed */}
                                                    {(!imageLoading[currentImageData.imageItem]) && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            backgroundColor: '#f5f5f5'
                                                        }}>
                                                            <box-icon name='loader-alt' animation='spin' color='#ffcc00'></box-icon>
                                                        </div>
                                                    )}
                                                    <img
                                                        src={currentImageData.imageItem}
                                                        alt={item.category}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            display: imageLoading[currentImageData.imageItem] ? 'block' : 'none'
                                                        }}
                                                        onLoad={() => setImageLoading(prev => ({
                                                            ...prev,
                                                            [currentImageData.imageItem]: true
                                                        }))}
                                                    />
                                                </div>
                                                <div className="menu-item-header-text">
                                                    <h3>{currentImageData.itemName}</h3>
                                                    <h3>
                                                        {currentImageData.totalAmount === undefined
                                                            ? ""
                                                            : `R ${currentImageData.totalAmount}.00`}
                                                    </h3>
                                                </div>
                                                <div className="ingridient-change">
                                                    {item.images.length > 1 && (
                                                        <>
                                                            <div onClick={() => handlePreviousImage(item.id)}>
                                                                <box-icon size="30px" color="#ffcc00" name="left-arrow-alt"></box-icon>
                                                            </div>
                                                            <div onClick={() => handleNextImage(item.id)}>
                                                                <box-icon size="30px" color="#ffcc00" name="right-arrow-alt"></box-icon>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <h4 style={{ marginLeft: "1rem" }}>{item.category}</h4>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" style={{ display: item.id === 1 && "none" }}>Check</th>
                                                        <th scope="col">Item</th>
                                                        <th scope="col" style={{ display: item.id === 1 && "none" }}>Price</th>
                                                        <th scope="col" style={{ display: item.id === 1 && "none" }}>Quantity</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* <ul className="ingredients"> */}
                                                    {currentImageData.ingredients?.map((ingredient, idx) => (
                                                        <tr key={idx}>
                                                            <td style={{ display: item.id === 1 && "none" }}>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={!!selectedIngredients[item.id]?.includes(ingredient.name)} // Ensures a boolean
                                                                    onChange={() => handleIngredientToggle(item.id, ingredient.name, ingredient.itemPrice)}
                                                                    disabled={item.id === 1}
                                                                />
                                                            </td>
                                                            <td><span>{ingredient.name}</span></td>
                                                            <td style={{ display: item.id === 1 && "none" }}>
                                                                {item.id !== 1 && <span>R {ingredient.itemPrice}</span>}
                                                            </td>
                                                            <td style={{ display: item.id === 1 && "none" }}>
                                                                {selectedIngredients[item.id]?.includes(ingredient.name) && (
                                                                    <div style={{ display: "flex", gap: "1rem" }}>
                                                                        <div onClick={() => updateQuantityMinus(ingredient.name, item.id, ingredient.itemPrice)}>
                                                                            <box-icon name='minus' color='#ffcc00' ></box-icon>
                                                                        </div>
                                                                        <div>{quantities[ingredient.name] || 1}</div>
                                                                        <div onClick={() => updateQuantityPlus(ingredient.name, item.id, ingredient.itemPrice)}>
                                                                            <box-icon name='plus' color='#ffcc00' ></box-icon>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}

                                                    {item.id === 1 &&
                                                        <div style={{ display: item.id === 1 && "flex", backgroundColor: "#404040" }}>
                                                            <div style={{ backgroundColor: "#404040" }}>
                                                                <input type="checkbox"
                                                            
                                                                checked={selectAllChecked}
                                                                onClick={() =>
                                                                    selectAllIngredients(
                                                                        item.id,
                                                                    )
                                                                } />
                                                            </div>

                                                            <div style={{
                                                                        backgroundColor: "#404040"
                                                                    }}>
                                                                <span>
                                                                    {item.id === 1
                                                                        ? <span><strong>{currentImageData.itemName.charAt(0).toUpperCase() + currentImageData.itemName.slice(1).toLowerCase()}</strong> kota</span>
                                                                        : "Select all".charAt(0).toUpperCase() + "Select all".slice(1).toLowerCase()}
                                                                </span>
                                                            </div>
                                                            <div style={{ backgroundColor: "#404040" }}>
                                                                {item.id === 1 && selectAllChecked && (
                                                                    <div style={{
                                                                        display: "flex",
                                                                        gap: "1rem",
                                                                        backgroundColor: "#404040"
                                                                    }}>
                                                                        <div onClick={() => updateKotaQuantityMinus(currentImageData.itemName, item.id, currentImageData.totalAmount)}>
                                                                            <box-icon name='minus' color='#ffcc00' ></box-icon>
                                                                        </div>
                                                                        <div>{quantities[currentImageData.itemName] || 1}</div>
                                                                        <div onClick={() => updateKotaQuantityPlus(currentImageData.itemName, item.id, currentImageData.totalAmount)}>
                                                                            <box-icon name='plus' color='#ffcc00' ></box-icon>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    }
                                                </tbody>
                                            </table>
                                            <div className="menu-item-footer">
                                                <div className="item-price">
                                                    <span>SubTotal: R {(itemTotals[item.id] || 0)}</span>
                                                </div>
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() => handleAddToCart(item)}
                                                    disabled={
                                                        itemTotals[item.id] === 0 ||
                                                        itemTotals[item.id] === null ||
                                                        itemTotals[item.id] === undefined
                                                    }
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Menu;


