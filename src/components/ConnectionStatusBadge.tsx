
import { Badge } from "@/components/ui/badge";

interface ConnectionStatusBadgeProps {
  status: 'none' | 'pending' | 'accepted' | 'declined';
  isSentByCurrentUser: boolean;
}

export function ConnectionStatusBadge({ status, isSentByCurrentUser }: ConnectionStatusBadgeProps) {
  switch (status) {
    case 'accepted':
      return <Badge variant="secondary" className="bg-green-100 text-green-700">Connected</Badge>;
    case 'pending':
      if (isSentByCurrentUser) {
        return <Badge variant="secondary" className="bg-orange-100 text-orange-700">Request Sent</Badge>;
      } else {
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Request Received</Badge>;
      }
    case 'declined':
      return <Badge variant="secondary" className="bg-gray-100 text-gray-700">Declined</Badge>;
    default:
      return null;
  }
}
