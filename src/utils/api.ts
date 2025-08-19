import axios, { AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

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
    if (error.response) {
      // Server responded with error status
      const message = (error.response.data as any)?.message || 
                     `HTTP error! status: ${error.response.status}`;
      throw new ApiError(error.response.status, message);
    } else if (error.request) {
      // Request was made but no response received
      throw new ApiError(0, 'Network error or server unavailable');
    } else {
      // Something else happened
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
    const response = await apiClient({
      url: endpoint,
      method: options.method || 'GET',
      data: options.data,
      headers: options.headers,
    });
    
    return response.data;
  } catch (error) {
    // Error is already handled by interceptor
    throw error;
  }
};

// Auth API functions
export const authApi = {
  register: async (userData: {
    email: string;
    password: string;
    // Optional fields that may be provided later during onboarding
    firstName?: string;
    lastName?: string;
    role?: string;
  }) => {
    return apiRequest('/api/auth/register', {
      method: 'POST',
      data: userData,
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      data: credentials,
    });
  },

  refreshToken: async (refreshToken: string) => {
    return apiRequest('/api/auth/refresh', {
      method: 'POST',
      data: { refresh_token: refreshToken },
    });
  },

  getCurrentUser: async (token: string) => {
    return apiRequest('/api/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Applications API
export const applicationsApi = {
  // Public application submission (multipart/form-data)
  submitPublic: async (formData: FormData) => {
    return apiClient.post('/api/applications/public', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data);
  },
};