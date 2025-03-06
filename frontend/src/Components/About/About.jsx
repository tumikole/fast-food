import React from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import AboutImage from "../../Asserts/download.jpeg";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <section className="about" id="about">
      <Navbar />
      <Box className="about-container" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, padding: 2 }}>
        <Box className="text" sx={{ flex: 1 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: "bold", color: "white" }}>
            About Our Restaurant
          </Typography>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, marginTop: 2 }}>
            <Box className="visual" sx={{ flex: 1, maxWidth: { xs: "100%", md: "30%" } }}>
              <img src={AboutImage} alt="About Us" style={{ width: "100%", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }} />
            </Box>
            <Typography sx={{ flex: 1, color: "white", lineHeight: 1.5, fontSize: "1rem" }}>
              Olieven Kota & Grills, a place where authentic South African flavors meet quality ingredients and unmatched hospitality.
              Nestled in the heart of Olievenhoutbosch, we bring the rich, bold, and traditional street food experience to life, serving up the best kotas, flame-grilled meats, and classic township-style meals that keep our customers coming back for more.
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ marginTop: 3, fontWeight: "bold", color: "white" }}>Our Story</Typography>
          <Typography sx={{ marginTop: 1, color: "white" }}>
            Olieven Kota & Grills was founded with a simple vision—to celebrate South Africa’s vibrant kasi culture through food. Inspired by the mouthwatering flavors found in the streets of Soweto, Alexandra, and Mamelodi, we have perfected the art of crafting delicious, hearty, and satisfying meals that resonate with both locals and visitors.
          </Typography>
          <Typography sx={{ marginTop: 1, color: "white" }}>
            From our humble beginnings, we have grown into a well-loved food spot, known for our generous portions, fresh ingredients, and unique spin on township street food. Whether you're a fan of the classic kota stuffed with polony, atchar, and fresh fries or you crave a succulent grilled steak with our signature sauces, we have something for everyone.
          </Typography>

          <Typography variant="h5" sx={{ marginTop: 3, fontWeight: "bold", color: "white" }}>What We Serve</Typography>
          <Typography sx={{ marginTop: 1, color: "white" }}>
            At Olieven Kota & Grills, we pride ourselves on offering a diverse menu packed with South African favorites:
          </Typography>
          <List sx={{ color: "white" }}>
            <ListItem>
              <ListItemText primary="🍞 Signature Kotas – Freshly baked bread filled with crispy fries, flavorful meats, and our special house sauces. Choose from polony, Russian, beef, chicken, or even our loaded deluxe kota options." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🔥 Flame-Grilled Meats – Perfectly seasoned chicken, ribs, T-bone steaks, and boerewors, all cooked over an open flame for that smoky, mouthwatering taste." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🍟 Classic Sides & Extras – Golden crispy fries, creamy pap, chakalaka, coleslaw, and more to complete your meal." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🥤 Refreshing Beverages – From soft drinks to locally inspired beverages, we have the perfect drink to wash down your meal." />
            </ListItem>
          </List>

          <Typography variant="h5" sx={{ marginTop: 3, fontWeight: "bold", color: "white" }}>Why Choose Us?</Typography>
          <List sx={{ color: "white" }}>
            <ListItem sx={{ color: "white" }}>
              <ListItemText primary="Authentic Kasi Flavor - Our meals capture the true essence of township street food, giving you an experience that feels like home. 🌍" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Fresh, High-Quality Ingredients – We use only the finest and freshest ingredients to ensure top-tier taste and quality in every bite. 🥩" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Friendly & Fast Service – Whether you're dining in or grabbing a quick bite, we prioritize excellent customer service and efficiency. 🤝" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Affordable Prices – Enjoy generous portions at prices that are budget-friendly without compromising on quality. 💰" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Great Vibes & Community Spirit – More than just a restaurant, Olieven Kota & Grills is a place where friends and family come together to share great food and good memories. ❤️" />
            </ListItem>
          </List>

          <Typography variant="h5" sx={{ marginTop: 3, fontWeight: "bold", color: "white" }}>Visit Us Today!</Typography>
          <Typography sx={{ marginTop: 1, color: "white" }}>
            If you're in Olievenhoutbosch or surrounding areas, make sure to stop by and experience the best kotas and grills in kasi. Whether you’re grabbing a meal on the go or sitting down to enjoy a feast, we guarantee you’ll leave happy, full, and craving more! 😋
          </Typography>

          <List sx={{ marginTop: 2, color: "white" }}>
            <ListItem>
              <ListItemText primary="📍 Location: Olievenhoutbosch, Ext 36 Absa, Corner next to Waltlo opposite Shoprite" />
            </ListItem>
            <ListItem>
              <ListItemText primary="⏰ Open Hours: Mon-Thur 10:00 AM - 20:30 PM, Fri-Sun 10:00 AM - 21:30 PM" />
            </ListItem>
            <ListItem>
              <ListItemText primary="📞 Contact Us: 📞 Call: 082 214 3165, 💬 WhatsApp: 071 309 2268" />
            </ListItem>
          </List>

          <Typography sx={{ marginTop: 1, color: "white" }}>
            At Olieven Kota & Grills, we don’t just serve food—we serve memories, culture, and passion on a plate. See you soon! 🙌
          </Typography>

          <Link to="/menu">
            <Button variant="contained" sx={{ mt: 4, mb: 4, backgroundColor: "#2980b9", color: "white" }}>
              Explore Menu 🍽️
            </Button>
          </Link>
        </Box>
      </Box>
      <Footer />
    </section>
  );
};

export default About;
