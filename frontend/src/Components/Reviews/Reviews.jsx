import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import TestimonialImage from '../../Asserts/download (5).jpeg';

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalTime = 5000;

    const testimonials = [
        {
            name: 'Jessica Motaung',
            img: 'https://www.westernunion.com/staticassets/content/dam/wu/jm/responsive/send-money-in-person-from-jamaica-resp.png',
            message: "Absolutely love the food here! Always fresh and delicious."
        },
        {
            name: 'Michael Moeng',
            img: 'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg',
            message: "Kota yo no naka-naka! Ndi a i humbela kha vhoṱhe uri vayedze."
        },
        {
            name: "Thabo Mokoena",
            img: "https://randomuser.me/api/portraits/men/55.jpg",
            message: "Tirelo e e molemo, tatso e e monate, mme boitemogelo bo itumedisang ka metlha!"
        },
        {
            name: 'Sibongile Dlamini',
            img: 'https://images.everydayhealth.com/images/healthy-living/alternative-health/what-is-whole-person-health-guide-1440x810.jpg?sfvrsn=707e4018_5',
            message: "This place is my go-to for authentic South African street food."
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, intervalTime);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <Box sx={{ backgroundColor: 'black', minHeight: '100vh' }}>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 4, mt: 4 }}>
                    <Typography variant="h3" color="white" gutterBottom>
                        What We Think About Our Customers
                    </Typography>
                    <Typography variant="body1" color="white" sx={{ maxWidth: '800px', mx: 'auto' }}>
                        At Olieven Kota & Grills, our customers are the heart of everything we do.
                        Your support, love, and feedback inspire us to continuously deliver the best street food experience.
                        Thank you for being part of our journey!
                    </Typography>
                </Box>
                <Typography sx={{ textAlign: 'center' }} variant="h4" color="white" gutterBottom>
                        What Our Customers Say About Us
                    </Typography>
                {/* Testimonial Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    <Card
                        sx={{
                            maxWidth: 500,
                            backgroundColor: '#fff',
                            boxShadow: 3,
                            borderRadius: 3,
                            textAlign: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="220"
                            image={testimonials[currentIndex].img}
                            alt={testimonials[currentIndex].name}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography variant="h6" color="primary">
                                {testimonials[currentIndex].name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                "{testimonials[currentIndex].message}"
                            </Typography>
                        </CardContent>
                    </Card>

                    <Box
                        component="img"
                        src={TestimonialImage}
                        alt="Thank you to our customers"
                        sx={{
                            width: '100%',
                            maxWidth: '800px',
                            borderRadius: 3,
                            boxShadow: 2,
                        }}
                    />
                </Box>

                {/* Explore Menu Button */}
                <Box sx={{ textAlign: 'center', mt: 4, mb: 4, pb:2 }}>
                    <Button variant="contained" color="primary" component={Link} to="/menu">
                        Explore Menu 🍽️
                    </Button>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Reviews;
