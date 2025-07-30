import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Banner.css";

const slides = [
  {
    image: "/assets/images/world-blood-donor-day-creative-collage.jpg",
    title: "Donate Blood, Save Lives",
    text: "Every drop counts. Become a hero today.",
  },
  {
    image: "/assets/images/Blood-Donation-2.png",
    title: "Be an Organ Donor",
    text: "Give the gift of life even after life.",
  }
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation(); // Get current route

  // Auto-slide effect - ✅ always defined regardless of path
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ❌ Don't render banner if on login or logged in
  const shouldHideBanner =
    location.pathname === "/login" ||
    localStorage.getItem("role") === "admin" ||
    localStorage.getItem("role") === "donor";

  if (shouldHideBanner) {
    return null;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="custom-banner">
      {slides.map((slide, index) => (
        <div
          className={`slide ${index === currentSlide ? "active" : ""}`}
          key={index}
        >
          <img src={slide.image} alt={slide.title} className="banner-image" />
          <div className="slide-content">
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button className="nav-btn prev" onClick={prevSlide}>❮</button>
      <button className="nav-btn next" onClick={nextSlide}>❯</button>
    </section>
  );
}

export default Banner;
