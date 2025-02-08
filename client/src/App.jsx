import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Transcript from './components/Transcript'
import Navbar from './components/Navbar'
import AiChat from './components/AiChat'
import FileViewer from './components/FileViewer'
import FileHandler from './components/FileHandler'

import './styles/app.css'

function App() {
  const [count, setCount] = useState(0);
  const [selctedFiles, setSelectFiles] = useState([]);

  return (
    <>
      <div className="app">
        <Navbar />
        <div className="app-content">
          <div className='left-content'>
            <FileHandler onFileSelect={setSelectFiles}/>
            <FileViewer />
            <Transcript />
          </div>
          <AiChat />
        </div>
      </div>
    </>
  )
}

export default App
