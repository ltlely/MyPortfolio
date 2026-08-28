import './app.css';
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Experience from "./Timeline";
import './timeline.css';
import About from "./AboutCarousel";
import "./about.css";


function App() {
  const [cursorPosition, setCursorPosition] = useState("initial");
  const [showProfile, setShowProfile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mouseHovering, setMouseHovering] = useState(false); // Tracks if real mouse is hovering
  const [isVisible, setIsVisible] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  
  const audioRef = useRef(null);
  const about = useRef(null);
  const experience = useRef(null);
  const homepage = useRef(null);

  useEffect(() => {
    // Automatically hide the popup after 10 seconds
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 10000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (elementRef) => {
    if (elementRef?.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        bottom: elementRef.current.offsetTop,
        behavior: "smooth",
      });
    } else {
      console.error("Ref is null or undefined");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled 100px down
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const firstMoveTimer = setTimeout(() => {
      if (!mouseHovering) {
        setCursorPosition("second");
        playClickSound();
      }
    }, 2000);

    return () => clearTimeout(firstMoveTimer);
  }, [mouseHovering]);

  useEffect(() => {
    audioRef.current = new Audio(`${process.env.PUBLIC_URL}/assets/click.mp3`);
    audioRef.current.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
    });

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', () => {
          setAudioLoaded(false);
        });
      }
    };
  }, []);

  const playClickSound = () => {
    if (audioRef.current && audioLoaded) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audioRef.current.onended = () => {
              setCursorPosition("hidden");
              setShowProfile(true);
            };
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            // Still proceed with the animation
            setCursorPosition("hidden");
            setShowProfile(true);
          });
      }
    } else {
      // Proceed with animation even if audio isn't loaded
      setCursorPosition("hidden");
      setShowProfile(true);
    }
  };


  const handleMouseEnter = () => {
    setMouseHovering(true); // Mouse is hovering over Paste or Cursor
  };

  const handleMouseLeave = () => {
    setMouseHovering(false); // Mouse left Paste or Cursor
  };

  useEffect(() => {
    // Toggle dark mode by adding/removing the "dark" class from the <html> element
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setShowPopup(false); // Hide the popup when the user scrolls
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={isDark ? "app dark-mode" : "app light-mode"}>
      {/* Toggle Button for Dark/Light Mode */}
      <div className="toggle-button-container">
        <button
          className="toggle-button"
          onClick={() => setIsDark(!isDark)}
        >
          <img
            src={isDark ? "/assets/sun.png" : "/assets/moon.png"}
            alt={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              width: "21px", // Remove or modify this
              height: "21px", // Remove or modify this
            }}
          />
        </button>
      </div>

       {showPopup && (
        <div className="popup-message">
          Switch to {isDark ? "Light Mode" : "Dark Mode"}
        </div>
      )}

      {/* Main Content */}
      <div className="parent-container">
        <div id="portfolio">
          <h1 ref={homepage}>Portfolio</h1>
        </div>
        <div id="content-header">
          <h1 onClick={() => scrollToSection(about)}>Skills</h1>
          <h1 onClick={() => scrollToSection(experience)}>Experience</h1>
        </div>
      </div>


      {/* Cursor Animation */}
      <div
        className={`cursor ${cursorPosition}`}
        onMouseEnter={handleMouseEnter} // Detect mouse hovering over cursor
        onMouseLeave={handleMouseLeave} // Detect mouse leaving cursor
        style={{ zIndex: 5 }}
      ></div>

      <div className="main-section">
        {/* Profile Section */}
        <div className="parent-profile">
          {showProfile && (
            <img
              className="profile"
              src={`${process.env.PUBLIC_URL}/assets/profile.png`}
              alt="Profile Icon"
            />
          )}
        </div>

        {/* Typewriter Section */}
        <div className="parent-typewriter">
          <div className="typewriter">
            
            <h1>Hi, I'm Lyly</h1>
          </div>
        </div>

        

        <div className="button-container">
          <a
            href="/LyLyTranResume.pdf" // Update to match the correct path
            download
            className="download-button"
          >
            Download CV
          </a>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="https://github.com/ltlely" target="_blank" rel="noopener noreferrer">
            <img src="/assets/github.png" alt="GitHub" className="icon" />
          </a>
          <a href="mailto:lylytrr.121@gmail.com">
            <img src="/assets/gmail.png" alt="Gmail" className="icon" />
          </a>
        </div>
      </div>

      {/* Sections */}
      <div className="about" ref={about}>
        <h3 id="about-me">My Skills</h3>
        <About isDark={isDark}/>
      </div>

      <div className="experience" ref={experience}>
        <h3 id="my-timeline">My Timeline</h3>
        <Experience />
      </div>

      <div className={`go-up-container ${isVisible ? "" : "hidden"}`}>
        <button className="arrow up" onClick={() => scrollToSection(homepage)}>
        </button>
      </div>
    </div>
  );
}

export default App;
