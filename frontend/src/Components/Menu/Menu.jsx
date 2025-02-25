import React, { useState } from "react";
import "./Menu.scss";
import Navbar from "../Navbar/Navbar";

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedIngredients, setSelectedIngredients] = useState({}); // Track selected ingredients per item

    const categories = [
        "All",
        "Kota",
        "Grilled Meat",
        "Braaied Chicken",
        "Burgers",
        "Boerewors Rolls",
        "Chips & Snacks",
        "Beverages",
    ];

    const menuItems = [
        {
            id: 1,
            category: "Kota Special",
            image: "https://www.eatout.co.za/wp-content/uploads/2016/01/Kota-Joe-5-600x450.jpg",
            title: "Food Restaurant | Kota Special",
            ingredients: [
                { name: "Quarter loaf bread", itemPrice: 5.00 },
                { name: "Polony", itemPrice: 5.00 },
                { name: "Russian", itemPrice: 8.00 },
                { name: "Cheese", itemPrice: 7.00 },
                { name: "Egg", itemPrice: 5.00 },
                { name: "Sauce", itemPrice: 2.00 }
            ],
            price: 25.00
        },
        {
            id: 2,
            category: "Grilled Meat",
            image: "https://www.kokko.net/img/cms/Blog%20Kokko/steak-grillade-kokko.jpg",
            title: "Flame Grilled Steak",
            ingredients: [
                { name: "Beef steak", itemPrice: 20.00 },
                { name: "Salt & Pepper", itemPrice: 2.00 },
                { name: "Garlic Butter", itemPrice: 4.00 },
                { name: "BBQ Sauce", itemPrice: 4.00 }
            ],
            price: 30.00
        },
        {
            id: 3,
            category: "Braaied Chicken",
            image: "https://kathradas.co.za/wp-content/uploads/2021/01/braai-3.png",
            title: "Charcoal Grilled Chicken",
            ingredients: [
                { name: "Chicken pieces", itemPrice: 25.00 },
                { name: "Marinade", itemPrice: 5.00 },
                { name: "Spices", itemPrice: 3.00 },
                { name: "Peri-Peri Sauce", itemPrice: 7.00 }
            ],
            price: 35.00
        },
        {
            id: 4,
            category: "Boerewors Rolls",
            image: "https://assets.unileversolutions.com/recipes-v2/163157.jpg",
            title: "South African Style Boerewors Rolls",
            ingredients: [
                { name: "Boerewors", itemPrice: 12.00 },
                { name: "Fresh Bun", itemPrice: 5.00 },
                { name: "Tomato Relish", itemPrice: 3.00 },
                { name: "Mustard Sauce", itemPrice: 2.00 }
            ],
            price: 20.00
        },
        {
            id: 5,
            category: "Chips & Snacks",
            image: "https://www.snackandbakery.com/ext/resources/ci/Everyday/2021/Ember2_900x550.jpeg?1670345707",
            title: "Loaded Fries",
            ingredients: [
                { name: "French Fries", itemPrice: 5.00 },
                { name: "Cheese", itemPrice: 5.00 },
                { name: "Bacon Bits", itemPrice: 5.00 },
                { name: "Mayo", itemPrice: 5.00 },
                { name: "Chili Sauce", itemPrice: 3.00 }
            ],
            price: 15.00
        },
        {
            id: 6,
            category: "Beverages",
            image: "https://www.yebosouthafrica.com/wp-content/uploads/2021/04/south-african-beers-1024x682.jpg",
            title: "Soft Drinks & Shakes",
            ingredients: [
                { name: "Windhoek", itemPrice: 10.00 },
                { name: "Amstel", itemPrice: 10.00 },
                { name: "Castle", itemPrice: 10.00 },
                { name: "Hunters", itemPrice: 10.00 },
                { name: "Savanna", itemPrice: 10.00 }
            ],
            price: 10.00
        },
        {
            id: 7,
            category: "Beverages",
            image: "https://eu-images.contentstack.com/v3/assets/blta023acee29658dfc/blta9f158c45627aa62/651dbb742365a678d7ec7f18/AdobeStock_279692163_Editorial_Use_Only-Beverage-FTR-new.jpg",
            title: "Soft Drinks & Shakes",
            ingredients: [
                { name: "Coke", itemPrice: 10.00 },
                { name: "Fanta", itemPrice: 10.00 },
                { name: "Sprite", itemPrice: 10.00 },
                { name: "Milkshake (Vanilla)", itemPrice: 15.00 },
                { name: "Milkshake (Chocolate)", itemPrice: 15.00 },
                { name: "Milkshake (Strawberry)", itemPrice: 15.00 }
            ],
            price: 10.00
        }
    ];


    const filteredMenu = activeCategory === "All"
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const handleCheckboxChange = (itemId, ingredientIndex) => {
        setSelectedIngredients((prevSelected) => {
            const currentSelections = prevSelected[itemId] || {};
            const isChecked = currentSelections[ingredientIndex] || false;

            return {
                ...prevSelected,
                [itemId]: {
                    ...currentSelections,
                    [ingredientIndex]: !isChecked
                }
            };
        });
    };

    const calculateTotal = (itemId, ingredients) => {
        const selected = selectedIngredients[itemId] || {};
        return ingredients.reduce((total, ingredient, index) => {
            return selected[index] ? total + ingredient.itemPrice : total;
        }, 0).toFixed(2); // Ensure decimal formatting
    };

    return (
        <div>
            <Navbar />c
            <div className="section-menu" id="menu">
                <div className="menu-container">
                <h2 class="menu-header">🔥 Kasi Flavors, Straight from the Streets! 🍗</h2>
                <ul className="category">
                        {categories.map((category) => (
                            <li
                                key={category}
                                className={activeCategory === category ? "active" : ""}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>

                    <h3 className="active-category">{activeCategory}</h3>

                    {/* Menu List */}
                    <div className="restaurant-menu-container">
                        <div className="restaurant-menu">
                            {filteredMenu.map((item) => (
                                <div className="menu-item" key={item.id}>
                                    <img src={item.image} alt={item.title} />
                                    <div className="title">{item.title}</div>
                                    <ul className="ingredients">
                                        {item.ingredients.map((ingredient, idx) => (
                                            <li key={idx}>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleCheckboxChange(item.id, idx)}
                                                    checked={selectedIngredients[item.id]?.[idx] || false}
                                                /> {ingredient.name} - R {ingredient.itemPrice.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="order flex">
                                        <div className="price">Total: R {calculateTotal(item.id, item.ingredients)}</div>
                                        <button className="btn btn-menu">
                                            <div>
                                                <box-icon color="#FFFFFF" name='cart-add' type='solid' animation='tada' ></box-icon>
                                            </div>
                                            <div>Add to cart</div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;



