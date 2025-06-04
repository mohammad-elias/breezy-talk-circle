
import { useState, useCallback } from "react";
import { connections as initialConnections, Connection } from "@/data/sampleData";
import { toast } from "@/components/ui/sonner";

export function useConnections(currentUserId: string) {
  const [connections, setConnections] = useState<Connection[]>(initialConnections);

  // Get connection status between two users
  const getConnectionStatus = useCallback((userId: string): 'none' | 'pending' | 'accepted' | 'declined' => {
    const connection = connections.find(
      (conn) =>
        (conn.fromUserId === currentUserId && conn.toUserId === userId) ||
        (conn.fromUserId === userId && conn.toUserId === currentUserId)
    );
    return connection?.status || 'none';
  }, [connections, currentUserId]);

  // Check if current user sent the request
  const isRequestSentByCurrentUser = useCallback((userId: string): boolean => {
    const connection = connections.find(
      (conn) =>
        (conn.fromUserId === currentUserId && conn.toUserId === userId)
    );
    return !!connection;
  }, [connections, currentUserId]);

  // Send connection request
  const sendConnectionRequest = useCallback((userId: string) => {
    const newConnection: Connection = {
      id: `c${Date.now()}`,
      fromUserId: currentUserId,
      toUserId: userId,
      status: 'pending',
      createdAt: new Date(),
    };

    setConnections(prev => [...prev, newConnection]);
    toast.success("Connection request sent!");
  }, [currentUserId]);

  // Accept connection request
  const acceptConnectionRequest = useCallback((userId: string) => {
    setConnections(prev =>
      prev.map(conn =>
        (conn.fromUserId === userId && conn.toUserId === currentUserId)
          ? { ...conn, status: 'accepted' as const }
          : conn
      )
    );
    toast.success("Connection request accepted!");
  }, [currentUserId]);

  // Decline connection request
  const declineConnectionRequest = useCallback((userId: string) => {
    setConnections(prev =>
      prev.map(conn =>
        (conn.fromUserId === userId && conn.toUserId === currentUserId)
          ? { ...conn, status: 'declined' as const }
          : conn
      )
    );
    toast("Connection request declined");
  }, [currentUserId]);

  // Cancel connection request
  const cancelConnectionRequest = useCallback((userId: string) => {
    setConnections(prev =>
      prev.filter(conn =>
        !(conn.fromUserId === currentUserId && conn.toUserId === userId)
      )
    );
    toast("Connection request cancelled");
  }, [currentUserId]);

  // Get pending requests received by current user
  const getPendingRequests = useCallback(() => {
    return connections.filter(
      conn => conn.toUserId === currentUserId && conn.status === 'pending'
    );
  }, [connections, currentUserId]);

  // Get connected users
  const getConnectedUsers = useCallback(() => {
    return connections.filter(
      conn => 
        (conn.fromUserId === currentUserId || conn.toUserId === currentUserId) &&
        conn.status === 'accepted'
    );
  }, [connections, currentUserId]);

  return {
    connections,
    getConnectionStatus,
    isRequestSentByCurrentUser,
    sendConnectionRequest,
    acceptConnectionRequest,
    declineConnectionRequest,
    cancelConnectionRequest,
    getPendingRequests,
    getConnectedUsers,
  };
}
