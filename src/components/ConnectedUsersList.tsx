import { useState, useEffect } from "react";
import { users as allUsers } from "@/data/sampleData";
import { useAuth } from "@/context/AuthContext";
import { useConnections } from "@/hooks/useConnections";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export function ConnectedUsersList() {
  const { currentUser, userToken } = useAuth();
  const { getConnectedUsers } = useConnections(currentUser?.id || "0");
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const connectedConnections = getConnectedUsers();

  // API Integration: Load user details for connected users
  useEffect(() => {
    if (connectedConnections.length > 0 && userToken) {
      loadConnectedUsers();
    }
  }, [connectedConnections, userToken]);

  const loadConnectedUsers = async () => {
    if (!userToken) return;
    
    const userIds = connectedConnections.map(connection => 
      connection.fromUserId === currentUser?.id 
        ? connection.toUserId 
        : connection.fromUserId
    );
    
    if (userIds.length === 0) return;

    setIsLoading(true);
    setApiError(null);
    try {
      console.log('Loading connected users:', userIds);
      const response = await fetch('/api/users/batch', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userIds: userIds
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP ${response.status}: Failed to load connected users`;
        console.error('API Error:', errorMessage);
        setApiError(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Loaded connected users:', data);
      setConnectedUsers(data.users || []);
      setApiError(null);    
    } catch (error) {
      console.error('Error loading connected users:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load connected users";
      setApiError(errorMessage);
      
      // Fallback: use local user data
      const fallbackUsers = connectedConnections.map(connection => {
        const userId = connection.fromUserId === currentUser?.id 
          ? connection.toUserId 
          : connection.fromUserId;
        const user = allUsers.find(u => u.id === userId);
        return user;
      }).filter(Boolean) as User[];
      setConnectedUsers(fallbackUsers);
      toast.error(`API Error: ${errorMessage}. Using local data.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Get user details for each connected user
  const connectedUsersWithData = connectedConnections.map(connection => {
    const userId = connection.fromUserId === currentUser?.id 
      ? connection.toUserId 
      : connection.fromUserId;
    const user = connectedUsers.find(u => u.id === userId) || 
                allUsers.find(u => u.id === userId);
    return {
      ...connection,
      user,
    };
  }).filter(connection => connection.user);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Connected Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Loading connected users...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (connectedUsersWithData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Connected Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>No connected users yet</p>
            <p className="text-sm mt-2">Start connecting with people to see them here!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={20} />
            Connected Users
          </div>
          <Badge variant="secondary">
            {connectedUsersWithData.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* API Error Display */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle size={16} />
              <p className="text-sm font-medium">API Error:</p>
            </div>
            <p className="text-sm text-red-600 mt-1">{apiError}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 text-red-600 border-red-200"
              onClick={loadConnectedUsers}
            >
              Retry
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {connectedUsersWithData.map((connection) => (
            <div
              key={connection.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <UserAvatar
                  src={connection.user!.avatar}
                  alt={connection.user!.name}
                  isOnline={connection.user!.isOnline}
                  className="h-10 w-10"
                />
                <div>
                  <h4 className="font-medium">{connection.user!.name}</h4>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm ${connection.user!.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                      {connection.user!.isOnline ? 'Online' : 'Offline'}
                    </p>
                    <span className="text-gray-300">•</span>
                    <p className="text-sm text-gray-500">
                      Connected {new Date(connection.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-chat-primary border-chat-primary hover:bg-chat-primary hover:text-white"
                  onClick={() => navigate(`/chat/${connection.user!.id}`)}
                >
                  <MessageCircle size={16} className="mr-1" />
                  Chat
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
