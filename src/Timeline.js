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
      category: "Projects",
      title: "BubbleRaft",
      location: "Personal Project",
      date: "Dec 2025",
      videoUrl: "/bubbleRaft.mp4",
      description: [
        "Developed an autonomous disaster-recovery robot in CoppeliaSim that navigates a simulated urban collapse environment featuring active fire hazards and structural debris, using sensors and mapping to safely detect victims and hazards.",
        "Enhanced the robot’s architecture with advanced proximity and vision sensors, enabling real-time obstacle avoidance, victim identification, and internal environment mapping through waypoints, obstacle zones, and detection logs.",
        "Demonstrated intelligent behavior through reasoning, uncertainty handling, and knowledge representation, while proposing future improvements such as reinforcement learning and A* path planning to optimize search efficiency and disaster-response performance..",
      ],
    },
    {
      category: "Experience",
      title: "Software Developer Intern",
      location: "Frags AI, Falls Church, VA",
      date: "Jan 2025 – Present",
      description: [
        "Collaborated cross-functionally with designers and stakeholders to build a responsive landing page using React, Javascript, HTML, and CSS, enhancing user experience and responsiveness.",
        "Led a full-stack team and developed a plan to integrate Clerk’s API with different tech stacks, delivering a scalable and secure solution on time.",
        "Currently integrating Stripe for payment management through React."
      ],
    },
    {
      category: "Experience",
      title: "Software Developer Intern",
      location: "Verizon, Ashburn, VA",
      date: "Jun 2024 – Aug 2024",
      description: [
        "Conducted end-to-end testing of the Application Design Tool (ADT) and APIs, ensuring seamless functionality and scalability.",
        "Improved test maintenance using the Page Object Model (POM) and automated testing with Nightwatch.js.",
        "Boosted testing efficiency by 87%, reducing test case execution time from 2 minutes to 16 seconds through parallel testing.",
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
        "Developed the frontend of the newly improved Verizon Cloud Platform using React, JavaScript, HTML, and CSS, enhancing customer and developer experiences with a simplified UI and modernized codebase.",
        "Presented new design to stakeholders and leadership, earning positive feedback for streamlining processes and delivering high-impact results.",
        "Integrated the frontend with backend, unifying data from multiple sources into a single application.",
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
         <button
          className={`filter-button ${filter === "Projects" ? "active" : ""}`}
          onClick={() => setFilter("Projects")}
        >
          Projects
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
              {exp.videoUrl && (
                <video controls className="project-video">
                  <source src={exp.videoUrl} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
