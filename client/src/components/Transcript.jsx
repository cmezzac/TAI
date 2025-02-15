import React, {useEffect, useState, useRef} from 'react';
import WebSocketInstance from '../utils/webSocketService.js';
import TranscriptAudio from '../components/subcomponents/transcriptAudio.jsx'
import '../styles/transcript.css';

function Transcript() {
  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    if (WebSocketInstance?.isConnected) {
      WebSocketInstance.send({ type: 'input', payload: e.target.value });
    }
  }

  const handleMessage = (data) => {
    console.log("data: ", data)
    document.getElementById('listener-box').innerHTML = data;
  };

  WebSocketInstance.addMessageListener(handleMessage);

  return (
    <div className="transcript-wrapper">
		  <div className="transcript">
        <TranscriptAudio />
        <input id="input-box" type="text" onChange={handleOnChange}/>
        <div id="listener-box" type="text">Hello</div>
      </div>
    </div>
  );
};

export default Transcript;