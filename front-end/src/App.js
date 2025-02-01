import React from "react";
import "./App.css";
import PdfViewer from "./components/PdfViewer";

export default function App() {
  return (
    <div className="App">
      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="small-box">
          <h3>Hi I'm TAI, your learning assistant</h3>
        </div>
        <div className="middle-box">
        </div>
        <div className="bottom-box">
          <input type="text" placeholder="Type your message..." />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="button-group">
          <button className="btn">Teacher</button>
          <button className="btn">Student</button>
          <button className="btn btn-red">Start Recording</button>
        </div>
        <div className="content-box">
          <PdfViewer />
        </div>
        <div className="footer-box"></div>
      </div>
    </div>
  );
}