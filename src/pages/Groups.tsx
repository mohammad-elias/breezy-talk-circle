
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  lastActivity: Date;
}

const Groups = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample groups data
  const [groups] = useState<Group[]>([
    {
      id: "group1",
      name: "Marketing Team",
      description: "Marketing discussions and campaigns",
      members: 8,
      lastActivity: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: "group2",
      name: "Product Discussion",
      description: "Product development and feedback",
      members: 12,
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      id: "group3",
      name: "Development Team",
      description: "Technical discussions and updates",
      members: 6,
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
    }
  ]);

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minutes ago`;
    }
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    }
    return date.toLocaleDateString();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Groups</h1>
            <Button onClick={() => navigate("/create-group")}>
              <Plus size={18} className="mr-1" />
              Create Group
            </Button>
          </div>
          
          <Input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <Card 
                key={group.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/chat/${group.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-chat-light rounded-full flex items-center justify-center text-chat-primary">
                      <UsersRound size={24} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <p className="text-sm text-gray-500">{group.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{group.members} members</span>
                    </div>
                    <span>{formatTime(group.lastActivity)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredGroups.length === 0 && (
            <div className="text-center py-8">
              <UsersRound size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No groups found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Groups;
