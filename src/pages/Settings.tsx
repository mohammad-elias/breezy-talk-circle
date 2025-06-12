import { useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { User, Settings as SettingsIcon, Archive, Trash2 } from "lucide-react";

const Settings = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mock archived chats data for global settings
  const globalArchivedChats = [
    { id: "1", name: "Old Marketing Discussion", lastMessage: "Thanks for the feedback", date: "2024-01-15" },
    { id: "2", name: "Project Alpha Team", lastMessage: "Meeting completed", date: "2024-01-10" },
    { id: "3", name: "Sarah Johnson", lastMessage: "See you tomorrow", date: "2024-01-08" },
    { id: "4", name: "Design Team", lastMessage: "Final mockups attached", date: "2024-01-05" },
    { id: "5", name: "John Doe", lastMessage: "Great work on the project", date: "2024-01-02" },
  ];

  if (!currentUser) return null;

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    toast.success("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleUnarchiveChat = (chatId: string, chatName: string) => {
    toast.success(`${chatName} has been unarchived`);
    // TODO: Implement unarchive functionality when API is integrated
  };

  const handleDeleteArchivedChat = (chatId: string, chatName: string) => {
    toast.success(`${chatName} has been permanently deleted`);
    // TODO: Implement delete functionality when API is integrated
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <SettingsIcon size={16} />
              Password
            </TabsTrigger>
            <TabsTrigger value="archive" className="flex items-center gap-2">
              <Archive size={16} />
              Archive
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
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
                      <Button onClick={handleSaveProfile} size="sm">Save</Button>
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

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value="user@example.com" 
                    disabled 
                    className="bg-gray-100" 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="password" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                
                <Button 
                  onClick={handleChangePassword}
                  className="w-full bg-chat-primary hover:bg-chat-secondary"
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                >
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archive" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive size={20} />
                  Archived Chats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Manage all your archived conversations. You can unarchive or permanently delete them.
                    </p>
                    <span className="text-sm text-gray-500">
                      {globalArchivedChats.length} archived
                    </span>
                  </div>

                  <div className="space-y-3">
                    {globalArchivedChats.map((chat) => (
                      <div key={chat.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{chat.name}</h4>
                          <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                          <p className="text-xs text-gray-400 mt-1">Archived on {chat.date}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnarchiveChat(chat.id, chat.name)}
                          >
                            Unarchive
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteArchivedChat(chat.id, chat.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {globalArchivedChats.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Archive size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No archived chats</p>
                      <p className="text-sm mt-2">Archived conversations will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
