
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { users as allUsers } from "@/data/sampleData";
import { useAuth } from "@/context/AuthContext";
import { MessageCircle, Users } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const NewChat = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  // Filter out current user from the list
  const availableUsers = allUsers.filter(user => user.id !== currentUser?.id);
  
  const filteredUsers = availableUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const startDirectChat = (userId: string) => {
    navigate(`/chat/${userId}`);
    toast.success("Starting direct chat");
  };

  const createGroupChat = () => {
    if (selectedUsers.length < 2) {
      toast.error("Select at least 2 users to create a group chat");
      return;
    }
    
    // In a real app, this would create a new group chat via API
    const groupId = `group-${Date.now()}`;
    navigate(`/chat/${groupId}`);
    toast.success("Group chat created");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold mb-4">Start New Chat</h1>
          
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          
          {selectedUsers.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected {selectedUsers.length} user(s)
              </p>
              <Button onClick={createGroupChat} className="w-full">
                <Users size={18} className="mr-2" />
                Create Group Chat ({selectedUsers.length} members)
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <Card 
                key={user.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
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
                        onClick={() => startDirectChat(user.id)}
                      >
                        <MessageCircle size={16} className="mr-1" />
                        Chat
                      </Button>
                      <Button 
                        size="sm" 
                        variant={selectedUsers.includes(user.id) ? "default" : "outline"}
                        onClick={() => toggleUserSelection(user.id)}
                      >
                        {selectedUsers.includes(user.id) ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewChat;
