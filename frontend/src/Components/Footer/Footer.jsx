import React from 'react'
import './Footer.scss'

const Footer = () => {
    return (
        <div class="footer">
            <div class="footer-container flex">
                <div class="footer-about">
                    <h2>About</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                        aspernatur sit deleniti enim voluptas voluptatum incidunt rerum,
                        exercitationem voluptate nemo quo impedit ad perspiciatis tempore
                        nulla dolore fugit, fuga eos.
                    </p>
                </div>

                <div class="footer-category">
                    <h2>Our Menu</h2>

                    <ul>
                        <li>Biryani</li>
                        <li>Chicken</li>
                        <li>Pizza</li>
                        <li>Burger</li>
                        <li>Pasta</li>
                    </ul>
                </div>

                <div class="quick-links">
                    <h2>Quick Links</h2>

                    <ul>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Menu</li>
                        <li>Order</li>
                        <li>Services</li>
                    </ul>
                </div>

                <div class="get-in-touch">
                    <h2>Get in touch</h2>
                    <ul>
                        <li>Account</li>
                        <li>Support Center</li>
                        <li>Feedback</li>
                        <li>Suggession</li>
                    </ul>
                </div>
            </div>

            <div class="copyright">
                <p>Copyright &copy; 2022. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
