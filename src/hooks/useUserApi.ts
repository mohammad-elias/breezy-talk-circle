
import { useState, useCallback } from "react";
import { users as allUsers } from "@/data/sampleData";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import { User } from "@/types/user";

export function useUserApi() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { currentUser, userToken } = useAuth();

  const loadAllUsers = useCallback(async () => {
    console.log('loadAllUsers called, userToken:', !!userToken);
    if (!userToken) {
      setApiError("Authentication required");
      return;
    }

    setIsLoading(true);
    setApiError(null);
    try {
      console.log('Fetching all users from API...');
      // Use relative URL instead of absolute localhost URL
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('API Response status:', response.status);
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || `HTTP ${response.status}: Failed to load users`;
        } catch {
          errorMessage = `HTTP ${response.status}: Failed to load users`;
        }
        console.error('API Error:', errorMessage);
        setApiError(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      // Handle different possible response structures
      let usersList = [];
      if (Array.isArray(data)) {
        usersList = data;
      } else if (data.users && Array.isArray(data.users)) {
        usersList = data.users;
      } else if (data.results && Array.isArray(data.results)) {
        usersList = data.results;
      } else {
        console.warn('Unexpected API response structure:', data);
        usersList = [];
      }
      
      // Filter out current user
      const filteredUsers = usersList.filter((user: User) => user.id !== currentUser?.id);
      console.log('Filtered users:', filteredUsers);
      setUsers(filteredUsers);
      setApiError(null);
    } catch (error) {
      console.error('Error loading users:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load users";
      setApiError(errorMessage);
      
      // Fallback for demo - use local users
      const filteredUsers = allUsers.filter(user => user.id !== currentUser?.id);
      setUsers(filteredUsers);
      toast.error(`API Error: ${errorMessage}. Using local data.`);
    } finally {
      setIsLoading(false);
    }
  }, [userToken, currentUser?.id]);

  const searchUsers = useCallback(async (query: string) => {
    console.log('searchUsers called with query:', query);
    if (!userToken) {
      setApiError("Authentication required");
      return;
    }

    setIsLoading(true);
    setApiError(null);
    try {
      console.log(`Searching users with query: ${query}`);
      // Use relative URL instead of absolute localhost URL
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Search API Response status:', response.status);

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || `HTTP ${response.status}: Failed to search users`;
        } catch {
          errorMessage = `HTTP ${response.status}: Failed to search users`;
        }
        console.error('Search API Error:', errorMessage);
        setApiError(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Search results:', data);
      
      // Handle different possible response structures
      let usersList = [];
      if (Array.isArray(data)) {
        usersList = data;
      } else if (data.users && Array.isArray(data.users)) {
        usersList = data.users;
      } else if (data.results && Array.isArray(data.results)) {
        usersList = data.results;
      } else {
        console.warn('Unexpected search API response structure:', data);
        usersList = [];
      }
      
      setUsers(usersList);
      setApiError(null);
    } catch (error) {
      console.error('Error searching users:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to search users";
      setApiError(errorMessage);
      
      // Fallback for demo - filter local users
      const filteredUsers = allUsers.filter(user => 
        user.id !== currentUser?.id &&
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setUsers(filteredUsers);
      toast.error(`API Error: ${errorMessage}. Using local data.`);
    } finally {
      setIsLoading(false);
    }
  }, [userToken, currentUser?.id]);

  return {
    users,
    isLoading,
    apiError,
    loadAllUsers,
    searchUsers,
  };
}
