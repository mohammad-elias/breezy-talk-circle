
import { useState, useCallback } from "react";
import { connections as initialConnections, Connection } from "@/data/sampleData";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";

export function useConnections(currentUserId: string) {
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const { userToken } = useAuth();

  // API Integration: Load connections from server
  const loadConnections = useCallback((serverConnections: Connection[]) => {
    setConnections(serverConnections);
  }, []);

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

  // API Integration: Send connection request
  const sendConnectionRequest = useCallback(async (userId: string) => {
    if (!userToken) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await fetch('/api/connections/request', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toUserId: userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send connection request');
      }

      const newConnection = await response.json();
      setConnections(prev => [...prev, newConnection]);
      toast.success("Connection request sent!");
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast.error("Failed to send connection request");
      
      // Fallback for demo
      const newConnection: Connection = {
        id: `c${Date.now()}`,
        fromUserId: currentUserId,
        toUserId: userId,
        status: 'pending',
        createdAt: new Date(),
      };
      setConnections(prev => [...prev, newConnection]);
      toast.success("Connection request sent! (Demo mode)");
    }
  }, [currentUserId, userToken]);

  // API Integration: Accept connection request
  const acceptConnectionRequest = useCallback(async (userId: string) => {
    if (!userToken) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await fetch('/api/connections/accept', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fromUserId: userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to accept connection request');
      }

      setConnections(prev =>
        prev.map(conn =>
          (conn.fromUserId === userId && conn.toUserId === currentUserId)
            ? { ...conn, status: 'accepted' as const }
            : conn
        )
      );
      toast.success("Connection request accepted!");
    } catch (error) {
      console.error('Error accepting connection request:', error);
      toast.error("Failed to accept connection request");
    }
  }, [currentUserId, userToken]);

  // API Integration: Decline connection request
  const declineConnectionRequest = useCallback(async (userId: string) => {
    if (!userToken) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await fetch('/api/connections/decline', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fromUserId: userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to decline connection request');
      }

      setConnections(prev =>
        prev.map(conn =>
          (conn.fromUserId === userId && conn.toUserId === currentUserId)
            ? { ...conn, status: 'declined' as const }
            : conn
        )
      );
      toast("Connection request declined");
    } catch (error) {
      console.error('Error declining connection request:', error);
      toast.error("Failed to decline connection request");
    }
  }, [currentUserId, userToken]);

  // API Integration: Cancel connection request
  const cancelConnectionRequest = useCallback(async (userId: string) => {
    if (!userToken) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await fetch('/api/connections/cancel', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toUserId: userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel connection request');
      }

      setConnections(prev =>
        prev.filter(conn =>
          !(conn.fromUserId === currentUserId && conn.toUserId === userId)
        )
      );
      toast("Connection request cancelled");
    } catch (error) {
      console.error('Error cancelling connection request:', error);
      toast.error("Failed to cancel connection request");
    }
  }, [currentUserId, userToken]);

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
    loadConnections,
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
