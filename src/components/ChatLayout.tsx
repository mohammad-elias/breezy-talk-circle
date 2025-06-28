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
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const { currentUser, logout, userToken } = useAuth();
  
  // Set up WebSocket connection and handlers
  const { sendMessage: sendWebSocketMessage, isConnected, updateUserStatus } = useWebSocket((newMessage) => {
    // Add new incoming message
    setMessages(prev => [...prev, newMessage]);
  });

  // API Integration: Load messages on component mount
  useEffect(() => {
    if (userToken) {
      loadMessages();
      loadUsers();
    }
  }, [userToken]);

  // API Integration: Load messages
  const loadMessages = async () => {
    if (!userToken) return;
    
    setIsLoadingMessages(true);
    try {
      const response = await fetch('/api/messages', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load messages');
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error("Failed to load messages");
      // Keep using sample data as fallback
      setMessages(initialMessages);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // API Integration: Load users
  const loadUsers = async () => {
    if (!userToken) return;
    
    setIsLoadingUsers(true);
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error("Failed to load users");
      // Keep using sample data as fallback
      setUsers(initialUsers);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Update user statuses from WebSocket
  useEffect(() => {
    const updatedUsers = updateUserStatus([...users]);
    setUsers(updatedUsers);
  }, [updateUserStatus, users]);

  // Show connection status
  useEffect(() => {
    if (isConnected) {
      toast.success("Connected to chat server");
    }
  }, [isConnected]);

  // API Integration: Send message
  const handleSendMessage = async (text: string) => {
    if (!currentUser || !userToken) return;
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      userId: currentUser.id,
      text: text,
      timestamp: new Date(),
    };
    
    try {
      // Send message to API
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          timestamp: newMessage.timestamp
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      const savedMessage = await response.json();
      
      // Send message via WebSocket for real-time delivery
      sendWebSocketMessage(savedMessage);
      toast("Message sent successfully!");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message");
      
      // Fallback: add message locally and send via WebSocket
      sendWebSocketMessage(newMessage);
      toast("Message sent (offline mode)!");
    }
  };

  if (!currentUser) return null;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <ChatSidebar 
        users={users} 
        currentUser={currentUser} 
        onLogout={logout}
        isLoading={isLoadingUsers}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader 
          activeUsers={[currentUser, ...users.filter(u => u.isOnline)]} 
          onLogout={logout} 
        />
        <MessageList 
          messages={messages} 
          isLoading={isLoadingMessages}
        />
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
