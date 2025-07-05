
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { UserSearch } from "@/components/UserSearch";
import { ConnectionRequests } from "@/components/ConnectionRequests";
import { ConnectedUsersList } from "@/components/ConnectedUsersList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useConnections } from "@/hooks/useConnections";
import { Search, Inbox, Users, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { API_CONFIG, apiRequest } from "@/config/api";

const UsersList = () => {
  const { currentUser, userToken } = useAuth();
  const { getPendingRequests, getConnectedUsers, loadConnections } = useConnections(currentUser?.id || "0");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const pendingRequestsCount = getPendingRequests().length;
  const connectedUsersCount = getConnectedUsers().length;

  // API Integration: Load connections on component mount
  useEffect(() => {
    if (userToken && currentUser?.id) {
      loadUserConnections();
    }
  }, [userToken, currentUser?.id]);

  const loadUserConnections = async () => {
    if (!userToken || !currentUser?.id) return;
    
    setIsLoading(true);
    setApiError(null);
    try {
      console.log('Loading user connections...');
      const response = await apiRequest(API_CONFIG.ENDPOINTS.CONNECTIONS, {
        method: 'GET',
        token: userToken,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP ${response.status}: Failed to load connections`;
        console.error('API Error:', errorMessage);
        setApiError(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Loaded connections:', data);
      loadConnections(data.connections || []);
      setApiError(null);
    } catch (error) {
      console.error('Error loading connections:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load connections";
      setApiError(errorMessage);
      toast.error(`API Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Connect with People</h1>
          <p className="text-gray-500 text-sm">Search for users and manage your connections</p>
        </div>

        {/* API Error Display */}
        {apiError && (
          <div className="p-4 border-b border-red-200 bg-red-50">
            <Card className="border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle size={16} />
                  <p className="text-sm font-medium">Connection API Error:</p>
                </div>
                <p className="text-sm text-red-600 mt-1">{apiError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-red-600 border-red-200"
                  onClick={loadUserConnections}
                >
                  Retry Loading Connections
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search size={16} />
                Search Users
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <Inbox size={16} />
                Requests
                {pendingRequestsCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {pendingRequestsCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="connected" className="flex items-center gap-2">
                <Users size={16} />
                Connected
                {connectedUsersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {connectedUsersCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="mt-4">
              <UserSearch />
            </TabsContent>
            
            <TabsContent value="requests" className="mt-4">
              <ConnectionRequests />
            </TabsContent>
            
            <TabsContent value="connected" className="mt-4">
              <ConnectedUsersList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersList;
