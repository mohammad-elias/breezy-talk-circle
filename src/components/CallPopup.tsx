
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react";

interface CallPopupProps {
  isOpen: boolean;
  onClose: () => void;
  callType: "audio" | "video";
  userName: string;
  userAvatar?: string;
  isIncoming?: boolean;
}

export function CallPopup({ 
  isOpen, 
  onClose, 
  callType, 
  userName, 
  userAvatar, 
  isIncoming = false 
}: CallPopupProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callStarted, setCallStarted] = useState(!isIncoming);

  const handleAcceptCall = () => {
    setCallStarted(true);
  };

  const handleEndCall = () => {
    onClose();
    setCallStarted(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {callType === "video" ? "Video Call" : "Voice Call"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="text-center">
            <UserAvatar 
              src={userAvatar}
              alt={userName}
              className="w-20 h-20 mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold">{userName}</h3>
            <p className="text-sm text-gray-500">
              {!callStarted && isIncoming && "Incoming call..."}
              {!callStarted && !isIncoming && "Calling..."}
              {callStarted && "Connected"}
            </p>
          </div>

          {callType === "video" && callStarted && (
            <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-white">Video feed will appear here</p>
            </div>
          )}

          <div className="flex space-x-4">
            {callStarted && (
              <>
                <Button
                  variant={isMuted ? "destructive" : "outline"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </Button>

                {callType === "video" && (
                  <Button
                    variant={isVideoOff ? "destructive" : "outline"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
                  </Button>
                )}
              </>
            )}

            {!callStarted && isIncoming ? (
              <>
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full bg-green-500 hover:bg-green-600"
                  onClick={handleAcceptCall}
                >
                  <Phone size={20} />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  onClick={handleEndCall}
                >
                  <PhoneOff size={20} />
                </Button>
              </>
            ) : (
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full"
                onClick={handleEndCall}
              >
                <PhoneOff size={20} />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
