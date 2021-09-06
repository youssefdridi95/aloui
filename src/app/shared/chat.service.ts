import { io } from "socket.io-client";

export class ChatService {
  private url = 'http://localhost:8081';
  private socket;    
   
    constructor() {
      this.socket = io(this.url);
    }

    public sendMessage(message) {
      this.socket.emit('new-message', message);
      console.log(message)
  }
}