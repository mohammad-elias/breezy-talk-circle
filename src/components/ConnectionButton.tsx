
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, UserX, Clock, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConnectionButtonProps {
  userId: string;
  status: 'none' | 'pending' | 'accepted' | 'declined';
  isSentByCurrentUser: boolean;
  onSendRequest: (userId: string) => void;
  onAcceptRequest: (userId: string) => void;
  onDeclineRequest: (userId: string) => void;
  onCancelRequest: (userId: string) => void;
}

export function ConnectionButton({
  userId,
  status,
  isSentByCurrentUser,
  onSendRequest,
  onAcceptRequest,
  onDeclineRequest,
  onCancelRequest,
}: ConnectionButtonProps) {
  const navigate = useNavigate();

  switch (status) {
    case 'accepted':
      return (
        <Button
          size="sm"
          variant="outline"
          className="text-green-600 border-green-200 hover:bg-green-50"
          onClick={() => navigate(`/chat/${userId}`)}
        >
          <MessageCircle size={16} className="mr-1" />
          Chat
        </Button>
      );
    
    case 'pending':
      if (isSentByCurrentUser) {
        return (
          <Button
            size="sm"
            variant="outline"
            className="text-orange-600 border-orange-200"
            onClick={() => onCancelRequest(userId)}
          >
            <Clock size={16} className="mr-1" />
            Cancel
          </Button>
        );
      } else {
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-green-600 border-green-200"
              onClick={() => onAcceptRequest(userId)}
            >
              <UserCheck size={16} className="mr-1" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 border-red-200"
              onClick={() => onDeclineRequest(userId)}
            >
              <UserX size={16} className="mr-1" />
              Decline
            </Button>
          </div>
        );
      }
    
    default:
      return (
        <Button
          size="sm"
          variant="outline"
          className="text-chat-primary border-chat-primary hover:bg-chat-primary hover:text-white"
          onClick={() => onSendRequest(userId)}
        >
          <UserPlus size={16} className="mr-1" />
          Connect
        </Button>
      );
  }
}
