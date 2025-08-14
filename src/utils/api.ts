import axios, { AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for better error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const responseData = error.response.data;
      let message = `HTTP error! status: ${error.response.status}`;
      
      if (responseData && typeof responseData === 'object') {
        message = (responseData as any)?.message || message;
      } else if (typeof responseData === 'string') {
        message = responseData;
      }
      
      throw new ApiError(error.response.status, message);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error - no response received:', error.request);
      throw new ApiError(0, 'Network error: Unable to connect to server. Please check if the server is running.');
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      throw new ApiError(0, error.message || 'Unknown error occurred');
    }
  }
);

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiRequest = async (
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<any> => {
  try {
    console.log(`Making API request to: ${API_BASE_URL}${endpoint}`);
    
    const response = await apiClient({
      url: endpoint,
      method: options.method || 'GET',
      data: options.data,
      headers: options.headers,
    });
    
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    // Error is already handled by interceptor
    throw error;
  }
};

// Auth API functions
export const authApi = {
  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      data: userData,
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      data: credentials,
    });
  },

  refreshToken: async (refreshToken: string) => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
      data: { refresh_token: refreshToken },
    });
  },

  getCurrentUser: async (token: string) => {
    return apiRequest('/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};