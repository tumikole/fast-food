import React, { useState, useMemo, useEffect } from "react";
import "./Menu.scss";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Menu = ({ addToCart, cart, setCart }) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [imageIndexes, setImageIndexes] = useState({});
    const [itemTotals, setItemTotals] = useState({}); // Track total price per item

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
                    totalAmount: 15.00
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
                    totalAmount: 20.00
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
                    totalAmount: 26.00
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
                    totalAmount: 0
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
                    totalAmount: 0
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
                    totalAmount: 0
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
                    totalAmount: 35.00
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
                    totalAmount: 43.00
                },
                {
                    imageId: 10,
                    itemName: "MAKHADZI",
                    imageItem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzSFMIKBiI7k8fqVQX31gSlblPndJlzj7bQ&s",
                    ingredients: [
                        { name: "QUARTER OF BREAD", itemPrice: 5.00 },
                        { name: "CHIPS", itemPrice: 5.00 },
                        { name: "LETTUCE", itemPrice: 3.00 },
                        { name: "POLONY", itemPrice: 2.00 },
                        { name: "FULL RUSSSIAN", itemPrice: 15.00 },
                        { name: "BURGER PATTY", itemPrice: 15.00 },

                    ],
                    totalAmount: 48.00
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
                    totalAmount: 60.00
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
                    totalAmount: 65.00
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
                    imageItem: "https://localdeli.co.za/wp-content/uploads/2023/07/Vienna.jpg",
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
                    imageItem: "https://www.nzmp.com/content/dam/nzmp/global/images/product-shots/product-page-master/product-images-grey-background/tile-800x600-_0038_Gouda-block-slice.png",
                    ingredients: [
                        { name: "CHEESE", itemPrice: 4.00 },

                    ]
                }
                ,
                {
                    imageId: 4,
                    itemName: "EGG",
                    imageItem: "https://img.freepik.com/premium-photo/top-view-photo-fried-egg-white-background_908985-53217.jpg",
                    ingredients: [
                        { name: "EGG", itemPrice: 4.00 },

                    ]
                }
                ,
                {
                    imageId: 5,
                    itemName: "B/PATTY",
                    imageItem: "https://www.shutterstock.com/image-photo/grilled-hamburger-meat-beef-patty-600nw-2452861847.jpg",
                    ingredients: [
                        { name: "PATTY", itemPrice: 15.00 },

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
                    imageItem: "https://lh3.googleusercontent.com/proxy/9Se4y7QfUNTZoUquCi5eUFqEYgVHsvT7ujPAVV6pBBCdlLSVHkHlBrueUjnmYhAd0ZivKr8KueY0kY3jCZcX6jbcLFnRdUVbcidAc14CxhLD4miwsQ",
                    ingredients: [
                        { name: "SMALL CHIPS", itemPrice: 20.00 },
                        { name: "MID CHIPS", itemPrice: 25.00 },
                        { name: "LARGER CHIPS	", itemPrice: 30.00 },
                        { name: "X LARGER CHIPS", itemPrice: 40.00 },
                        { name: "MED CHIPS + RUSSIAN", itemPrice: 45.00 },

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
                        { name: "Coke", itemPrice: 12.00 },
                        { name: "Fanta", itemPrice: 25.00 },
                        { name: "Pepsi", itemPrice: 10.00 },
                        { name: "Sprite", itemPrice: 25.00 },
                        { name: "Lipton", itemPrice: 25.00 },
                        { name: "Miranda", itemPrice: 25.00 },
                        { name: "Scwepes", itemPrice: 25.00 },



                    ]
                },
                {
                    imageId: 2,
                    itemName: "Beer",
                    imageItem: "https://lh3.googleusercontent.com/-1VuBtZIqhqJodQKoCS4BUSETWOT9HWEZE07loreo3xFd__MRuI5epacVfElr8kaLzS2hmiSCeqatAdRM-4K96SlWb8vW2re03CD2Lm-EbAh=s1500",
                    ingredients: [
                        { name: "Blac label", itemPrice: 22.00 },
                        { name: "Amstel", itemPrice: 22.00 },
                        { name: "Hansa Pilsner", itemPrice: 20.00 },
                        { name: "Castle Milk Stout", itemPrice: 25.00 },
                        { name: "Castle Lite", itemPrice: 22.00 },
                        { name: "Castle Larger", itemPrice: 20.00 }
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
    };

    const resetSelections = (id) => {
        setSelectedIngredients((prevState) => ({
            ...prevState,
            [id]: [],
        }));
        setItemTotals((prevTotals) => ({
            ...prevTotals,
            [id]: 0,
        }));
    };


    const handleIngredientToggle = (itemId, ingredientName, ingredientPrice) => {
        setSelectedIngredients((prevSelected) => {
            const newSelection = prevSelected[itemId] || [];
            const updatedSelection = newSelection.includes(ingredientName)
                ? newSelection.filter((i) => i !== ingredientName)
                : [...newSelection, ingredientName];

            setItemTotals((prevTotals) => {
                const updatedTotal = prevTotals[itemId] || 0;
                console.log(updatedTotal)
                const newTotal = updatedSelection.reduce((total, ingredient) => {
                    const ingredientPrice = menuItems.find(item => item.id === itemId)
                        .images[imageIndexes[itemId]].ingredients.find(i => i.name === ingredient)
                        .itemPrice;

                    return total + ingredientPrice;
                }, 0);
                console.log({ newTotal })

                return { ...prevTotals, [itemId]: newTotal };
            });
            console.log({ hggfhhf: updatedSelection })
            return { ...prevSelected, [itemId]: updatedSelection };
        });
    };




    const handleAddToCart = (item) => {
        const selectedItem = {
            category: item.category,
            itemName: item.images[imageIndexes[item.id]].itemName,
            ingredients: selectedIngredients[item.id] || [],
            price: itemTotals
        };

        // Check if the item is already in the cart and update accordingly
        const itemIndex = cart.findIndex(cartItem =>
            cartItem.itemName === selectedItem.itemName &&
            JSON.stringify(cartItem.ingredients) === JSON.stringify(selectedItem.ingredients)
        );

        if (itemIndex === -1) {
            // Item is not in the cart, add it
            addToCart(selectedItem);
        } else {
            // Item already exists in the cart, update its quantity
            const updatedCart = [...cart];
            updatedCart[itemIndex].quantity = (updatedCart[itemIndex].quantity || 1) + 1;
            setCart(updatedCart);
        }

        // setCartCount((prevCount) => prevCount + 1);
        setSelectedIngredients((prev) => ({ ...prev, [item.id]: [] }));
        setItemTotals((prev) => ({ ...prev, [item.id]: 0 }));
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
                    <h3 className="active-category" style={{display: "none"}}>
                        {activeCategory}
                    </h3>
                    <div className="cart-info">
                        <div>
                            <button disabled className="btn btn-warning" style={{ display: "flex" }}>
                                <div><box-icon name='cart' ></box-icon></div>
                                <div>{cart.length} items</div>
                            </button>
                        </div>
                        {
                            cart.length > 0 &&
                            <div>
                                <Link to="/cart" style={{ listStyle: "none" }}>
                                    <button className="btn btn-warning" style={{ display: "flex" }}>
                                        <div><box-icon name='cart-alt' type='solid' ></box-icon></div>
                                        <div>Show cart</div>
                                    </button>
                                </Link>
                            </div>
                        }
                    </div>

                    <div className="restaurant-menu-container">
                        {filteredMenu.map((item) => {
                            const currentIdx = imageIndexes[item.id] || 0;
                            const currentImageData = item.images[currentIdx];
                            return (
                                <div key={item.id} className="menu-category">
                                    <div className="restaurant-menu">
                                        <div className="menu-item">
                                            <div className="menu-item-header">
                                                <img
                                                    src={currentImageData.imageItem}
                                                    alt={item.category}
                                                />
                                                <div className="menu-item-header-text">
                                                    <h3>{currentImageData.itemName}</h3>
                                                    <h3>{currentImageData.totalAmount === undefined ? "" : `R ${currentImageData.totalAmount}.00`}</h3>
                                                </div>
                                                <div className="ingridient-change">
                                                    <div onClick={() => handlePreviousImage(item.id)}>
                                                        <box-icon color="#ffcc00" name="left-arrow-alt"></box-icon>
                                                    </div>
                                                    <div onClick={() => handleNextImage(item.id)}>
                                                        <box-icon color="#ffcc00" name="right-arrow-alt"></box-icon>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 style={{ marginLeft: "1rem" }}>{item.category}</h4>
                                            <ul className="ingredients">
                                                {currentImageData.ingredients.map((ingredient, idx) => (
                                                    <li key={idx}>
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                selectedIngredients[item.id]?.includes(ingredient.name) || false
                                                            }
                                                            onChange={() =>
                                                                handleIngredientToggle(
                                                                    item.id,
                                                                    ingredient.name,
                                                                    ingredient.itemPrice
                                                                )
                                                            }
                                                        />
                                                        <span>{ingredient.name}</span>
                                                        {/* <span>R {ingredient.itemPrice}</span> */}
                                                    </li>
                                                ))}
                                            </ul>
                                            {/* <figure>{currentImageData.totalAmount}</figure> */}
                                            <div className="menu-item-footer">
                                                <div className="item-price">
                                                    <span>R {itemTotals[item.id] || 0}</span>
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



