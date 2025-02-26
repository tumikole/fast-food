import React, { useEffect, useState } from 'react';
import './Reviews.scss';
import TestimonialImage from '../../Asserts/download (5).jpeg';
import Navbar from '../Navbar/Navbar';

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalTime = 5000; // Switch testimonials every 3 seconds

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
            "name": "Thabo Mokoena",
            "img": "https://randomuser.me/api/portraits/men/55.jpg",
            "message": "Tirelo e e molemo, tatso e e monate, mme boitemogelo bo itumedisang ka metlha!"
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
        <div className="testimonial">
            <Navbar />
            <div className="testimonial-container">
                <div className="text">
                    <h2>What We Think About Our Customers</h2>
                    <p>
                        At Olieven Kota & Grills, our customers are the heart of everything we do.
                        Your support, love, and feedback inspire us to continuously deliver the best street food experience.
                        We believe in creating a community where every meal feels like a celebration of authentic flavors and good company.
                    </p>

                    <p>
                        From the first bite to the last, we aim to bring you not just a meal, but an experience that resonates with the essence of street food culture.
                        Our customers are more than just guests; they are our partners in this journey of bringing vibrant and delicious meals to life.
                        Your smiles, your recommendations, and your loyalty motivate us every day to strive for excellence in everything we do.
                        At Olieven Kota & Grills, it's not just about food—it's about building lasting relationships and making memories, one dish at a time.
                    </p>

                    <p>
                        Thank you for being a part of our story. We are here because of you, and together, we continue to make every bite a memorable one.
                    </p>
                    <h4>What Our Customers Say About Us</h4>

                    <div className="customer-say">
                        <div className="user">
                            <img src={testimonials[currentIndex].img} alt={testimonials[currentIndex].name} />
                            <div className="name">
                                <div className="title">{testimonials[currentIndex].name}</div>
                                <div className="message">"{testimonials[currentIndex].message}"</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="visual">
                    <img src={TestimonialImage} alt="Thank you to our customers" />
                </div>
            </div>
        </div>
    );
};

export default Reviews;
