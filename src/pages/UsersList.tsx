
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { UserSearch } from "@/components/UserSearch";
import { ConnectionRequests } from "@/components/ConnectionRequests";
import { ConnectedUsersList } from "@/components/ConnectedUsersList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useConnections } from "@/hooks/useConnections";
import { Search, Inbox, Users } from "lucide-react";

const UsersList = () => {
  const { currentUser } = useAuth();
  const { getPendingRequests, getConnectedUsers } = useConnections(currentUser?.id || "0");
  
  const pendingRequestsCount = getPendingRequests().length;
  const connectedUsersCount = getConnectedUsers().length;

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Connect with People</h1>
          <p className="text-gray-500 text-sm">Search for users and manage your connections</p>
        </div>
        
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
