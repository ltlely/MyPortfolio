import React from "react";
import "./about.css";

const AboutCard = ({ data }) => {
  return (
    <div className="about-card">
      {/* If data.src exists, display an image */}
      {data.src ? (
        <img 
          className="about-card-image" 
          src={data.src} 
          alt={data.description} 
        />
      ) : (
        // If no image, fallback to displaying a title
        <h3 className="about-card-title" style={{ color: 'black' }}>
          {data.title}
        </h3>
      )}
      <p className="about-card-description">{data.description}</p>
    </div>
  );
};

export default AboutCard;
