import React from "react";
import "./about.css";

const AboutCard = ({ data }) => {
  return (
    <div className="about-card">
      <h3 className="about-card-title" style={{ color: 'black' }}>
        {data.title}
      </h3>
      <p className="about-card-description">{data.description}</p>
    </div>
  );
};

export default AboutCard;
