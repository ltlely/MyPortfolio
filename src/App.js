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
  
  const audioRef = useRef(null);
  const about = useRef(null);
  const experience = useRef(null);
  const homepage = useRef(null);

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

  return (
    <div className={isDark ? "app dark-mode" : "app light-mode"}>
      {/* Toggle Button for Dark/Light Mode */}
      <button
        className="toggle-button"
        onClick={() => setIsDark(!isDark)}
      >
        <img
          src={isDark ? "/assets/sun.png" : "/assets/moon.png"}
          alt={isDark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            width: isDark ? "21px" : "20px",
            height: isDark ? "21px" : "20px",
          }}
        />
      </button>

      {/* Main Content */}
      <div className="parent-container">
        <div id="portfolio">
          <h1 ref={homepage}>Portfolio</h1>
        </div>
        <div id="content-header">
          <h1 onClick={() => scrollToSection(about)}>About</h1>
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
          <h1>Hi, I'm LyLy</h1>
        </div>
      </div>

      <div className={`bio ${isDark ? "dark-mode" : "light-mode"}`}>
        <h2>I am a Computer Science student seeking a Software Engineering Internship with a focus on web development. I am eager to contribute my skills in designing, developing, and optimizing web applications while gaining hands-on experience in a professional environment.</h2>
      </div>

      {/* Social Icons */}
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/lylytran/" target="_blank" rel="noopener noreferrer">
          <img src="/assets/linkedin.png" alt="LinkedIn" className="icon" />
        </a>
        <a href="https://github.com/ltlely" target="_blank" rel="noopener noreferrer">
          <img src="/assets/github.png" alt="GitHub" className="icon" />
        </a>
        <a href="lylytrr.121@gmail.com">
          <img src="/assets/gmail.png" alt="Gmail" className="icon" />
        </a>
      </div>

      {/* Sections */}
      <div className="about" ref={about}>
        <h3>About Me</h3>
        <About isDark={isDark}/>
      </div>

      <div className="experience" ref={experience}>
        <h3>My Timeline</h3>
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
