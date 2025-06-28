
import { useEffect, useRef } from "react";
import { Message, User, users as allUsers, currentUser } from "@/data/sampleData";
import { ChatMessage } from "./ChatMessage";

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading = false }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getUserById = (userId: string): User => {
    if (userId === currentUser.id) return currentUser;
    return allUsers.find(user => user.id === userId) || currentUser;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col p-4 overflow-y-auto flex-1 justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2 text-gray-500">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 overflow-y-auto flex-1">
      {messages.map((message) => {
        const user = getUserById(message.userId);
        const isMine = message.userId === currentUser.id;
        
        return (
          <ChatMessage 
            key={message.id}
            message={message}
            user={user}
            isMine={isMine}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
