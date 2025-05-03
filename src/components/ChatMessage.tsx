
import { cn } from "@/lib/utils";
import { Message, User } from "@/data/sampleData";
import { UserAvatar } from "./UserAvatar";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
  user: User;
  isMine: boolean;
}

export function ChatMessage({ message, user, isMine }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex items-start gap-3 py-2 animate-fade-in",
      isMine ? "flex-row-reverse" : "flex-row"
    )}>
      <UserAvatar 
        src={user.avatar} 
        alt={user.name} 
        isOnline={user.isOnline}
      />
      
      <div className={cn(
        "flex flex-col max-w-[70%]",
        isMine && "items-end"
      )}>
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "text-sm font-medium",
            isMine ? "order-2" : "order-1"
          )}>
            {user.name}
          </span>
          <span className={cn(
            "text-xs text-gray-500",
            isMine ? "order-1" : "order-2"
          )}>
            {format(message.timestamp, 'h:mm a')}
          </span>
        </div>
        
        <div className={cn(
          "rounded-2xl px-4 py-2 text-sm",
          isMine 
            ? "bg-chat-primary text-white rounded-tr-none" 
            : "bg-chat-light text-gray-800 rounded-tl-none"
        )}>
          {message.text}
        </div>
      </div>
    </div>
  );
}
