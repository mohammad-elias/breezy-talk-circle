
import { useState, useEffect } from "react";
import { users as initialUsers, messages as initialMessages, Message, User } from "@/data/sampleData";
import { useAuth } from "@/context/AuthContext";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useWebSocket } from "@/hooks/useWebSocket";
import { toast } from "@/components/ui/sonner";
import { TestCredentials } from "./TestCredentials";

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const { currentUser, logout } = useAuth();
  
  // Set up WebSocket connection and handlers
  const { sendMessage: sendWebSocketMessage, isConnected, updateUserStatus } = useWebSocket((newMessage) => {
    // Add new incoming message
    setMessages(prev => [...prev, newMessage]);
  });

  // Update user statuses from WebSocket
  useEffect(() => {
    const updatedUsers = updateUserStatus([...initialUsers]);
    setUsers(updatedUsers);
  }, [updateUserStatus]);

  // Show connection status
  useEffect(() => {
    if (isConnected) {
      toast.success("Connected to chat server");
    }
  }, [isConnected]);

  const handleSendMessage = (text: string) => {
    if (!currentUser) return;
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      userId: currentUser.id,
      text: text,
      timestamp: new Date(),
    };
    
    // Send message via WebSocket
    sendWebSocketMessage(newMessage);
    toast("Message sent successfully!");
  };

  if (!currentUser) return null;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <ChatSidebar 
        users={users} 
        currentUser={currentUser} 
        onLogout={logout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader activeUsers={[currentUser, ...users.filter(u => u.isOnline)]} onLogout={logout} />
        <MessageList messages={messages} />
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isConnected={isConnected}
        />
      </div>
      
      {/* Test credentials component */}
      <TestCredentials />
    </div>
  );
}
