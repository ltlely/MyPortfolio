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
      title: "SproutLoss",
      location: "Falls Church, VA",
      date: "Mar 2026 – Present",
      description: [
        "Independently launched SproutLoss to production on the iOS App Store, serving 20+ customers, by developing the full-stack React Native/Expo application, Supabase backend, and Apple in-app purchasing system.",
        "Expanded product accessibility across 7 languages and 3 progress timeframes by building localized weight tracking, goal analytics, trend visualizations, and personalized weekly summaries.",
        "Created a gamified social experience featuring 154 customization items and 3 real-time interaction flows—friend requests, messaging, and push notifications—using Supabase Realtime and Edge Functions.",
        "Strengthened account security across 3 authentication methods by integrating email, Google, and Apple sign-in with account-bound Pro entitlements, purchase recovery, and end-to-end data deletion workflows.",
      ],
      appStoreUrl: "https://apps.apple.com/us/app/sproutloss/id6800016799",
      images: [
        {
          src: "/assets/sproutloss/track-progress.webp",
          alt: "SproutLoss weight progress tracking and goal analytics",
        },
        {
          src: "/assets/sproutloss/customize-character.webp",
          alt: "SproutLoss character and outfit customization",
        },
        {
          src: "/assets/sproutloss/themes-emotes.webp",
          alt: "SproutLoss themes and emotes customization",
        },
        {
          src: "/assets/sproutloss/friends-chat.webp",
          alt: "SproutLoss friends and real-time messaging",
        },
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
              {exp.appStoreUrl && (
                <a
                  className="app-store-link"
                  href={exp.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${exp.title} on the App Store (opens in a new tab)`}
                >
                  View on the App Store <span aria-hidden="true">↗</span>
                </a>
              )}
              {exp.images && (
                <div className="project-gallery" aria-label={`${exp.title} screenshots`}>
                  {exp.images.map((image) => (
                    <a
                      key={image.src}
                      href={exp.appStoreUrl || image.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-gallery-item"
                    >
                      <img src={image.src} alt={image.alt} loading="lazy" />
                    </a>
                  ))}
                </div>
              )}
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
