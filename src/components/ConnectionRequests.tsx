
import { useState, useEffect } from "react";
import { users as allUsers } from "@/data/sampleData";
import { useAuth } from "@/context/AuthContext";
import { useConnections } from "@/hooks/useConnections";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX, Inbox } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export function ConnectionRequests() {
  const { currentUser, userToken } = useAuth();
  const [requestUsers, setRequestUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    getPendingRequests,
    acceptConnectionRequest,
    declineConnectionRequest,
  } = useConnections(currentUser?.id || "0");

  const pendingRequests = getPendingRequests();

  // API Integration: Load user details for pending requests
  useEffect(() => {
    if (pendingRequests.length > 0 && userToken) {
      loadRequestUsers();
    }
  }, [pendingRequests, userToken]);

  const loadRequestUsers = async () => {
    if (!userToken) return;
    
    const userIds = pendingRequests.map(req => req.fromUserId);
    if (userIds.length === 0) return;

    setIsLoading(true);
    try {
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
        throw new Error(errorData.message || 'Failed to load user details');
      }

      const data = await response.json();
      setRequestUsers(data.users || []);
    } catch (error) {
      console.error('Error loading user details:', error);
      toast.error("Failed to load user details");
      
      // Fallback: use local user data
      const fallbackUsers = pendingRequests.map(request => {
        const user = allUsers.find(u => u.id === request.fromUserId);
        return user;
      }).filter(Boolean) as User[];
      setRequestUsers(fallbackUsers);
    } finally {
      setIsLoading(false);
    }
  };

  // Get user details for each pending request
  const requestsWithUserData = pendingRequests.map(request => {
    const user = requestUsers.find(u => u.id === request.fromUserId) || 
                allUsers.find(u => u.id === request.fromUserId);
    return {
      ...request,
      user,
    };
  }).filter(request => request.user);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Inbox size={20} />
            Connection Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Loading connection requests...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (requestsWithUserData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Inbox size={20} />
            Connection Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Inbox size={48} className="mx-auto mb-4 opacity-50" />
            <p>No pending connection requests</p>
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
            <Inbox size={20} />
            Connection Requests
          </div>
          <Badge variant="secondary">
            {requestsWithUserData.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {requestsWithUserData.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <UserAvatar
                  src={request.user!.avatar}
                  alt={request.user!.name}
                  isOnline={request.user!.isOnline}
                  className="h-10 w-10"
                />
                <div>
                  <h4 className="font-medium">{request.user!.name}</h4>
                  <p className="text-sm text-gray-500">
                    Sent {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                  onClick={() => acceptConnectionRequest(request.fromUserId)}
                >
                  <UserCheck size={16} className="mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => declineConnectionRequest(request.fromUserId)}
                >
                  <UserX size={16} className="mr-1" />
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
