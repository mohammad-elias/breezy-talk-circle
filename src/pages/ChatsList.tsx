
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { users as allUsers } from "@/data/sampleData";
import { UserAvatar } from "@/components/UserAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, UsersRound, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useWebSocket } from "@/hooks/useWebSocket";

// Sample data structure for chats
interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  isGroup: boolean;
  participants: string[];
  avatar?: string;
}

const ChatsList = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { isConnected } = useWebSocket();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "groups">("all");
  
  // Sample chats data (in a real app, this would come from a database)
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "chat1",
      name: "Marketing Team",
      lastMessage: "Let's discuss the new campaign",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unread: 3,
      isGroup: true,
      participants: ["1", "2", "3", "4"]
    },
    {
      id: "chat2",
      name: "Sarah Johnson",
      lastMessage: "What time is the meeting?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unread: 0,
      isGroup: false,
      participants: ["1", "2"]
    },
    {
      id: "chat3",
      name: "Product Discussion",
      lastMessage: "The new design looks great!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unread: 0,
      isGroup: true,
      participants: ["2", "3", "5"]
    },
    {
      id: "chat4",
      name: "Michael Chen",
      lastMessage: "I'll send the documents tomorrow",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      unread: 1,
      isGroup: false,
      participants: ["3", "5"]
    }
  ]);

  // Filter chats based on search query and active filter
  const filteredChats = chats
    .filter(chat => 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(chat => {
      if (activeFilter === "groups") {
        return chat.isGroup;
      }
      return true; // "all" shows everything
    });
  
  // Sort chats: most recent first, then unread
  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.unread !== b.unread) {
      return b.unread - a.unread; // More unread messages come first
    }
    return b.timestamp.getTime() - a.timestamp.getTime(); // Most recent first
  });

  // Format time
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return diffDays === 1 ? "Yesterday" : `${diffDays} days ago`;
    }
    
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Chats</h1>
            <Button onClick={() => navigate("/new-chat")}>
              <Plus size={18} className="mr-1" />
              New Chat
            </Button>
          </div>
          
          <Input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />
          
          <div className="flex gap-2 mt-2">
            <Button 
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveFilter("all")}
            >
              <MessageCircle size={16} className="mr-1" />
              All Chats
            </Button>
            <Button 
              variant={activeFilter === "groups" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveFilter("groups")}
            >
              <UsersRound size={16} className="mr-1" />
              Groups
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {!isConnected && (
            <div className="p-3 bg-amber-50 text-amber-800 text-sm border-l-4 border-amber-500">
              You're currently offline. Messages will be sent when you're back online.
            </div>
          )}
          
          <div>
            {sortedChats.map((chat) => (
              <Link 
                key={chat.id} 
                to={`/chat/${chat.id}`}
                className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {chat.isGroup ? (
                  <div className="relative w-12 h-12 bg-chat-light rounded-full flex items-center justify-center text-chat-primary">
                    <UsersRound size={20} />
                    {chat.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <UserAvatar 
                      src={allUsers.find(u => u.id === chat.participants.find(p => p !== currentUser?.id))?.avatar}
                      alt={chat.name}
                      isOnline={allUsers.find(u => u.id === chat.participants.find(p => p !== currentUser?.id))?.isOnline}
                      className="w-12 h-12"
                    />
                    {chat.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-medium truncate ${chat.unread > 0 ? 'text-black' : 'text-gray-700'}`}>
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatTime(chat.timestamp)}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${chat.unread > 0 ? 'font-medium text-black' : 'text-gray-500'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </Link>
            ))}
            
            {sortedChats.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  {activeFilter === "groups" ? "No groups found" : "No chats found"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatsList;
