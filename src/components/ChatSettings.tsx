
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  BellOff, 
  Lock, 
  Archive, 
  Trash2, 
  Image, 
  Download,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

// API Integration Types
interface ChatSettingsData {
  notifications: boolean;
  readReceipts: boolean;
  mediaAutoDownload: boolean;
  disappearingMessages: boolean;
  silentMode: boolean;
}

interface ArchivedChat {
  id: string;
  name: string;
  lastMessage: string;
  date: string;
}

interface ChatSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  chatName: string;
  isGroup: boolean;
}

export function ChatSettings({ isOpen, onClose, chatName, isGroup }: ChatSettingsProps) {
  const [settings, setSettings] = useState<ChatSettingsData>({
    notifications: true,
    readReceipts: true,
    mediaAutoDownload: false,
    disappearingMessages: false,
    silentMode: false
  });
  const [archivedChats, setArchivedChats] = useState<ArchivedChat[]>([]);
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const [isLoadingArchived, setIsLoadingArchived] = useState(false);

  // API Integration: Load chat settings and archived chats
  useEffect(() => {
    if (isOpen) {
      loadChatSettings();
      loadArchivedChats();
    }
  }, [isOpen]);

  // API Integration: Load chat-specific settings
  const loadChatSettings = async () => {
    setIsLoadingSettings(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/chats/settings/${chatId}`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      // setSettings(data.settings);
      
      // Mock settings for now
      setSettings({
        notifications: true,
        readReceipts: true,
        mediaAutoDownload: false,
        disappearingMessages: false,
        silentMode: false
      });
    } catch (error) {
      console.error('Error loading chat settings:', error);
      toast.error("Failed to load chat settings");
    } finally {
      setIsLoadingSettings(false);
    }
  };

  // API Integration: Load archived chats
  const loadArchivedChats = async () => {
    setIsLoadingArchived(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/chats/archived', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      // setArchivedChats(data.chats);
      
      // Mock data for now
      const mockArchivedChats = [
        { id: "1", name: "Old Marketing Discussion", lastMessage: "Thanks for the feedback", date: "2024-01-15" },
        { id: "2", name: "Project Alpha Team", lastMessage: "Meeting completed", date: "2024-01-10" },
        { id: "3", name: "Sarah Johnson", lastMessage: "See you tomorrow", date: "2024-01-08" },
      ];
      setArchivedChats(mockArchivedChats);
    } catch (error) {
      console.error('Error loading archived chats:', error);
      toast.error("Failed to load archived chats");
    } finally {
      setIsLoadingArchived(false);
    }
  };

  // API Integration: Update chat setting
  const updateChatSetting = async (key: keyof ChatSettingsData, value: boolean) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/chats/settings/${chatId}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     [key]: value
      //   })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to update setting');
      // }
      
      setSettings(prev => ({ ...prev, [key]: value }));
      toast.success(`${key} ${value ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error updating chat setting:', error);
      toast.error("Failed to update setting");
    }
  };

  // API Integration: Export chat media
  const handleExportMedia = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/chats/${chatId}/export-media`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to export media');
      // }
      
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `${chatName}-media.zip`;
      // a.click();
      
      toast.success("Media export will be available when API is integrated");
    } catch (error) {
      console.error('Error exporting media:', error);
      toast.error("Failed to export media");
    }
  };

  // API Integration: Archive current chat
  const handleArchiveChat = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/chats/${chatId}/archive`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to archive chat');
      // }
      
      toast.success(`${chatName} has been archived`);
      onClose();
    } catch (error) {
      console.error('Error archiving chat:', error);
      toast.error("Failed to archive chat");
    }
  };

  // API Integration: Block user/group
  const handleBlockChat = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/chats/${chatId}/block`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to block');
      // }
      
      toast.success(`${isGroup ? 'Group' : 'User'} has been blocked`);
      onClose();
    } catch (error) {
      console.error('Error blocking:', error);
      toast.error(`Failed to block ${isGroup ? 'group' : 'user'}`);
    }
  };

  // API Integration: Delete chat history
  const handleDeleteHistory = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/chats/${chatId}/history`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to delete history');
      // }
      
      toast.success("Chat history has been deleted");
      onClose();
    } catch (error) {
      console.error('Error deleting history:', error);
      toast.error("Failed to delete chat history");
    }
  };

  // API Integration: Unarchive chat
  const handleUnarchiveChat = async (chatId: string, chatName: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/chats/${chatId}/unarchive`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to unarchive chat');
      // }
      
      setArchivedChats(prev => prev.filter(chat => chat.id !== chatId));
      toast.success(`${chatName} has been unarchived`);
    } catch (error) {
      console.error('Error unarchiving chat:', error);
      toast.error("Failed to unarchive chat");
    }
  };

  // API Integration: Delete archived chat
  const handleDeleteArchivedChat = async (chatId: string, chatName: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/chats/${chatId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to delete chat');
      // }
      
      setArchivedChats(prev => prev.filter(chat => chat.id !== chatId));
      toast.success(`${chatName} has been permanently deleted`);
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error("Failed to delete chat");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chat Settings - {chatName}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="archive">Archive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-6">
            {isLoadingSettings ? (
              <div className="text-center py-4">
                <p className="text-gray-500">Loading settings...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell size={18} />
                    <Label htmlFor="notifications">Notifications</Label>
                  </div>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) => updateChatSetting('notifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare size={18} />
                    <Label htmlFor="read-receipts">Read Receipts</Label>
                  </div>
                  <Switch
                    id="read-receipts"
                    checked={settings.readReceipts}
                    onCheckedChange={(checked) => updateChatSetting('readReceipts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Download size={18} />
                    <Label htmlFor="auto-download">Auto-download Media</Label>
                  </div>
                  <Switch
                    id="auto-download"
                    checked={settings.mediaAutoDownload}
                    onCheckedChange={(checked) => updateChatSetting('mediaAutoDownload', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={handleExportMedia}>
                    <Image size={18} className="mr-3" />
                    Export Chat Media
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleArchiveChat}>
                    <Archive size={18} className="mr-3" />
                    Archive This Chat
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock size={18} />
                  <Label>Disappearing Messages</Label>
                </div>
                <Switch 
                  checked={settings.disappearingMessages}
                  onCheckedChange={(checked) => updateChatSetting('disappearingMessages', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BellOff size={18} />
                  <Label>Silent Mode</Label>
                </div>
                <Switch 
                  checked={settings.silentMode}
                  onCheckedChange={(checked) => updateChatSetting('silentMode', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-orange-600 hover:text-orange-700"
                  onClick={handleBlockChat}
                >
                  <Lock size={18} className="mr-3" />
                  Block {isGroup ? "Group" : "User"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={handleDeleteHistory}
                >
                  <Trash2 size={18} className="mr-3" />
                  Delete Chat History
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="archive" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Archived Chats</h3>
                <span className="text-sm text-gray-500">{archivedChats.length} chats</span>
              </div>

              {isLoadingArchived ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">Loading archived chats...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {archivedChats.map((chat) => (
                    <Card key={chat.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{chat.name}</h4>
                          <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                          <p className="text-xs text-gray-400">{chat.date}</p>
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
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {archivedChats.length === 0 && !isLoadingArchived && (
                <div className="text-center py-8 text-gray-500">
                  <Archive size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No archived chats</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
