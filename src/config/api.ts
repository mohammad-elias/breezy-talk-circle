
// Simple API configuration using environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

// Simple helper to build API URLs (like NEXT_PUBLIC_URL pattern)
export const getApiUrl = (path: string): string => {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

// Common API endpoints
export const API_ENDPOINTS = {
  USERS: '/api/users',
  USERS_SEARCH: '/api/users/search',
  USERS_BATCH: '/api/users/batch',
  CONNECTIONS: '/api/connections',
  CONNECTIONS_REQUEST: '/api/connections/request',
  CONNECTIONS_ACCEPT: '/api/connections/accept',
  CONNECTIONS_DECLINE: '/api/connections/decline',
  CONNECTIONS_CANCEL: '/api/connections/cancel',
  MESSAGES: '/api/messages',
  CALLS_START: '/api/calls/start',
  CHATS_ARCHIVED: '/api/chats/archived',
};

// Helper for authenticated requests
export const apiRequest = async (
  path: string, 
  options: RequestInit & { token?: string }
): Promise<Response> => {
  const { token, ...fetchOptions } = options;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...fetchOptions.headers,
  };

  return fetch(getApiUrl(path), {
    ...fetchOptions,
    headers,
  });
};
