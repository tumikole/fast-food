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
          <p>Quick and hassle-free ordering process.</p>
        </div>
        <div className="box active">
          <h3>Best Quality</h3>
          <ion-icon name="trophy-outline"></ion-icon>
          <p>We use only the freshest ingredients.</p>
        </div>
        <div className="box">
          <h3>Fast Delivery</h3>
          <ion-icon name="checkmark-done-circle-outline"></ion-icon>
          <p>Hot and fresh food delivered to your doorstep.</p>
        </div>
        <div className="box">
          <h3>Food Catering</h3>
          <ion-icon name="checkmark-done-circle-outline"></ion-icon>
          <p>Hot and fresh food delivered to your doorstep.</p>
        </div>
        <div className="box">
          <h3>Bulk Ordering</h3>
          <ion-icon name="checkmark-done-circle-outline"></ion-icon>
          <p>Hot and fresh food delivered to your doorstep.</p>
        </div>
        <div className="box">
          <h3>Bulk Ordering</h3>
          <ion-icon name="checkmark-done-circle-outline"></ion-icon>
          <p>Hot and fresh food delivered to your doorstep.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;