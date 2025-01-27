import React, { useEffect, useState, useRef } from "react";
import "./timeline.css";
import "./app.css";


const Experience = () => {
  const timelineRef = useRef(null);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const handleScroll = () => {
      const timelineEvents = timelineRef.current.querySelectorAll(".timeline-event");
      const triggerHeight = window.innerHeight * 0.8;

      timelineEvents.forEach((event, index) => {
        const eventTop = event.getBoundingClientRect().top;
        if (eventTop < triggerHeight && !visibleEvents.includes(index)) {
          setVisibleEvents((prev) => [...prev, index]);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleEvents]);

  const experiences = [
    {
      category: "Experience",
      title: "Software Developer Intern",
      location: "Frags AI, Falls Church, VA",
      date: "Jan 2025 – Present",
      description: [],
    },
    {
      category: "Experience",
      title: "Software Developer Intern",
      location: "Verizon, Ashburn, VA",
      date: "Jun 2024 – Aug 2024",
      description: [
        "Conducted end-to-end testing of the Application Design Tool (ADT) and underlying APIs.",
        "Designed and implemented the Page Object Model (POM) to improve test maintenance and readability.",
        "Automated the testing process using Nightwatch.js, achieving an 87% increase in testing efficiency.",
      ],
    },
    {
      category: "Awards",
      title: "Winner of Verizon Volunteer STEM Next",
      location: "Verizon",
      date: "Jul 2024",
      description: [
        "Collaborated in a group of 6 and presented a project supporting STEM Next’s mission to build a STEM learning ecosystem.",
      ],
    },
    {
      category: "Experience",
      title: "Software Developer Intern",
      location: "Verizon, Falls Church, VA",
      date: "Jan 2024 - Jan 2024",
      description: [
        "Developed the frontend of the newly improved Verizon Cloud Platform using Tailwind CSS, Next.js, and React.",
        "Connected the frontend with backend APIs and a PostgreSQL database, unifying data from multiple sources.",
        "Presented the redesigned platform to stakeholders and Verizon leadership.",
      ],
    },
    {
      category: "Awards",
      title: "Winner of PatriotHacks Hackathon",
      location: "George Mason University",
      date: "Oct 2023",
      description: [
        "Developed 'Pixel Fit,' a cross-platform mobile app with React Native using RPG video game elements to promote fitness and health.",
        "Led a team of 4 in designing the user interface and experience.",
      ],
    },
  ];

  const filteredExperiences =
    filter === "All" ? experiences : experiences.filter((exp) => exp.category === filter);

  return (
    <div className="timeline-wrapper">
   
      <div className="filter-container">
        <button
          className={`filter-button ${filter === "All" ? "active" : ""}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === "Experience" ? "active" : ""}`}
          onClick={() => setFilter("Experience")}
        >
          Experience
        </button>
        <button
          className={`filter-button ${filter === "Awards" ? "active" : ""}`}
          onClick={() => setFilter("Awards")}
        >
          Awards
        </button>
      </div>
      <div className="timeline" ref={timelineRef}>
        {filteredExperiences.map((exp, index) => (
          <div
            key={index}
            className={`timeline-event ${visibleEvents.includes(index) ? "visible" : ""}`}
          >
            <div className="content">
              <h3>{exp.title}</h3>
              <p className="location">{exp.location}</p>
              <p className="date">{exp.date}</p>
              <ul>
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
