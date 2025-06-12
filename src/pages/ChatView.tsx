
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { users as allUsers, messages as initialMessages, Message } from "@/data/sampleData";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Phone, Video, MoreHorizontal } from "lucide-react";
import { MessageInput } from "@/components/MessageInput";
import { ChatMessage } from "@/components/ChatMessage";
import { useWebSocket } from "@/hooks/useWebSocket";
import { toast } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ChatView = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { sendMessage: sendWebSocketMessage, isConnected } = useWebSocket((newMessage) => {
    // Add new incoming message
    setMessages(prev => [...prev, newMessage]);
  });

  // Get chat details (in a real app, fetch from server)
  const isDirectChat = chatId?.startsWith("user");
  const targetUserId = isDirectChat ? chatId?.replace("user", "") : null;
  const targetUser = targetUserId ? allUsers.find(u => u.id === targetUserId) : null;
  
  // Group chat info (mocked for demo)
  const groupInfo = {
    name: "Marketing Team",
    membersCount: 5,
    isOnline: true
  };

  useEffect(() => {
    // Simulate loading chat history
    // In a real app, fetch messages for this specific chat from server
    setMessages(initialMessages.slice(0, 10));
  }, [chatId]);

  const handleSendMessage = (text: string) => {
    if (!currentUser) return;
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      userId: currentUser.id,
      text: text,
      timestamp: new Date(),
    };
    
    sendWebSocketMessage(newMessage);
    
    // Optimistically add the message to the UI
    setMessages(prev => [...prev, newMessage]);
  };

  const handleBack = () => {
    navigate("/chats");
  };

  const handleVoiceCall = () => {
    toast("Voice call feature will be available when API is integrated");
    // TODO: Integrate with your voice call API
  };

  const handleVideoCall = () => {
    toast("Video call feature will be available when API is integrated");
    // TODO: Integrate with your video call API
  };

  const handleChatInfo = () => {
    toast("Chat info feature will be available when API is integrated");
    // TODO: Show chat information modal/page
  };

  const handleMuteChat = () => {
    toast("Mute notifications feature will be available when API is integrated");
    // TODO: Integrate mute functionality
  };

  const handleBlockUser = () => {
    toast("Block user feature will be available when API is integrated");
    // TODO: Integrate block user functionality
  };

  const handleDeleteChat = () => {
    toast("Delete chat feature will be available when API is integrated");
    // TODO: Integrate delete chat functionality
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <header className="border-b border-gray-200 p-3 bg-white flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <ArrowLeft size={20} />
            </Button>
            
            {isDirectChat ? (
              <div className="flex items-center">
                <UserAvatar 
                  src={targetUser?.avatar}
                  alt={targetUser?.name || "User"}
                  isOnline={targetUser?.isOnline}
                  className="h-10 w-10 mr-3"
                />
                <div>
                  <h2 className="font-semibold">{targetUser?.name || "User"}</h2>
                  <p className="text-xs text-gray-500">
                    {targetUser?.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="h-10 w-10 bg-chat-primary rounded-full flex items-center justify-center text-white mr-3">
                  {groupInfo.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-semibold">{groupInfo.name}</h2>
                  <p className="text-xs text-gray-500">
                    {groupInfo.membersCount} members
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleVoiceCall}>
              <Phone size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleVideoCall}>
              <Video size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleChatInfo}>
              <Info size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                <DropdownMenuItem onClick={handleMuteChat}>
                  Mute notifications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleBlockUser}>
                  Block user
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteChat} className="text-red-600">
                  Delete chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => {
            const user = message.userId === currentUser?.id 
              ? currentUser 
              : allUsers.find(u => u.id === message.userId) || currentUser;
              
            return (
              <ChatMessage 
                key={message.id}
                message={message}
                user={user}
                isMine={message.userId === currentUser?.id}
              />
            );
          })}
        </div>
        
        <MessageInput 
          onSendMessage={handleSendMessage}
          isConnected={isConnected}
        />
      </div>
    </DashboardLayout>
  );
};

export default ChatView;
