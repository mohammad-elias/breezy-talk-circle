
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { ConnectionButton } from "@/components/ConnectionButton";
import { ConnectionStatusBadge } from "@/components/ConnectionStatusBadge";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
  connectionStatus: 'none' | 'pending' | 'accepted' | 'declined';
  isSentByCurrentUser: boolean;
  onSendRequest: (userId: string) => void;
  onAcceptRequest: (userId: string) => void;
  onDeclineRequest: (userId: string) => void;
  onCancelRequest: (userId: string) => void;
}

export function UserCard({
  user,
  connectionStatus,
  isSentByCurrentUser,
  onSendRequest,
  onAcceptRequest,
  onDeclineRequest,
  onCancelRequest,
}: UserCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar
              src={user.avatar}
              alt={user.name}
              isOnline={user.isOnline}
              className="h-12 w-12"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{user.name}</h3>
                <ConnectionStatusBadge 
                  status={connectionStatus} 
                  isSentByCurrentUser={isSentByCurrentUser} 
                />
              </div>
              <p className={`text-sm ${user.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                {user.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ConnectionButton
              userId={user.id}
              status={connectionStatus}
              isSentByCurrentUser={isSentByCurrentUser}
              onSendRequest={onSendRequest}
              onAcceptRequest={onAcceptRequest}
              onDeclineRequest={onDeclineRequest}
              onCancelRequest={onCancelRequest}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
