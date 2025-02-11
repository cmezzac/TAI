

import {WebSocket} from "ws";

const ws = new WebSocket("ws://localhost");

socket.on('open', () => {
    console.log('Connected to WebSocket server');
    socket.send('Hello Server!');
});

socket.on('message', (data) => {
    console.log(`Message from server: ${data}`);
});

socket.on('close', () => {
    console.log('WebSocket connection closed');
});

socket.on('error', (error) => {
    console.error('WebSocket error:', error);
});

export default ws;