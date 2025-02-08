export const handleDragOver = (event, setDragging) => {
  event.preventDefault();
  setDragging(true);
};

export const handleDragLeave = (setDragging) => {
  setDragging(false);
};

export const handleDrop = (event, setDragging, onFileSelect) => {
  event.preventDefault();
  setDragging(false);

  const files = Array.from(event.dataTransfer.files);
  if (files.length > 0) {
    onFileSelect(files);
  }
};

export const handleFileChange = (event, onFileSelect, setUploadStatus) => {
  const files = Array.from(event.target.files);
  onFileSelect(files);

  files.forEach((file) => {
    uploadSingleFileAsync(file, setUploadStatus);
  });
};

export const handleClick = (fileInputRef) => {
  fileInputRef.current.click();
};


const uploadSingleFileAsync = async (file, setUploadStatus) => {
  if (!file) return;

  setUploadStatus(true);

  try {
    const formData = new FormData();
    formData.append("file", file);
    
    console.log("Data: ", formData.get("file"));

    const response = await fetch("http://localhost:5001/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const result = await response.json();
    setUploadStatus(false);
    return result;
  } catch (error) {
    setUploadStatus(false);
    console.error("Upload Error:", error);
    throw error;
  }
};