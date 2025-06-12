
import { useState } from "react";
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

interface ChatSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  chatName: string;
  isGroup: boolean;
}

export function ChatSettings({ isOpen, onClose, chatName, isGroup }: ChatSettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [mediaAutoDownload, setMediaAutoDownload] = useState(false);

  // Mock archived chats data
  const archivedChats = [
    { id: "1", name: "Old Marketing Discussion", lastMessage: "Thanks for the feedback", date: "2024-01-15" },
    { id: "2", name: "Project Alpha Team", lastMessage: "Meeting completed", date: "2024-01-10" },
    { id: "3", name: "Sarah Johnson", lastMessage: "See you tomorrow", date: "2024-01-08" },
  ];

  const handleToggleNotifications = () => {
    setNotifications(!notifications);
    toast(notifications ? "Notifications disabled" : "Notifications enabled");
  };

  const handleUnarchiveChat = (chatId: string, chatName: string) => {
    toast(`${chatName} has been unarchived`);
    // TODO: Implement unarchive functionality when API is integrated
  };

  const handleDeleteArchivedChat = (chatId: string, chatName: string) => {
    toast(`${chatName} has been permanently deleted`);
    // TODO: Implement delete functionality when API is integrated
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell size={18} />
                  <Label htmlFor="notifications">Notifications</Label>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={handleToggleNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare size={18} />
                  <Label htmlFor="read-receipts">Read Receipts</Label>
                </div>
                <Switch
                  id="read-receipts"
                  checked={readReceipts}
                  onCheckedChange={setReadReceipts}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Download size={18} />
                  <Label htmlFor="auto-download">Auto-download Media</Label>
                </div>
                <Switch
                  id="auto-download"
                  checked={mediaAutoDownload}
                  onCheckedChange={setMediaAutoDownload}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Image size={18} className="mr-3" />
                  Export Chat Media
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Archive size={18} className="mr-3" />
                  Archive This Chat
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock size={18} />
                  <Label>Disappearing Messages</Label>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BellOff size={18} />
                  <Label>Silent Mode</Label>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-orange-600 hover:text-orange-700">
                  <Lock size={18} className="mr-3" />
                  Block {isGroup ? "Group" : "User"}
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
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

              {archivedChats.length === 0 && (
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
