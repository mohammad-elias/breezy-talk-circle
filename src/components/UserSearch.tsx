
import { useState, useEffect } from "react";
import { users as allUsers } from "@/data/sampleData";
import { useAuth } from "@/context/AuthContext";
import { useConnections } from "@/hooks/useConnections";
import { UserAvatar } from "@/components/UserAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, UserCheck, UserX, Clock, MessageCircle, AlertCircle } from "lucide-react";
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
  const [apiError, setApiError] = useState<string | null>(null);
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

  // Load all users on component mount
  useEffect(() => {
    console.log('UserSearch component mounted, userToken:', !!userToken);
    if (userToken) {
      loadAllUsers();
    }
  }, [userToken]);

  // Search users when query changes
  useEffect(() => {
    console.log('Search query changed:', searchQuery);
    if (searchQuery.trim()) {
      searchUsers(searchQuery);
    } else {
      // If no search query, show all users
      if (userToken) {
        loadAllUsers();
      }
    }
  }, [searchQuery, userToken]);

  const loadAllUsers = async () => {
    console.log('loadAllUsers called, userToken:', !!userToken);
    if (!userToken) {
      setApiError("Authentication required");
      return;
    }

    setIsLoading(true);
    setApiError(null);
    try {
      console.log('Fetching all users from API...');
      const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('API Response status:', response.status);
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || `HTTP ${response.status}: Failed to load users`;
        } catch {
          errorMessage = `HTTP ${response.status}: Failed to load users`;
        }
        console.error('API Error:', errorMessage);
        setApiError(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      // Handle different possible response structures
      let usersList = [];
      if (Array.isArray(data)) {
        usersList = data;
      } else if (data.users && Array.isArray(data.users)) {
        usersList = data.users;
      } else if (data.results && Array.isArray(data.results)) {
        usersList = data.results;
      } else {
        console.warn('Unexpected API response structure:', data);
        usersList = [];
      }
      
      // Filter out current user
      const filteredUsers = usersList.filter((user: User) => user.id !== currentUser?.id);
      console.log('Filtered users:', filteredUsers);
      setUsers(filteredUsers);
      setApiError(null);
    } catch (error) {
      console.error('Error loading users:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load users";
      setApiError(errorMessage);
      
      // Fallback for demo - use local users
      const filteredUsers = allUsers.filter(user => user.id !== currentUser?.id);
      setUsers(filteredUsers);
      toast.error(`API Error: ${errorMessage}. Using local data.`);
    } finally {
      setIsLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    console.log('searchUsers called with query:', query);
    if (!userToken) {
      setApiError("Authentication required");
      return;
    }

    setIsLoading(true);
    setApiError(null);
    try {
      console.log(`Searching users with query: ${query}`);
      const response = await fetch(`http://127.0.0.1:8000/api/users/search/?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Search API Response status:', response.status);

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || `HTTP ${response.status}: Failed to search users`;
        } catch {
          errorMessage = `HTTP ${response.status}: Failed to search users`;
        }
        console.error('Search API Error:', errorMessage);
        setApiError(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Search results:', data);
      
      // Handle different possible response structures
      let usersList = [];
      if (Array.isArray(data)) {
        usersList = data;
      } else if (data.users && Array.isArray(data.users)) {
        usersList = data.users;
      } else if (data.results && Array.isArray(data.results)) {
        usersList = data.results;
      } else {
        console.warn('Unexpected search API response structure:', data);
        usersList = [];
      }
      
      setUsers(usersList);
      setApiError(null);
    } catch (error) {
      console.error('Error searching users:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to search users";
      setApiError(errorMessage);
      
      // Fallback for demo - filter local users
      const filteredUsers = allUsers.filter(user => 
        user.id !== currentUser?.id &&
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setUsers(filteredUsers);
      toast.error(`API Error: ${errorMessage}. Using local data.`);
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

      {/* API Error Display */}
      {apiError && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle size={16} />
              <p className="text-sm font-medium">API Error:</p>
            </div>
            <p className="text-sm text-red-600 mt-1">{apiError}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 text-red-600 border-red-200"
              onClick={() => searchQuery ? searchUsers(searchQuery) : loadAllUsers()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {isLoading ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              {searchQuery ? "Searching users..." : "Loading users..."}
            </CardContent>
          </Card>
        ) : sortedUsers.length === 0 && !searchQuery ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No users found.
            </CardContent>
          </Card>
        ) : sortedUsers.length === 0 && searchQuery ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No users found matching your search.
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
