import { useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "@/data/sampleData";
import { UserAvatar } from "./UserAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, LogOut, MessageCircle, Users, Circle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import { useConnections } from "@/hooks/useConnections";

interface ChatSidebarProps {
  users: User[];
  currentUser: User;
  onLogout: () => void;
  isLoading?: boolean;
}

export function ChatSidebar({ users, currentUser, onLogout, isLoading = false }: ChatSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getConnectionStatus, getPendingRequests } = useConnections(currentUser.id);

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort users: connected and online first, then alphabetically
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aConnected = getConnectionStatus(a.id) === 'accepted';
    const bConnected = getConnectionStatus(b.id) === 'accepted';
    
    // Prioritize connected users
    if (aConnected !== bConnected) {
      return aConnected ? -1 : 1;
    }
    
    // Then prioritize online users
    if (a.isOnline !== b.isOnline) {
      return a.isOnline ? -1 : 1;
    }
    
    return a.name.localeCompare(b.name);
  });

  const onlineUsers = sortedUsers.filter(user => user.isOnline).length;
  const pendingRequestsCount = getPendingRequests().length;

  return (
    <div className={cn(
      "border-r border-gray-200 bg-chat-light flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && <h1 className="font-semibold text-xl">Chatter</h1>}
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(!isCollapsed && "ml-auto")}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Current user profile */}
      <div className={cn(
        "p-4 border-b border-gray-200",
        isCollapsed ? "flex justify-center" : "flex items-center gap-3"
      )}>
        <UserAvatar 
          src={currentUser.avatar}
          alt={currentUser.name}
          isOnline={true}
        />
        {!isCollapsed && (
          <div className="flex-1">
            <h3 className="font-medium">{currentUser.name}</h3>
            <p className="text-xs text-green-600">Online</p>
          </div>
        )}
      </div>

      {/* Search and channel options */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3"
          />
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <MessageCircle size={16} className="mr-1" />
              Chats
            </Button>
            <Button variant="outline" size="sm" className="flex-1 relative">
              <Users size={16} className="mr-1" />
              Users
              {pendingRequestsCount > 0 && (
                <Badge variant="secondary" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                  {pendingRequestsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Online status indicator */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Circle size={10} className="text-green-500 fill-current" />
            <span className="text-sm">{onlineUsers} online</span>
          </div>
        </div>
      )}

      {/* User list */}
      <ScrollArea className="flex-1">
        <div className={cn(
          "p-2",
          isCollapsed && "flex flex-col items-center"
        )}>
          {isCollapsed ? (
            <div className="py-2">
              <Users size={20} />
            </div>
          ) : (
            <h3 className="text-xs font-medium text-gray-500 px-2 py-1">
              USERS ({sortedUsers.length})
            </h3>
          )}
          
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="mt-2 space-y-1">
              {sortedUsers.map((user) => {
                const connectionStatus = getConnectionStatus(user.id);
                const isConnected = connectionStatus === 'accepted';
                
                return (
                  <div 
                    key={user.id}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md hover:bg-white cursor-pointer transition-colors duration-200",
                      user.isOnline && "bg-gray-50",
                      isConnected && "border border-green-200",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <UserAvatar 
                      src={user.avatar}
                      alt={user.name}
                      isOnline={user.isOnline}
                      className={cn(isCollapsed && "w-8 h-8")}
                    />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{user.name}</p>
                          {isConnected && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              Connected
                            </Badge>
                          )}
                        </div>
                        <p className={cn(
                          "text-xs",
                          user.isOnline ? "text-green-500" : "text-gray-500"
                        )}>
                          {user.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Logout button */}
      <div className={cn(
        "p-4 border-t border-gray-200",
        isCollapsed ? "flex justify-center" : ""
      )}>
        <Button 
          variant="ghost" 
          size={isCollapsed ? "icon" : "sm"}
          onClick={onLogout}
          className={cn(
            "text-gray-500 hover:text-red-500",
            !isCollapsed && "w-full justify-start"
          )}
        >
          <LogOut size={18} className={cn(!isCollapsed && "mr-2")} />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}
