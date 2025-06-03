
import { useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const Settings = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");

  if (!currentUser) return null;

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <UserAvatar 
                src={currentUser.avatar}
                alt={currentUser.name}
                isOnline={true}
                className="w-16 h-16"
              />
              <div>
                <h3 className="font-medium">{currentUser.name}</h3>
                <p className="text-sm text-gray-500">User ID: {currentUser.id}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              {isEditing ? (
                <div className="flex gap-2">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSave} size="sm">Save</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)} 
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <Input value={currentUser.name} disabled className="flex-1" />
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(true)} 
                    size="sm"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Online</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Connected to chat server
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
