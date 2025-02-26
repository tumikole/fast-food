import React from "react";
import Navbar from "../Navbar/Navbar";
import "./About.scss";

const About = () => {
  return (
    <section className="about" id="about">
      <Navbar />
      <div className="about-container flex">

        <div className="text">
          <h2 className="primary">About Our Restaurant</h2>
          <div>
            <div className="visual">
              <img src="https://raw.githubusercontent.com/programmercloud/foodlover/main/img/about.png" alt="About Us" />
            </div>
            <p className="visual-paragraphs">Welcome to Olieven Kota & Grills, a place where authentic South African flavors meet quality ingredients and unmatched hospitality.
              Nestled in the heart of Olievenhoutbosch, we bring the rich, bold, and traditional street food experience to life,
              serving up the best kotas, flame-grilled meats, and classic township-style meals that keep our customers coming back for more.
            </p>
          </div>
          <h3 className="about-sub-header">Our Story</h3>
          <p className="paragraphs">
            Olieven Kota & Grills was founded with a simple vision—to celebrate South Africa’s vibrant kasi culture through food.
            Inspired by the mouthwatering flavors found in the streets of Soweto, Alexandra, and Mamelodi, we have perfected the art of crafting delicious,
            hearty, and satisfying meals that resonate with both locals and visitors.
          </p>
          <p className="paragraphs">
            From our humble beginnings, we have grown into a well-loved food spot, known for our generous portions, fresh ingredients,
            and unique spin on township street food. Whether you're a fan of the classic kota stuffed with polony, atchar,
            and fresh fries or you crave a succulent grilled steak with our signature sauces, we have something for everyone.
          </p>

          <h3 className="about-sub-header">What We Serve</h3>
          <p className="paragraphs">At Olieven Kota & Grills, we pride ourselves on offering a diverse menu packed with South African favorites:</p>
          <p className="paragraphs">✅ Signature Kotas – Freshly baked bread filled with crispy fries, flavorful meats, and our special house sauces. Choose from polony, Russian, beef, chicken, or even our loaded deluxe kota options.</p>
          <p className="paragraphs">🔥 Flame-Grilled Meats – Perfectly seasoned chicken, ribs, T-bone steaks, and boerewors, all cooked over an open flame for that smoky, mouthwatering taste.</p>
          <p className="paragraphs">🍟 Classic Sides & Extras – Golden crispy fries, creamy pap, chakalaka, coleslaw, and more to complete your meal.</p>
          <p className="paragraphs">🥤 Refreshing Beverages – From soft drinks to locally inspired beverages, we have the perfect drink to wash down your meal.</p>

          <h3 className="about-sub-header">Why Choose Us?</h3>
          <ul className="Why-choose-us-list-containser">
            <li><b>Authentic Kasi Flavor -</b> Our meals capture the true essence of township street food, giving you an experience that feels like home.</li>
            <li><b>Fresh, High-Quality Ingredients –</b> We use only the finest and freshest ingredients to ensure top-tier taste and quality in every bite.</li>
            <li><b>Friendly & Fast Service –</b> Whether you're dining in or grabbing a quick bite, we prioritize excellent customer service and efficiency.</li>
            <li><b>Affordable Prices –</b> Enjoy generous portions at prices that are budget-friendly without compromising on quality.</li>
            <li><b>Great Vibes & Community Spirit –</b> More than just a restaurant, Olieven Kota & Grills is a place where friends and family come together to share great food and good memories.</li>
          </ul>

          <h3 className="about-sub-header">Visit Us Today!</h3>
          <p className="paragraphs">If you're in Olievenhoutbosch or surrounding areas,
            make sure to stop by and experience the best kotas and grills in town.
            Whether you’re grabbing a meal on the go or sitting down to enjoy a feast,
            we guarantee you’ll leave happy, full, and craving more!</p>
          <ul className="visit-us-today-list-containser">
            <li>📍 Location: [Your Address Here]</li>
            <li>📞 Call Us: [Your Contact Number]</li>
            <li>📲 Follow Us on Social Media: [Your Social Media Handles]</li>
          </ul>
          <p className="paragraphs">At Olieven Kota & Grills, we don’t just serve food—we serve memories, culture, and passion on a plate. See you soon!</p>

          <a href="#menu" className="btn">Explore Menu</a>
        </div>
      </div>
    </section>
  );
};

export default About;
