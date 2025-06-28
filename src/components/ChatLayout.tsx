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
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [messagesApiError, setMessagesApiError] = useState<string | null>(null);
  const [usersApiError, setUsersApiError] = useState<string | null>(null);
  const { currentUser, logout, userToken } = useAuth();
  
  // Set up WebSocket connection and handlers
  const { sendMessage: sendWebSocketMessage, isConnected, updateUserStatus } = useWebSocket((newMessage) => {
    // Add new incoming message
    setMessages(prev => [...prev, newMessage]);
  });

  // API Integration: Load messages and users on component mount
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
    setMessagesApiError(null);
    try {
      console.log('Loading messages...');
      const response = await fetch('/api/messages', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP ${response.status}: Failed to load messages`;
        console.error('Messages API Error:', errorMessage);
        setMessagesApiError(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Loaded messages:', data);
      setMessages(data.messages || []);
      setMessagesApiError(null);
    } catch (error) {
      console.error('Error loading messages:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load messages";
      setMessagesApiError(errorMessage);
      toast.error(`Messages API Error: ${errorMessage}. Using sample data.`);
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
    setUsersApiError(null);
    try {
      console.log('Loading users...');
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP ${response.status}: Failed to load users`;
        console.error('Users API Error:', errorMessage);
        setUsersApiError(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Loaded users:', data);
      setUsers(data.users || []);
      setUsersApiError(null);
    } catch (error) {
      console.error('Error loading users:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load users";
      setUsersApiError(errorMessage);
      toast.error(`Users API Error: ${errorMessage}. Using sample data.`);
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
      console.log('Sending message:', text);
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
        const errorMessage = errorData.message || `HTTP ${response.status}: Failed to send message`;
        console.error('Send Message API Error:', errorMessage);
        throw new Error(errorMessage);
      }

      const savedMessage = await response.json();
      console.log('Message sent successfully:', savedMessage);
      
      // Send message via WebSocket for real-time delivery
      sendWebSocketMessage(savedMessage);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send message";
      toast.error(`Send Message API Error: ${errorMessage}. Sending locally.`);
      
      // Fallback: add message locally and send via WebSocket
      sendWebSocketMessage(newMessage);
      toast.success("Message sent (offline mode)!");
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
        {/* API Error Display */}
        {(messagesApiError || usersApiError) && (
          <div className="p-2 bg-red-50 border-b border-red-200">
            <Card className="border-red-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle size={16} />
                  <p className="text-sm font-medium">Chat API Errors:</p>
                </div>
                {messagesApiError && (
                  <div className="mt-2">
                    <p className="text-xs text-red-600">Messages: {messagesApiError}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1 text-red-600 border-red-200"
                      onClick={loadMessages}
                    >
                      Retry Messages
                    </Button>
                  </div>
                )}
                {usersApiError && (
                  <div className="mt-2">
                    <p className="text-xs text-red-600">Users: {usersApiError}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1 text-red-600 border-red-200"
                      onClick={loadUsers}
                    >
                      Retry Users
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

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
