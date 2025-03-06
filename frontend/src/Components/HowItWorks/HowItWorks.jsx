import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const HowItWorks = () => {
  const steps = [
    { title: "Easy Order", icon: <TimerOutlinedIcon fontSize="large" />, description: "Place your order online in just a few clicks." },
    { title: "Best Quality", icon: <EmojiEventsOutlinedIcon fontSize="large" />, description: "We use top-quality ingredients for an authentic taste." },
    { title: "Fast Delivery", icon: <CheckCircleOutlineIcon fontSize="large" />, description: "Get your food delivered hot and fresh, right on time." },
    { title: "Food Catering", icon: <CheckCircleOutlineIcon fontSize="large" />, description: "Perfect catering services for any special occasion." },
    { title: "Bulk Ordering", icon: <CheckCircleOutlineIcon fontSize="large" />, description: "Order in large quantities for events or businesses." },
  ];

  return (
    <section className="how-it-works">
      <Navbar />
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" color="white" gutterBottom>
          How It Works
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", p: 3 }}>
                {step.icon}
                <CardContent>
                  <Typography variant="h6">{step.title}</Typography>
                  <Typography variant="body2">{step.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </section>
  );
};

export default HowItWorks;
