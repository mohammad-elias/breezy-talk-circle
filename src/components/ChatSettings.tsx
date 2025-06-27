
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { Settings, Shield, Archive, Trash2, UserMinus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ChatSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  chatName: string;
  isGroup: boolean;
  chatId?: string;
}

interface ArchivedMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

export function ChatSettings({ isOpen, onClose, chatName, isGroup, chatId }: ChatSettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [muteChat, setMuteChat] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [autoDelete, setAutoDelete] = useState(false);
  const [newChatName, setNewChatName] = useState(chatName);
  const [archivedMessages, setArchivedMessages] = useState<ArchivedMessage[]>([]);
  const [isLoadingArchived, setIsLoadingArchived] = useState(false);
  const { userToken } = useAuth();

  // Load archived messages when tab is accessed
  useEffect(() => {
    if (isOpen && userToken && chatId) {
      loadArchivedMessages();
    }
  }, [isOpen, userToken, chatId]);

  // API Integration: Load archived messages
  const loadArchivedMessages = async () => {
    if (!userToken || !chatId) return;
    
    setIsLoadingArchived(true);
    try {
      const response = await fetch(`/api/chats/${chatId}/archived-messages`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load archived messages');
      }

      const data = await response.json();
      setArchivedMessages(data.messages || []);
    } catch (error) {
      console.error('Error loading archived messages:', error);
      toast.error("Failed to load archived messages");
      
      // Mock data for demo purposes - Remove in production
      const mockArchivedMessages = [
        { id: "1", content: "This message was archived", sender: "John Doe", timestamp: "2024-01-15 10:30" },
        { id: "2", content: "Important document shared", sender: "Sarah Johnson", timestamp: "2024-01-14 15:45" },
        { id: "3", content: "Meeting notes from last week", sender: "Michael Chen", timestamp: "2024-01-13 09:15" },
      ];
      setArchivedMessages(mockArchivedMessages);
    } finally {
      setIsLoadingArchived(false);
    }
  };

  // API Integration: Update chat settings
  const handleSaveSettings = async () => {
    if (!userToken || !chatId) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await fetch(`/api/chats/${chatId}/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          notifications,
          muteChat,
          readReceipts,
          autoDelete,
          name: newChatName
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update chat settings');
      }

      toast.success("Chat settings updated successfully");
      onClose();
    } catch (error) {
      console.error('Error updating chat settings:', error);
      toast.error("Failed to update chat settings");
    }
  };

  // API Integration: Block user (for private chats)
  const handleBlockUser = async () => {
    if (!userToken || !chatId || isGroup) {
      toast.error("Cannot block in group chats");
      return;
    }

    try {
      const response = await fetch(`/api/chats/${chatId}/block`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to block user');
      }

      toast.success(`${chatName} has been blocked`);
      onClose();
    } catch (error) {
      console.error('Error blocking user:', error);
      toast.error("Failed to block user");
    }
  };

  // API Integration: Leave group (for group chats)
  const handleLeaveGroup = async () => {
    if (!userToken || !chatId || !isGroup) {
      toast.error("Can only leave group chats");
      return;
    }

    try {
      const response = await fetch(`/api/groups/${chatId}/leave`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to leave group');
      }

      toast.success(`Left ${chatName} successfully`);
      onClose();
    } catch (error) {
      console.error('Error leaving group:', error);
      toast.error("Failed to leave group");
    }
  };

  // API Integration: Restore archived message
  const handleRestoreMessage = async (messageId: string) => {
    if (!userToken || !chatId) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await fetch(`/api/chats/${chatId}/messages/${messageId}/restore`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to restore message');
      }

      // Remove from archived messages list
      setArchivedMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast.success("Message restored successfully");
    } catch (error) {
      console.error('Error restoring message:', error);
      toast.error("Failed to restore message");
    }
  };

  // API Integration: Permanently delete archived message
  const handleDeleteArchivedMessage = async (messageId: string) => {
    if (!userToken || !chatId) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await fetch(`/api/chats/${chatId}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete message');
      }

      // Remove from archived messages list
      setArchivedMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast.success("Message deleted permanently");
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error("Failed to delete message");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings size={20} />
            Chat Settings - {chatName}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="archive">Archive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chatName">Chat Name</Label>
                <Input
                  id="chatName"
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                  placeholder="Enter chat name"
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications for new messages</p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mute Chat</Label>
                    <p className="text-sm text-gray-500">Temporarily mute all notifications</p>
                  </div>
                  <Switch
                    checked={muteChat}
                    onCheckedChange={setMuteChat}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Read Receipts</Label>
                    <p className="text-sm text-gray-500">Show when you've read messages</p>
                  </div>
                  <Switch
                    checked={readReceipts}
                    onCheckedChange={setReadReceipts}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-delete Messages</Label>
                    <p className="text-sm text-gray-500">Automatically delete messages after 24 hours</p>
                  </div>
                  <Switch
                    checked={autoDelete}
                    onCheckedChange={setAutoDelete}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSettings} className="bg-chat-primary hover:bg-chat-secondary">
                  Save Settings
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={18} />
                <h3 className="font-medium">Privacy & Security</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                  <h4 className="font-medium text-yellow-800">Caution Zone</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    These actions cannot be undone and will affect your conversation.
                  </p>
                </div>
                
                {!isGroup ? (
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleBlockUser}
                  >
                    <UserMinus size={18} className="mr-2" />
                    Block User
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLeaveGroup}
                  >
                    <UserMinus size={18} className="mr-2" />
                    Leave Group
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="archive" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Archive size={18} />
                <h3 className="font-medium">Archived Messages</h3>
              </div>
              
              {isLoadingArchived ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading archived messages...</p>
                </div>
              ) : (
                <ScrollArea className="h-64 w-full">
                  <div className="space-y-3 pr-4">
                    {archivedMessages.map((message) => (
                      <div key={message.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{message.sender}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">{message.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex space-x-1 ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRestoreMessage(message.id)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            Restore
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteArchivedMessage(message.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
              
              {archivedMessages.length === 0 && !isLoadingArchived && (
                <div className="text-center py-12 text-gray-500">
                  <Archive size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No archived messages</p>
                  <p className="text-sm mt-2">Archived messages will appear here</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
