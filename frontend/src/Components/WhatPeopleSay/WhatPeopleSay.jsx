import React from 'react';
import './WhatPeopleSay.scss';

const WhatPeopleSay = () => {
    const reviews = [
        {
            name: 'Jessica Motaung',
            message: "Absolutely love the food here! Always fresh and delicious.",
            img: 'https://www.westernunion.com/staticassets/content/dam/wu/jm/responsive/send-money-in-person-from-jamaica-resp.png',
        },
        {
            name: 'Michael Moeng',
            message: "Kota yo no naka-naka! Ndi a i humbela kha vhoṱhe uri vayedze.",
            img: 'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg',
        },
        {
            name: "Thabo Mokoena",
            message: "Tirelo e e molemo, tatso e e monate, mme boitemogelo bo itumedisang ka metlha!",
            img: "https://randomuser.me/api/portraits/men/55.jpg",
        },
        {
            name: 'Sibongile Dlamini',
            message: "This place is my go-to for authentic South African street food.",
            img: 'https://images.everydayhealth.com/images/healthy-living/alternative-health/what-is-whole-person-health-guide-1440x810.jpg?sfvrsn=707e4018_5',
        },
    ];

    return (
        <section className="what-people-say">
            <h2 className="section-title">What People Say</h2>
            <div className="reviews-container">
                {reviews.map((review, index) => (
                    <div className="review-card" key={index}>
                        <img src={review.img} alt={review.name} className="review-image" />
                        <h3 className="reviewer-name">{review.name}</h3>
                        <p className="review-message">"{review.message}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhatPeopleSay;
