import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { FaPaperPlane, FaGraduationCap } from "react-icons/fa";

export default function App() {
  const [displayText, setDisplayText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState("student");
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dynamicMessages, setDynamicMessages] = useState([]);
  const [currentDynamicMessage, setCurrentDynamicMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [transcripts, setTranscripts] = useState([]);
  const [currentWordsArray, setCurrentWordsArray] = useState([
    "Hello,",
    "this is an example.",
    "We will gradually populate this div.",
    "Eventually, we'll use OpenAI's text-to-speech.",
    "This will be dynamic and fun!",
    "More text being added dynamically.",
    "Scrolling should keep the last line centered.",
    "Experimenting with real-time updates."
  ]);

  const footerRef = useRef(null);
  const middleBoxRef = useRef(null);
  const bottomBoxRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < currentWordsArray.length) {
        setDisplayText((prevText) => prevText + " " + currentWordsArray[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentWordsArray]);

  useEffect(() => {
    setChatMessages([]);
  }, []);

  useEffect(() => {
    if (footerRef.current && !isExpanded) {
      const footer = footerRef.current;
      const isAtBottom = footer.scrollHeight - footer.clientHeight - footer.scrollTop < 50;
      if (isAtBottom) {
        setTimeout(() => {
          footer.scrollTop = footer.scrollHeight;
        }, 1000);
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
      textareaRef.current.style.height = "50px";
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
      bottomBoxRef.current.style.height = "50px";
      bottomBoxRef.current.style.padding = "10px";
    }
  };

  useEffect(() => {
    if (bottomBoxRef.current) {
      bottomBoxRef.current.style.padding = "10px";
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
        setCurrentDynamicMessage("");
      }
    }, 50);
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();
    if (fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      setUploadedFiles((prevFiles) => [...prevFiles, file.name]);
      fileInputRef.current.value = "";
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
                  <button className="expand-button" onClick={toggleExpand}>
                    {isExpanded ? "Collapse" : "View Transcript"}
                  </button>
                </div>
              </>
            ) : (
              <>
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
        </div>

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