
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useConnections } from "@/hooks/useConnections";
import { useUserApi } from "@/hooks/useUserApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserCard } from "@/components/UserCard";
import { AlertCircle } from "lucide-react";

export function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser, userToken } = useAuth();
  const { users, isLoading, apiError, loadAllUsers, searchUsers } = useUserApi();
  
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
  }, [userToken, loadAllUsers]);

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
  }, [searchQuery, userToken, loadAllUsers, searchUsers]);

  // Sort users: online first, then alphabetically
  const sortedUsers = [...users].sort((a, b) => {
    if (a.isOnline !== b.isOnline) {
      return a.isOnline ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

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
            <UserCard
              key={user.id}
              user={user}
              connectionStatus={getConnectionStatus(user.id)}
              isSentByCurrentUser={isRequestSentByCurrentUser(user.id)}
              onSendRequest={sendConnectionRequest}
              onAcceptRequest={acceptConnectionRequest}
              onDeclineRequest={declineConnectionRequest}
              onCancelRequest={cancelConnectionRequest}
            />
          ))
        )}
      </div>
    </div>
  );
}
