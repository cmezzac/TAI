import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const wordsArray = [
  "Hello,",
  "this is an example.",
  "We will gradually populate this div.",
  "Eventually, we'll use OpenAI's text-to-speech.",
  "This will be dynamic and fun!",
  "More text being added dynamically.",
  "Scrolling should keep the last line centered.",
  "Experimenting with real-time updates.",
];

export default function App() {
  const [displayText, setDisplayText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const footerRef = useRef(null);
  let currentIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < wordsArray.length) {
        setDisplayText((prevText) => prevText + " " + wordsArray[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to keep the latest line centered
  useEffect(() => {
    if (footerRef.current && !isExpanded) {
      const footer = footerRef.current;

      // Check if the user is near the bottom before auto-scrolling
      const isAtBottom =
        footer.scrollHeight - footer.clientHeight - footer.scrollTop < 50; // Adjust sensitivity

      if (isAtBottom) {
        footer.scrollTop = footer.scrollHeight; // Scroll to the bottom
      }
    }
  }, [displayText, isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="App">
      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="small-box">
          <h3>Hi I'm TAi, your virtual learning assistant</h3>
        </div>
        <div className="middle-box"></div>
        <div className="bottom-box">
          <input type="text" placeholder="Type your message..." />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-box"></div>
        <div className="footer-box" ref={footerRef}>
          {isExpanded ? (
            wordsArray.map((line, index) => (
              <p key={index}>{line}</p>
            ))
          ) : (
            <p>{displayText}</p>
          )}
        </div>
        <button className="expand-button" onClick={toggleExpand}>
          {isExpanded ? "Collapse" : "View Transcript"}
        </button>
        {isExpanded && (
          <div className="expanded-content">
            {wordsArray.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}