import React, { useState, useMemo, useEffect } from "react";
import "./Menu.scss";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Menu = ({ addToCart, cart }) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [imageIndexes, setImageIndexes] = useState({});
    const [itemTotals, setItemTotals] = useState({}); // Track total price per item

    const categories = useMemo(
        () => [
            "All",
            "Kota Special",
            "Grilled Meat",
            "Braaied Chicken",
            "Street Burgers",
            "Beverages",
        ],
        []
    );

    const menuItems = useMemo(() => [
        {
            id: 1,
            category: "Kota Special",
            images: [
                {
                    imageId: 1,
                    itemName: "Kota Joe",
                    imageItem: "https://www.eatout.co.za/wp-content/uploads/2016/01/Kota-Joe-5-600x450.jpg",
                    ingredients: [
                        { name: "Quarter loaf bread", itemPrice: 5.00 },
                        { name: "Polony", itemPrice: 2.00 },
                        { name: "Russian", itemPrice: 8.00 },
                        { name: "French Fries", itemPrice: 10.00 }
                    ]
                },
                {
                    imageId: 2,
                    itemName: "Kota Special 2",
                    imageItem: "https://lh3.googleusercontent.com/40I6BfXs29ybMx9KBZGsBOYBXkXZYc4Y2pOo32G6AF4XShhWnD3VEkZ4W8iX65g0yXcUqIahFududEmDWGtECDpZ8zWFZRS0EjY-=s750",
                    ingredients: [
                        { name: "Cheese", itemPrice: 3.00 },
                        { name: "Egg", itemPrice: 3.00 },
                        { name: "Chakalaka", itemPrice: 2.00 },
                        { name: "Beef", itemPrice: 15.00 }
                    ]
                }
            ],
            price: 25.00
        },
        {
            id: 2,
            category: "Grilled Meat",
            images: [
                {
                    imageId: 1,
                    itemName: "Grilled Steak",
                    imageItem: "https://lowcarbafrica.com/wp-content/uploads/2022/10/Nyama-Choma-IG-1.jpg",
                    ingredients: [
                        { name: "Beef steak", itemPrice: 20.00 },
                        { name: "Salt & Pepper", itemPrice: 2.00 },
                        { name: "Garlic Butter", itemPrice: 4.00 }
                    ]
                },
                {
                    imageId: 2,
                    itemName: "Grilled Meat Special",
                    imageItem: "https://www.seriouseats.com/thmb/xBpjlTGEywUgh43aMVSFcq014lg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2019__07__20190619-korean-bbq-kalbi-beef-short-ribs-vicky-wasik-21-6d69144cd74a478a81b0286b19cd79ba.jpg",
                    ingredients: [
                        { name: "BBQ Sauce", itemPrice: 4.00 },
                        { name: "Grilled Onions", itemPrice: 3.00 },
                        { name: "Side Salad", itemPrice: 5.00 }
                    ]
                }
            ],
            price: 30.00
        },
        {
            id: 3,
            category: "Braaied Chicken",
            images: [
                {
                    imageId: 1,
                    itemName: "Braai Chicken",
                    imageItem: "https://kathradas.co.za/wp-content/uploads/2021/01/braai-3.png",
                    ingredients: [
                        { name: "Chicken pieces", itemPrice: 25.00 },
                        { name: "Marinade", itemPrice: 5.00 },
                        { name: "Spices", itemPrice: 3.00 }
                    ]
                },
                {
                    imageId: 2,
                    itemName: "Peri-Peri Braaied Chicken",
                    imageItem: "https://example.com/braaied-chicken-2.jpg",
                    ingredients: [
                        { name: "Peri-Peri Sauce", itemPrice: 7.00 },
                        { name: "Grilled Lemon", itemPrice: 3.00 },
                        { name: "Herb Butter", itemPrice: 4.00 }
                    ]
                }
            ],
            price: 35.00
        },
        {
            id: 4,
            category: "Street Burgers",
            images: [
                {
                    imageId: 1,
                    itemName: "Classic Burger",
                    imageItem: "https://streetburgers.lv/wp-content/uploads/2022/01/ghetto-burgers-street-burger-10.01.2022-121-of-342-scaled.jpg",
                    ingredients: [
                        { name: "Beef patty", itemPrice: 18.00 },
                        { name: "Lettuce", itemPrice: 2.00 },
                        { name: "Tomato", itemPrice: 2.00 },
                        { name: "Cheese", itemPrice: 3.00 }
                    ]
                },
                {
                    imageId: 2,
                    itemName: "Bacon Burger",
                    imageItem: "https://media-cdn.tripadvisor.com/media/photo-s/26/cd/9b/e6/our-best-seller-bacon.jpg",
                    ingredients: [
                        { name: "Crispy Bacon", itemPrice: 5.00 },
                        { name: "BBQ Sauce", itemPrice: 3.00 },
                        { name: "Pickles", itemPrice: 2.00 },
                        { name: "Double Cheese", itemPrice: 5.00 }
                    ]
                }
            ],
            price: 40.00
        },
        {
            id: 5,
            category: "Beverages",
            images: [
                {
                    imageId: 1,
                    itemName: "Traditional Mageu",
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
                    itemName: "Umqombothi & Ginger Beer",
                    imageItem: "https://lh3.googleusercontent.com/-1VuBtZIqhqJodQKoCS4BUSETWOT9HWEZE07loreo3xFd__MRuI5epacVfElr8kaLzS2hmiSCeqatAdRM-4K96SlWb8vW2re03CD2Lm-EbAh=s1500",
                    ingredients: [
                        { name: "Blac label", itemPrice: 20.00 },
                        { name: "Amstel", itemPrice: 15.00 }
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

            // Recalculate the total based on ingredient selection
            setItemTotals((prevTotals) => {
                const updatedTotal = prevTotals[itemId] || 0;
                let newTotal = updatedTotal;

                if (updatedSelection.includes(ingredientName)) {
                    newTotal += ingredientPrice; // Add price when selected
                } else {
                    newTotal -= ingredientPrice; // Subtract price when deselected
                }

                return { ...prevTotals, [itemId]: newTotal };
            });

            return { ...prevSelected, [itemId]: updatedSelection };
        });
    };

    const handleAddToCart = (item) => {
        const selectedItem = {
            category: item.category,
            itemName: item.images[imageIndexes[item.id]].itemName,
            ingredients: selectedIngredients[item.id] || [],
            price: item.price
        };

        addToCart(selectedItem);

        setSelectedIngredients((prev) => ({
            ...prev,
            [item.id]: [],
        }));
        setItemTotals((prev) => ({
            ...prev,
            [item.id]: 0,
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
                    <ul className="category">
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
                    <h3 className="active-category">
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
                                                <h3 className="menu-item-header-text">{item.category}</h3>
                                                <div className="ingridient-change">
                                                    <div onClick={() => handlePreviousImage(item.id)}>
                                                        <box-icon color="#ffcc00" name="left-arrow-alt"></box-icon>
                                                    </div>
                                                    <div onClick={() => handleNextImage(item.id)}>
                                                        <box-icon color="#ffcc00" name="right-arrow-alt"></box-icon>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4>{currentImageData.itemName}</h4>
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
                                                        <span>R {ingredient.itemPrice}</span>
                                                    </li>
                                                ))}
                                            </ul>
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



