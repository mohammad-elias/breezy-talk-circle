
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import { Users, Phone, Video, Settings, Archive, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { ChatSettings } from "./ChatSettings";

interface ChatInfoProps {
  isOpen: boolean;
  onClose: () => void;
  chatName: string;
  isGroup: boolean;
  participants?: string[];
  userAvatar?: string;
  isOnline?: boolean;
}

export function ChatInfo({ 
  isOpen, 
  onClose, 
  chatName, 
  isGroup, 
  participants = [], 
  userAvatar,
  isOnline 
}: ChatInfoProps) {
  const [showChatSettings, setShowChatSettings] = useState(false);

  const handleChatSettings = () => {
    setShowChatSettings(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Chat Information</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              {isGroup ? (
                <div className="w-20 h-20 bg-chat-light rounded-full flex items-center justify-center text-chat-primary mx-auto mb-3">
                  <Users size={32} />
                </div>
              ) : (
                <UserAvatar 
                  src={userAvatar}
                  alt={chatName}
                  isOnline={isOnline}
                  className="w-20 h-20 mx-auto mb-3"
                />
              )}
              <h3 className="text-xl font-semibold">{chatName}</h3>
              {isGroup && (
                <p className="text-sm text-gray-500">{participants.length} members</p>
              )}
              {!isGroup && (
                <p className="text-sm text-gray-500">
                  {isOnline ? "Online" : "Last seen recently"}
                </p>
              )}
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Phone size={18} className="mr-3" />
                Voice Call
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Video size={18} className="mr-3" />
                Video Call
              </Button>
            </div>

            <Separator />

            {/* Settings */}
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={handleChatSettings}
              >
                <Settings size={18} className="mr-3" />
                Chat Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Archive size={18} className="mr-3" />
                Archive Chat
              </Button>
            </div>

            <Separator />

            {/* Danger Zone */}
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 size={18} className="mr-3" />
                Delete Chat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Settings Modal */}
      <ChatSettings
        isOpen={showChatSettings}
        onClose={() => setShowChatSettings(false)}
        chatName={chatName}
        isGroup={isGroup}
      />
    </>
  );
}
