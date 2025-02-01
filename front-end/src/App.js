import React from "react";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      {/* Left Sidebar */}
      <div className="left-sidebar">
        <div className="small-box">
          <h3>Hi I'm TAI, your learning assistant</h3>
        </div>
        <div className="middle-box"></div>
        <div className="bottom-box">
          <input type="text" placeholder="Type your message..." />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-box"></div>
        <div className="footer-box"></div>
      </div>
    </div>
  );
}
