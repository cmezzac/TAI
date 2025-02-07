import React, { useState, useEffect, useRef } from "react";

import Transcript from "./Transcript.js";
import AiChat from "./AiChat.js";
import FileHandler from "./FileHandler.js"; 
import FileViewer from "./FileViewer.js";
import Navbar from "./Navbar.js";

import '../styles/main.css'
import '../styles/app.css'

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