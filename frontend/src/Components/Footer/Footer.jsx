import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div class="footer">
            <div class="footer-container flex">
                <div class="footer-about">
                    <h2>About</h2>
                    <p>
                        Olieven Kota & Grills, a place where authentic South African flavors meet quality ingredients and unmatched hospitality.
                        Nestled in the heart of Olievenhoutbosch, we bring the rich, bold, and traditional street food experience to life, serving up the best kotas, flame-grilled meats, and classic township-style meals that keep our customers coming back for more.
                    </p>
                </div>

                <div class="footer-category">
                    <h2>Our Menu</h2>

                    <ul>
                        <li>Kota</li>
                        <li>Kota Extras</li>
                        <li>Soft Drinks</li>
                        <li>Chips</li>
                        <li>Burger Patty</li>
                    </ul>
                </div>

                <div class="quick-links">
                    <h2>Quick Links</h2>

                    <ul>
                        {
                            [
                                { path: "/how_it_works", name: "How it works" },
                                { path: "/menu", name: "Menu" },
                                { path: "/cart", name: "Cart" },
                                { path: "/review", name: "Reviews" },
                                { path: "/about", name: "About Us" },
                                { path: "/faq", name: "FAQ's" },
                                { path: "/services", name: "Services" },
                                { path: "/contact_us", name: "Contact Us" },
                            ].map((link, idx) => {
                                return (
                                    <Link style={{ textDecoration: "none" }} key={idx} to={link.path}
                                    >
                                        <li>{link.name}</li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>

                <div class="get-in-touch">
                    <h2>Get in touch</h2>
                    <ul>
                        <li>Support Center</li>
                        <li>Feedback</li>
                        <li>Suggession</li>
                    </ul>
                </div>

                <div class="get-in-touch">
                    <h2>Account</h2>
                    <ul>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <li>Account</li>
                        </Link>
                    </ul>
                </div>
                
            </div>

            <div class="copyright">
                <p>Copyright &copy; 2025. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
