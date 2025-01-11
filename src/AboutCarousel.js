import React, { useState, useEffect } from "react";
import aboutData from "./aboutData"; // Import data
import AboutCard from "./AboutCard"; // Import card component
import "./about.css"; // Import styles

const AboutCarousel = ({ isDark }) => {
  const [startIdx, setStartIdx] = useState(0); // Index of the first card visible
  const [cardsToShow, setCardsToShow] = useState(3); // Number of cards to display at once

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth <= 768) {
        setCardsToShow(1); // Mobile: 1 card
      } else if (window.innerWidth <= 1024) {
        setCardsToShow(2); // Tablet: 2 cards
      } else {
        setCardsToShow(3); // Desktop: 3 cards
      }
    };

    updateCardsToShow(); // Set initial value
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // Cards to display
  const visibleCards = aboutData
    .slice(startIdx, startIdx + cardsToShow)
    .map((data, idx) => <AboutCard key={idx} data={data} />);

  return (
    <div className={`carousel-container ${isDark ? "dark" : "light"}`}>
      <button
        className={`carousel-button left-button ${isDark ? "dark" : "light"}`}
        onClick={() => {
          if (startIdx > 0) {
            setStartIdx(startIdx - 1);
          }
        }}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="carousel-cards">{visibleCards}</div>
      <button
        className={`carousel-button right-button ${isDark ? "dark" : "light"}`}
        onClick={() => {
          if (startIdx < aboutData.length - cardsToShow) {
            setStartIdx(startIdx + 1);
          }
        }}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default AboutCarousel;
