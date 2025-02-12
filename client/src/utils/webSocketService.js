

const SOCKET_URL = "ws://localhost:5001"

class WebSocketService {
	constructor() {
		if(WebSocketService.instance) 
			return WebSocketService.instance;

		this.socket = new WebSocket(SOCKET_URL);

		this.socket.onopen = () => {
			console.log('WebSocket open');
		};

		this.socket.onclose = () => {
			console.log('WebSocket closed');
		};

		this.socket.onmessage = (event) => {
			return event;
		};

		this.socket.onerror = (error) => {
			console.log('Websocket error: ', error);
		};

		WebSocketService.instance = this;
	}

	sendMessage(message) {
		if(this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(message));
		} else {
			console.warn('WebSocket not open. Message not sent.');
		}
	}

	getSocket() {
		return this.socket;
	}

	isConnected = () => {
		return this.socket.readyState === WebSocket.OPEN;
	}

	readyState = () => {
		return this.socket.readyState;
	}

	send(data) {
		try {
			if(!this.isConnected) {
				console.log("Socket isnt connected");
			}

			const jsonData = JSON.stringify(data);
			this.socket.send(jsonData);
		} catch (error) {
			//handle error
		}
	}

	addMessageListener(callback) {
		this.socket.addEventListener('message', (data) => {
			try {
				// const parsedData = JSON.parse(data);
				callback(data.data);
			} catch (error) {
				console.error('Error parsing message: ', error);
				callback(data);
			}
		});
	}

	close() {
		if(this.socket)
			this.socket.close();
	}
}


const WebSocketInstance = Object.freeze(new WebSocketService());
export default WebSocketInstance;