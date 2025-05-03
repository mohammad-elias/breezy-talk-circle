
import { useEffect, useState, useCallback } from "react";
import { Message, User } from "@/data/sampleData";
import { websocketService, WebSocketEventType, UserStatusEvent } from "@/services/websocketService";

interface UseWebSocketReturn {
  sendMessage: (message: Message) => void;
  isConnected: boolean;
  updateUserStatus: (users: User[]) => User[];
}

export function useWebSocket(onNewMessage?: (message: Message) => void): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [userStatusUpdates, setUserStatusUpdates] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    // Connect to WebSocket server
    websocketService.connect();
    
    // Handle connection events
    const handleConnect = () => {
      setIsConnected(true);
    };
    
    const handleDisconnect = () => {
      setIsConnected(false);
    };
    
    // Handle new messages
    const handleNewMessage = (message: Message) => {
      if (onNewMessage) {
        onNewMessage(message);
      }
    };
    
    // Handle user status updates
    const handleUserStatus = (event: UserStatusEvent) => {
      setUserStatusUpdates(prev => {
        const updated = new Map(prev);
        updated.set(event.userId, event.isOnline);
        return updated;
      });
    };
    
    // Register event listeners
    websocketService.addEventListener(WebSocketEventType.CONNECT, handleConnect);
    websocketService.addEventListener(WebSocketEventType.DISCONNECT, handleDisconnect);
    websocketService.addEventListener(WebSocketEventType.NEW_MESSAGE, handleNewMessage);
    websocketService.addEventListener(WebSocketEventType.USER_STATUS, handleUserStatus);
    
    // Cleanup
    return () => {
      websocketService.removeEventListener(WebSocketEventType.CONNECT, handleConnect);
      websocketService.removeEventListener(WebSocketEventType.DISCONNECT, handleDisconnect);
      websocketService.removeEventListener(WebSocketEventType.NEW_MESSAGE, handleNewMessage);
      websocketService.removeEventListener(WebSocketEventType.USER_STATUS, handleUserStatus);
      websocketService.disconnect();
    };
  }, [onNewMessage]);
  
  // Send message via WebSocket
  const sendMessage = useCallback((message: Message) => {
    websocketService.sendMessage(message);
  }, []);
  
  // Update user statuses based on WebSocket events
  const updateUserStatus = useCallback((users: User[]): User[] => {
    if (userStatusUpdates.size === 0) {
      return users;
    }
    
    return users.map(user => {
      if (userStatusUpdates.has(user.id)) {
        return { 
          ...user, 
          isOnline: userStatusUpdates.get(user.id) || false 
        };
      }
      return user;
    });
  }, [userStatusUpdates]);
  
  return { sendMessage, isConnected, updateUserStatus };
}
