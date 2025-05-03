
import { useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "@/data/sampleData";
import { UserAvatar } from "./UserAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageCircle, Users } from "lucide-react";

interface ChatSidebarProps {
  users: User[];
  currentUser: User;
}

export function ChatSidebar({ users, currentUser }: ChatSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort users: online first, then alphabetically
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a.isOnline !== b.isOnline) {
      return a.isOnline ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

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
            <Button variant="outline" size="sm" className="flex-1">
              <Users size={16} className="mr-1" />
              Users
            </Button>
          </div>
        </div>
      )}

      {/* User list */}
      <div className="flex-1 overflow-y-auto">
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
          
          <div className="mt-2 space-y-1">
            {sortedUsers.map((user) => (
              <div 
                key={user.id}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md hover:bg-white cursor-pointer",
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
                    <p className="font-medium truncate">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      {user.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
