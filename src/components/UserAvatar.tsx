
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src: string;
  alt: string;
  isOnline?: boolean;
  className?: string;
}

export function UserAvatar({ src, alt, isOnline = false, className }: UserAvatarProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {isOnline !== undefined && (
        <div className={cn(
          "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
          isOnline ? "bg-chat-online" : "bg-chat-offline"
        )} />
      )}
    </div>
  );
}
