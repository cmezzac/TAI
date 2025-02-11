import React, {useEffect, useState, useRef} from 'react';
import '../styles/transcript.css';

const Transcript = () => {
  const [value, setValue] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5001');

    socket.onopen = () => {
        console.log('Connected to WebSocket server');
        socket.send('Hello Server from React!');
    };

    //test
    socket.onmessage = (event) => {
        console.log(`testing live data change:`);
        let eleVal = document.getElementById('listener-box').value;
        eleVal = event.data;
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    socketRef.current = socket;
    return () => {socket.close(); socketRef.current?.close()};
  }, []);

  const handleOnChange = (e) => {
    setValue(e.target.value);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'input', payload: value }));
    }
  }

  return (
    <div className="transcript-wrapper">
		  <div className="transcript">
		    Transcript
        <input id="input-box" type="text" onChange={handleOnChange}/>
        <div id="listener-box" type="text">Hello</div>
      </div>
    </div>
  );
};

export default Transcript;