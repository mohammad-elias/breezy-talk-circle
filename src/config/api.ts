
// Central API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
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
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function for API requests with auth
export const apiRequest = async (
  endpoint: string, 
  options: RequestInit & { token?: string }
): Promise<Response> => {
  const { token, ...fetchOptions } = options;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...fetchOptions.headers,
  };

  return fetch(buildApiUrl(endpoint), {
    ...fetchOptions,
    headers,
  });
};
