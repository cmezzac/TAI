import React, { useState, useRef } from 'react';
import { handleDragOver, handleDragLeave, handleDrop, handleFileChange, handleClick } from "../utils/fileHandlerUtils";
import '../styles/file-handler.css'
import UploadIcon from "../assets/upload-file.svg?react";

function FileHandler({ onFileSelect }) {
	const [dragging, setDragging] = useState(false);
	const [uploading, setUploadStatus] = useState(null);
	const fileInputRef = useRef(null);

	return (
		<div className="filehandler-wrapper">
			<div className="filehandler">
				<div
					className={`drop-zone ${dragging ? "dragging" : ""}`}
					onDragOver={(e) => handleDragOver(e, setDragging)}
					onDragLeave={() => handleDragLeave(setDragging)}
					onDrop={(e) => handleDrop(e, setDragging, onFileSelect)}
					onClick={() => handleClick(fileInputRef)}
				>
					<UploadIcon id="upload"/>
					<p>Drag & Drop files here or click to select</p>
					<input
						type="file"
						multiple
						ref={fileInputRef}
						onChange={(e) => handleFileChange(e, onFileSelect, setUploadStatus)}
						className="file-input"
					/>
				</div>
			</div>
		</div>
	);
}

export default FileHandler;