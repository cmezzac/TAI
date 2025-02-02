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
  const [uploadedFiles, setUploadedFiles] = useState([]); // New state for uploaded files
  const footerRef = useRef(null);
  const middleBoxRef = useRef(null); // New ref for middle box
  const bottomBoxRef = useRef(null); // New ref for bottom box
  const textareaRef = useRef(null); // New ref for textarea
  const fileInputRef = useRef(null); // New ref for file input
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

  useEffect(() => {
    // Add initial greeting message when the app loads
    setChatMessages([]);
  }, []);

  // Auto-scroll to keep the latest line centered
  useEffect(() => {
    if (footerRef.current && !isExpanded) {
      const footer = footerRef.current;

      // Check if the user is near the bottom before auto-scrolling
      const isAtBottom =
        footer.scrollHeight - footer.clientHeight - footer.scrollTop < 50; // Adjust sensitivity

      if (isAtBottom) {
        setTimeout(() => {
          footer.scrollTop = footer.scrollHeight; // Scroll to the bottom
        }, 1000); // Wait 1 second before auto-scrolling
      }
    }
  }, [displayText, isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "student" ? "teacher" : "student"));
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
        setCurrentDynamicMessage(""); // Clear current dynamic message
      }
    }, 50); // Adjust speed as needed
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();
    if (fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      setUploadedFiles((prevFiles) => [...prevFiles, file.name]);
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  return (
    <div className="App">
      <div className="main-wrapper">
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
                <form onSubmit={handleFileSubmit}>
                  <input type="file" accept=".pdf,.ppt,.pptx" ref={fileInputRef} />
                  <button type="submit">Submit</button>
                </form>
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
                <button>Start Presenting</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sidebar */}
      <div className="right-sidebar">
        <button className="toggle-view-button" onClick={toggleViewMode}>
          {viewMode === "student" ? "Teacher View" : "Student View"}
        </button>
        {viewMode === "student" && (
          <>
            <div className="middle-box" ref={middleBoxRef}>
              <div className="greeting-bubble">Hi I'm TAi, your virtual learning assistant</div>
              {chatMessages.map((message, index) => (
                <div key={index}>
                  <div className="chat-bubble">{message}</div>
                  {dynamicMessages[index] && (
                    <div className="dynamic-bubble">{dynamicMessages[index]}</div>
                  )}
                </div>
              ))}
              {currentDynamicMessage && !dynamicMessages.includes(currentDynamicMessage) && (
                <div className="dynamic-bubble">{currentDynamicMessage}</div>
              )}
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