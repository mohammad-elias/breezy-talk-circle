
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users as initialUsers } from "@/data/sampleData";
import { useWebSocket } from "@/hooks/useWebSocket";
import { UserAvatar } from "@/components/UserAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { updateUserStatus } = useWebSocket();
  const [usersList, setUsersList] = useState(initialUsers);
  const navigate = useNavigate();
  
  // Update users status from WebSocket
  useState(() => {
    const updatedUsers = updateUserStatus([...initialUsers]);
    setUsersList(updatedUsers);
  });
  
  // Filter users based on search query
  const filteredUsers = usersList.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort users: online first, then alphabetically
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a.isOnline !== b.isOnline) {
      return a.isOnline ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  // Start a direct chat with user
  const startDirectChat = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-500 text-sm">Find people to chat with</p>
          
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {sortedUsers.map((user) => (
              <div 
                key={user.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <UserAvatar 
                    src={user.avatar}
                    alt={user.name}
                    isOnline={user.isOnline}
                    className="h-10 w-10"
                  />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className={`text-xs ${user.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                      {user.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-chat-primary"
                    onClick={() => startDirectChat(user.id)}
                  >
                    <MessageCircle size={18} className="mr-1" />
                    Message
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                  >
                    <UserPlus size={18} className="mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersList;
