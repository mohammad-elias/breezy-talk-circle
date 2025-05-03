
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleOff, Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isConnected?: boolean;
}

export function MessageInput({ onSendMessage, isConnected = true }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && isConnected) {
      setIsSending(true);
      
      try {
        onSendMessage(message);
        setMessage("");
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-gray-200 p-4 bg-white"
    >
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder={isConnected ? "Type a message..." : "Reconnecting..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-full"
          disabled={!isConnected || isSending}
        />
        <Button 
          type="submit" 
          disabled={!message.trim() || !isConnected || isSending}
          className="rounded-full bg-chat-primary hover:bg-chat-secondary transition-colors"
        >
          {isConnected ? (
            <Send size={18} className="mr-1" />
          ) : (
            <CircleOff size={18} className="mr-1" />
          )}
          Send
        </Button>
      </div>
    </form>
  );
}
