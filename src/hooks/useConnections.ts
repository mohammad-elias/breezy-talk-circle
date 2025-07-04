import { useState, useCallback } from "react";
import { connections as initialConnections, Connection } from "@/data/sampleData";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";
import { API_CONFIG, apiRequest } from "@/config/api";

export function useConnections(currentUserId: string) {
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [apiError, setApiError] = useState<string | null>(null);
  const { userToken } = useAuth();

  // API Integration: Load connections from server
  const loadConnections = useCallback((serverConnections: Connection[]) => {
    setConnections(serverConnections);
    setApiError(null);
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
      const errorMessage = "Authentication required";
      setApiError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setApiError(null);
    try {
      console.log('Sending connection request to:', userId);
      const response = await apiRequest(API_CONFIG.ENDPOINTS.CONNECTIONS_REQUEST, {
        method: 'POST',
        token: userToken,
        body: JSON.stringify({
          toUserId: userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP ${response.status}: Failed to send connection request`;
        console.error('Send Connection Request API Error:', errorMessage);
        setApiError(errorMessage);
        throw new Error(errorMessage);
      }

      const newConnection = await response.json();
      console.log('Connection request sent:', newConnection);
      setConnections(prev => [...prev, newConnection]);
      toast.success("Connection request sent!");
    } catch (error) {
      console.error('Error sending connection request:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send connection request";
      setApiError(errorMessage);
      toast.error(`API Error: ${errorMessage}. Creating local request.`);
      
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
      const errorMessage = "Authentication required";
      setApiError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setApiError(null);
    try {
      console.log('Accepting connection request from:', userId);
      const response = await apiRequest(API_CONFIG.ENDPOINTS.CONNECTIONS_ACCEPT, {
        method: 'POST',
        token: userToken,
        body: JSON.stringify({
          fromUserId: userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP ${response.status}: Failed to accept connection request`;
        console.error('Accept Connection API Error:', errorMessage);
        setApiError(errorMessage);
        throw new Error(errorMessage);
      }

      console.log('Connection request accepted');
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
      const errorMessage = error instanceof Error ? error.message : "Failed to accept connection request";
      setApiError(errorMessage);
      toast.error(`API Error: ${errorMessage}`);
    }
  }, [currentUserId, userToken]);

  // API Integration: Decline connection request
  const declineConnectionRequest = useCallback(async (userId: string) => {
    if (!userToken) {
      const errorMessage = "Authentication required";
      setApiError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setApiError(null);
    try {
      console.log('Declining connection request from:', userId);
      const response = await apiRequest(API_CONFIG.ENDPOINTS.CONNECTIONS_DECLINE, {
        method: 'POST',
        token: userToken,
        body: JSON.stringify({
          fromUserId: userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP ${response.status}: Failed to decline connection request`;
        console.error('Decline Connection API Error:', errorMessage);
        setApiError(errorMessage);
        throw new Error(errorMessage);
      }

      console.log('Connection request declined');
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
      const errorMessage = error instanceof Error ? error.message : "Failed to decline connection request";
      setApiError(errorMessage);
      toast.error(`API Error: ${errorMessage}`);
    }
  }, [currentUserId, userToken]);

  // API Integration: Cancel connection request
  const cancelConnectionRequest = useCallback(async (userId: string) => {
    if (!userToken) {
      const errorMessage = "Authentication required";
      setApiError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setApiError(null);
    try {
      console.log('Cancelling connection request to:', userId);
      const response = await apiRequest(API_CONFIG.ENDPOINTS.CONNECTIONS_CANCEL, {
        method: 'DELETE',
        token: userToken,
        body: JSON.stringify({
          toUserId: userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP ${response.status}: Failed to cancel connection request`;
        console.error('Cancel Connection API Error:', errorMessage);
        setApiError(errorMessage);
        throw new Error(errorMessage);
      }

      console.log('Connection request cancelled');
      setConnections(prev =>
        prev.filter(conn =>
          !(conn.fromUserId === currentUserId && conn.toUserId === userId)
        )
      );
      toast("Connection request cancelled");
    } catch (error) {
      console.error('Error cancelling connection request:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to cancel connection request";
      setApiError(errorMessage);
      toast.error(`API Error: ${errorMessage}`);
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
    apiError,
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
