
import { useState } from "react";
import { users, currentUser, messages as initialMessages, Message } from "@/data/sampleData";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { toast } from "@/components/ui/sonner";

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      userId: currentUser.id,
      text: text,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    toast("Message sent successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <ChatSidebar users={users} currentUser={currentUser} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader activeUsers={[...users, currentUser]} />
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
