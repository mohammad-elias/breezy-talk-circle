
import { useState, useEffect } from "react";
import { users as allUsers } from "@/data/sampleData";
import { useAuth } from "@/context/AuthContext";
import { useConnections } from "@/hooks/useConnections";
import { UserAvatar } from "@/components/UserAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, UserCheck, UserX, Clock, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, userToken } = useAuth();
  const navigate = useNavigate();
  
  const {
    getConnectionStatus,
    isRequestSentByCurrentUser,
    sendConnectionRequest,
    acceptConnectionRequest,
    declineConnectionRequest,
    cancelConnectionRequest,
  } = useConnections(currentUser?.id || "0");

  // API Integration: Search users
  useEffect(() => {
    if (searchQuery.trim()) {
      searchUsers(searchQuery);
    } else {
      setUsers([]);
    }
  }, [searchQuery]);

  const searchUsers = async (query: string) => {
    if (!userToken) {
      toast.error("Authentication required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to search users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error("Failed to search users");
      
      // Fallback for demo - filter local users
      const filteredUsers = allUsers.filter(user => 
        user.id !== currentUser?.id &&
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setUsers(filteredUsers);
    } finally {
      setIsLoading(false);
    }
  };

  // Sort users: online first, then alphabetically
  const sortedUsers = [...users].sort((a, b) => {
    if (a.isOnline !== b.isOnline) {
      return a.isOnline ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  const getConnectionButton = (userId: string) => {
    const status = getConnectionStatus(userId);
    const isSentByCurrentUser = isRequestSentByCurrentUser(userId);

    switch (status) {
      case 'accepted':
        return (
          <Button
            size="sm"
            variant="outline"
            className="text-green-600 border-green-200 hover:bg-green-50"
            onClick={() => navigate(`/chat/${userId}`)}
          >
            <MessageCircle size={16} className="mr-1" />
            Chat
          </Button>
        );
      
      case 'pending':
        if (isSentByCurrentUser) {
          return (
            <Button
              size="sm"
              variant="outline"
              className="text-orange-600 border-orange-200"
              onClick={() => cancelConnectionRequest(userId)}
            >
              <Clock size={16} className="mr-1" />
              Cancel
            </Button>
          );
        } else {
          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 border-green-200"
                onClick={() => acceptConnectionRequest(userId)}
              >
                <UserCheck size={16} className="mr-1" />
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-200"
                onClick={() => declineConnectionRequest(userId)}
              >
                <UserX size={16} className="mr-1" />
                Decline
              </Button>
            </div>
          );
        }
      
      default:
        return (
          <Button
            size="sm"
            variant="outline"
            className="text-chat-primary border-chat-primary hover:bg-chat-primary hover:text-white"
            onClick={() => sendConnectionRequest(userId)}
          >
            <UserPlus size={16} className="mr-1" />
            Connect
          </Button>
        );
    }
  };

  const getStatusBadge = (userId: string) => {
    const status = getConnectionStatus(userId);
    const isSentByCurrentUser = isRequestSentByCurrentUser(userId);

    switch (status) {
      case 'accepted':
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Connected</Badge>;
      case 'pending':
        if (isSentByCurrentUser) {
          return <Badge variant="secondary" className="bg-orange-100 text-orange-700">Request Sent</Badge>;
        } else {
          return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Request Received</Badge>;
        }
      case 'declined':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700">Declined</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Search users by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              Searching users...
            </CardContent>
          </Card>
        ) : sortedUsers.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              {searchQuery ? "No users found matching your search." : "Start typing to search for users."}
            </CardContent>
          </Card>
        ) : (
          sortedUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      src={user.avatar}
                      alt={user.name}
                      isOnline={user.isOnline}
                      className="h-12 w-12"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{user.name}</h3>
                        {getStatusBadge(user.id)}
                      </div>
                      <p className={`text-sm ${user.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                        {user.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getConnectionButton(user.id)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
