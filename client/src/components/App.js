import React, { useState, useEffect, useRef } from "react";

import Transcript from "./components/Transcript.jsx";
import AiChat from "./components/AiChat.jsx";
import FileHandler from "./components/FileHandler.jsx"; 
import FileViewer from "./components/FileViewer.jsx";
import Navbar from "./components/Navbar.jsx";

import './styles/main.css'
import './styles/app.css'

function App() {
	return (
		<div className="app">
			<div className="">

			</div>
			<Transcript />
		</div>
	);
}

export default App;