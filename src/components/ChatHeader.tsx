
import { User } from "@/data/sampleData";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface ChatHeaderProps {
  activeUsers: User[];
  onLogout: () => void;
}

export function ChatHeader({ activeUsers, onLogout }: ChatHeaderProps) {
  const onlineCount = activeUsers.filter(user => user.isOnline).length;

  return (
    <div className="border-b border-gray-200 p-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Team Chat</h2>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500">
              {onlineCount} online
            </div>
            
            <div className="flex -space-x-2">
              {activeUsers.slice(0, 3).map((user) => (
                <UserAvatar 
                  key={user.id}
                  src={user.avatar}
                  alt={user.name}
                  isOnline={user.isOnline}
                  className="border-2 border-white w-8 h-8"
                />
              ))}
              
              {activeUsers.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-chat-light border-2 border-white flex items-center justify-center text-xs">
                  +{activeUsers.length - 3}
                </div>
              )}
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLogout}
            className="text-gray-500 hover:text-red-500"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
