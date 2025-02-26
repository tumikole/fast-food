import React from "react";
import Navbar from "../Navbar/Navbar";
import "./HowItWorks.scss";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <Navbar />
      <h2 className="secondary">How It Works</h2>
      <div className="how-it-works-container flex">
        <div className="box">
          <h3>Easy Order</h3>
          <ion-icon name="timer-outline"></ion-icon>
          <p>Place your order online in just a few clicks.</p>
        </div>
        <div className="box">
          <h3>Best Quality</h3>
          <ion-icon name="trophy-outline"></ion-icon>
          <p>We use top-quality ingredients for an authentic taste.</p>
        </div>
        <div className="box">
          <h3>Fast Delivery</h3>
          <ion-icon name="checkmark-done-circle-outline"></ion-icon>
          <p>Get your food delivered hot and fresh, right on time.</p>
        </div>
        <div className="box">
          <h3>Food Catering</h3>
          <ion-icon name="checkmark-done-circle-outline"></ion-icon>
          <p>Perfect catering services for any special occasion.</p>
        </div>
        <div className="box">
          <h3>Bulk Ordering</h3>
          <ion-icon name="checkmark-done-circle-outline"></ion-icon>
          <p>Order in large quantities for events or businesses.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
