import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { FaPaperPlane } from "react-icons/fa"; // Import icon

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
  const [viewMode, setViewMode] = useState("student"); // New state for view mode
  const [chatMessages, setChatMessages] = useState([]); // New state for chat messages
  const [inputValue, setInputValue] = useState(""); // New state for input value
  const [dynamicMessages, setDynamicMessages] = useState([]); // New state for dynamic messages
  const [currentDynamicMessage, setCurrentDynamicMessage] = useState(""); // New state for current dynamic message
  const footerRef = useRef(null);
  const middleBoxRef = useRef(null); // New ref for middle box
  const bottomBoxRef = useRef(null); // New ref for bottom box
  const textareaRef = useRef(null); // New ref for textarea
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

  const switchToTeacherView = () => {
    setViewMode("teacher");
  };

  const switchToStudentView = () => {
    setViewMode("student");
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setChatMessages((prevMessages) => [...prevMessages, inputValue]);
      displayDynamicMessage("Dynamic response to: " + inputValue);
      setInputValue("");
      resetTextareaHeight();
      resetBottomBoxHeight();
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    adjustTextareaHeight();
    adjustBottomBoxHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "50px"; // Reset to original size
    }
  };

  const adjustBottomBoxHeight = () => {
    if (bottomBoxRef.current) {
      bottomBoxRef.current.style.height = "auto";
      bottomBoxRef.current.style.height = bottomBoxRef.current.scrollHeight + "px";
    }
  };

  const resetBottomBoxHeight = () => {
    if (bottomBoxRef.current) {
      bottomBoxRef.current.style.height = "50px"; // Reset to original size
      bottomBoxRef.current.style.padding = "10px"; // Ensure padding stays the same
    }
  };

  useEffect(() => {
    if (bottomBoxRef.current) {
      bottomBoxRef.current.style.padding = "10px"; // Ensure padding stays the same
    }
  }, [chatMessages]);

  const displayDynamicMessage = (message) => {
    setCurrentDynamicMessage("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        setCurrentDynamicMessage((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(interval);
        setDynamicMessages((prevMessages) => [...prevMessages, message]);
      }
    }, 50); // Adjust speed as needed
  };

  return (
    <div className="App">
      <div className="main-wrapper">
        {/* Toggle Buttons */}
        <div className="Header">
          <button className={viewMode === "student" ? "active" : ""} onClick={switchToStudentView}>Student View</button>
          <button className={viewMode === "teacher" ? "active" : ""} onClick={switchToTeacherView}>Teacher View</button>
        </div>

        {viewMode === "student" ? (
          <>
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
          </>
        ) : (
          <>
            {/* Teacher View */}
            <div className="main-content">
              <div className="teacher-view">
                <h2>Upload Documents</h2>
                <input type="file" accept=".pdf,.ppt,.pptx" />
                <button>Start Presenting</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sidebar */}
      <div className="right-sidebar">
        {viewMode === "student" && (
          <>
            <div className="small-box">
              <h3>Hi I'm TAi, your virtual learning assistant</h3>
            </div>
            <div className="middle-box" ref={middleBoxRef}>
              {chatMessages.map((message, index) => (
                <div key={index}>
                  <div className="chat-bubble">{message}</div>
                  <div className="dynamic-bubble">
                    {index === chatMessages.length - 1 ? currentDynamicMessage : dynamicMessages[index]}
                  </div>
                </div>
              )).reverse()}
            </div>
            <div className="bottom-box" ref={bottomBoxRef}>
              <form onSubmit={handleInputSubmit} className="input-form">
                <textarea
                  ref={textareaRef}
                  name="messageInput"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={handleInputChange}
                  rows="1"
                  style={{ resize: "none" }}
                />
                <button type="submit" className="submit-button">
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}