import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { FaPaperPlane, FaGraduationCap, FaDownload } from "react-icons/fa"; // Import icons

export default function App() {
  const [displayText, setDisplayText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState("student"); // New state for view mode
  const [chatMessages, setChatMessages] = useState([]); // New state for chat messages
  const [inputValue, setInputValue] = useState(""); // New state for input value
  const [dynamicMessages, setDynamicMessages] = useState([]); // New state for dynamic messages
  const [currentDynamicMessage, setCurrentDynamicMessage] = useState(""); // New state for current dynamic message
  const [uploadedFiles, setUploadedFiles] = useState([]); // New state for uploaded files
  const [transcript, setTranscript] = useState(""); // New state for transcript
  const [transcripts, setTranscripts] = useState([]); // New state for transcripts
  const [currentWordsArray, setCurrentWordsArray] = useState([
    "Hello,",
    "this is an example.",
    "We will gradually populate this div.",
    "Eventually, we'll use OpenAI's text-to-speech.",
    "This will be dynamic and fun!",
    "More text being added dynamically.",
    "Scrolling should keep the last line centered.",
    "Experimenting with real-time updates.",
  ]);

  const footerRef = useRef(null);
  const middleBoxRef = useRef(null); // New ref for middle box
  const bottomBoxRef = useRef(null); // New ref for bottom box
  const textareaRef = useRef(null); // New ref for textarea
  const fileInputRef = useRef(null); // New ref for file input

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < currentWordsArray.length) {
        const newWord = currentWordsArray[currentIndex];
        setDisplayText((prevText) => prevText + " " + newWord);
        setTranscript((prevTranscript) => prevTranscript + " " + newWord);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [currentWordsArray]);

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
    if (!isExpanded) {
      setTranscripts((prev) => [...prev, displayText]);
    }
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

  const handleNewTranscript = () => {
    const newContent = prompt("Enter new transcript content, separated by commas:");
    if (newContent) {
      setTranscripts((prev) => [...prev, displayText]);
      setCurrentWordsArray(newContent.split(","));
      setDisplayText("");
    }
  };

  const downloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="content-container">
          <div className="header">
            <div className="title">
              <FaGraduationCap className="logo" />
              <h1>TAi</h1>
            </div>
            <button className="generate-notes-button" onClick={handleNewTranscript}>
              Add New Transcript
            </button>
          </div>
          <div className="content-wrapper">
            {viewMode === "student" ? (
              <>
                {/* Main Content */}
                <div className="main-content">
                  <div className="content-box"></div>
                  <div className="footer-box" ref={footerRef}>
                    {isExpanded ? (
                      transcripts.map((transcript, index) => (
                        <p key={index}>{transcript}</p>
                      ))
                    ) : (
                      <p>{displayText}</p>
                    )}
                  </div>
                  <div className="transcript-buttons">
                    <button className="expand-button" onClick={toggleExpand} style={{ flex: 1 }}>
                      {isExpanded ? "Collapse" : "View Transcript"}
                    </button>
                    <button className="download-button" onClick={downloadTranscript}>
                      <FaDownload />
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="expanded-content">
                      {currentWordsArray.map((line, index) => (
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
                    <button className="download-button" onClick={downloadTranscript}>
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
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
    </div>
  );
}