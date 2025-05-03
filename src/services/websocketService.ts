
import { Message, User } from "@/data/sampleData";

// Event types for WebSocket messages
export enum WebSocketEventType {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  NEW_MESSAGE = "new_message",
  USER_STATUS = "user_status",
}

// Event data interfaces
export interface WebSocketEvent<T = any> {
  type: WebSocketEventType;
  data: T;
}

export interface UserStatusEvent {
  userId: string;
  isOnline: boolean;
}

// Mock WebSocket implementation
class WebSocketService {
  private listeners: Map<WebSocketEventType, Array<(data: any) => void>>;
  private socket: WebSocket | null = null;
  private reconnectTimer: number | null = null;
  private isConnected: boolean = false;
  private mockUsers: Map<string, User>;

  constructor() {
    this.listeners = new Map();
    this.mockUsers = new Map();
  }

  // Connect to WebSocket server
  connect(url: string = "wss://mock-chat-server.example.com"): Promise<void> {
    return new Promise((resolve) => {
      console.log("Connecting to WebSocket server...", url);
      
      // For demo purposes, we'll simulate the connection
      setTimeout(() => {
        this.isConnected = true;
        this.notifyListeners(WebSocketEventType.CONNECT, null);
        console.log("Connected to WebSocket server");
        resolve();
        
        // Start the simulation loop for mock events
        this.startMockEventSimulation();
      }, 500);
    });
  }

  // Disconnect from server
  disconnect(): void {
    if (this.isConnected) {
      this.isConnected = false;
      
      if (this.reconnectTimer) {
        window.clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
      
      this.notifyListeners(WebSocketEventType.DISCONNECT, null);
      console.log("Disconnected from WebSocket server");
    }
  }

  // Send message to server
  sendMessage(message: Message): void {
    if (!this.isConnected) {
      console.warn("Cannot send message: not connected to server");
      return;
    }
    
    console.log("Sending message:", message);
    // In a real implementation, we would send the message to the server here
    // For demo, we'll simulate receiving the message back from the server
    this.notifyListeners(WebSocketEventType.NEW_MESSAGE, message);
  }

  // Register event listener
  addEventListener<T>(event: WebSocketEventType, callback: (data: T) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  // Remove event listener
  removeEventListener<T>(event: WebSocketEventType, callback: (data: T) => void): void {
    if (!this.listeners.has(event)) {
      return;
    }
    
    const callbacks = this.listeners.get(event) || [];
    const index = callbacks.indexOf(callback);
    
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  // Notify all listeners for an event
  private notifyListeners(event: WebSocketEventType, data: any): void {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }

  // Mock event simulation for demo purposes
  private startMockEventSimulation(): void {
    // Simulate random user status changes
    setInterval(() => {
      if (!this.isConnected) return;
      
      const userIds = ["1", "2", "3", "4", "5"];
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      
      // 30% chance to change a user's status
      if (Math.random() < 0.3) {
        const isOnline = Math.random() > 0.3; // 70% chance to be online
        this.notifyListeners(WebSocketEventType.USER_STATUS, {
          userId: randomUserId,
          isOnline
        } as UserStatusEvent);
      }
    }, 10000); // Every 10 seconds
  }
}

// Export singleton instance
export const websocketService = new WebSocketService();
