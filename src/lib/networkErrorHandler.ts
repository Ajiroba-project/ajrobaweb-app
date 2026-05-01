import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// Track online/offline status
let isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    isOnline = true;
    toast.success('Connection restored', { autoClose: 2000 });
  });
  
  window.addEventListener('offline', () => {
    isOnline = false;
    toast.error('Connection lost. Please check your internet.', { 
      autoClose: false,
      toastId: 'network-offline'
    });
  });
}

// Network error messages
const NETWORK_ERROR_MESSAGES: Record<string, string> = {
  'Network Error': 'Unable to connect to server. Please check your internet connection.',
  'ECONNABORTED': 'Request timed out. Please try again.',
  'ETIMEDOUT': 'Connection timed out. Server may be busy.',
  'ENOTFOUND': 'Server not found. Please try again later.',
  'ECONNREFUSED': 'Connection refused. Server may be down.',
};

// HTTP status code messages
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'Bad request. Please check your input.',
  401: 'Session expired. Please log in again.',
  403: 'Access denied. You don\'t have permission.',
  404: 'Resource not found.',
  408: 'Request timeout. Please try again.',
  409: 'Conflict. Resource may already exist.',
  422: 'Validation error. Please check your input.',
  429: 'Too many requests. Please wait a moment.',
  500: 'Server error. Please try again later.',
  502: 'Server unavailable. Please try again later.',
  503: 'Service unavailable. Server may be down.',
  504: 'Gateway timeout. Please try again later.',
};

export interface NetworkErrorHandlerOptions {
  /** Show toast notification for errors */
  showToast?: boolean;
  /** Log to console.error (set false for background polling / cart, etc.) */
  logError?: boolean;
  /** Custom error message to display */
  customMessage?: string;
  /** Whether to retry the request */
  shouldRetry?: boolean;
  /** Maximum number of retries */
  maxRetries?: number;
  /** Retry delay in milliseconds */
  retryDelay?: number;
  /** Callback when error occurs */
  onError?: (error: AxiosError) => void;
  /** Callback when request succeeds after retry */
  onSuccess?: (response: AxiosResponse) => void;
}

/**
 * Handle network errors with appropriate user feedback
 */
export function handleNetworkError(
  error: AxiosError, 
  options: NetworkErrorHandlerOptions = {}
): { message: string; shouldRetry: boolean; isRetryable: boolean } {
  const { showToast = true, logError = true, customMessage, onError } = options;
  
  let message = customMessage || 'An unexpected error occurred';
  let isRetryable = false;
  let shouldRetry = false;

  // Check if it's a network error (no response from server)
  if (!error.response) {
    // Check specific error codes
    const errorCode = (error as any).code;
    
    if (errorCode && NETWORK_ERROR_MESSAGES[errorCode]) {
      message = NETWORK_ERROR_MESSAGES[errorCode];
    } else if (error.message?.includes('Network Error')) {
      message = NETWORK_ERROR_MESSAGES['Network Error'];
    } else {
      message = 'Network connection failed. Please check your internet.';
    }
    
    isRetryable = true;
    shouldRetry = options.shouldRetry ?? true;
  } else {
    // HTTP error with response
    const status = error.response.status;
    const responseData = error.response.data as any;
    const serverMessage = responseData?.message || 
                         responseData?.error || 
                         responseData?.detail;
    
    message = serverMessage || HTTP_ERROR_MESSAGES[status] || `Error ${status}: Request failed`;
    
    // Retry only on 5xx errors and specific 4xx errors
    isRetryable = status >= 500 || status === 408 || status === 429;
    shouldRetry = isRetryable && (options.shouldRetry ?? false);
  }

  // Show toast notification
  if (showToast) {
    toast.error(message, {
      toastId: `network-error-${Date.now()}`,
      autoClose: isRetryable ? 5000 : 3000,
    });
  }

  // Call error callback
  if (onError) {
    onError(error);
  }

  if (logError) {
    console.error('[Network Error]', {
      message: error.message,
      code: (error as any).code,
      status: error.response?.status,
      url: error.config?.url,
      timestamp: new Date().toISOString(),
    });
  }

  return { message, shouldRetry, isRetryable };
}

/**
 * Create an axios instance with automatic error handling
 */
export function createAxiosInstance(config?: AxiosRequestConfig): AxiosInstance {
  const instance = axios.create({
    timeout: 30000, // 30 second default timeout
    ...config,
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = Cookies.get('token');
      if (token && config.headers) {
        config.headers.Authorization = `token ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: number };
      
      if (!originalRequest) {
        return Promise.reject(error);
      }

      // Initialize retry count
      if (originalRequest._retry === undefined) {
        originalRequest._retry = 0;
      }

      const maxRetries = 3;
      const { isRetryable, shouldRetry } = handleNetworkError(error, { 
        showToast: originalRequest._retry === 0 // Only show toast on first failure
      });

      // Retry logic
      if (isRetryable && shouldRetry && originalRequest._retry < maxRetries) {
        originalRequest._retry++;
        
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, originalRequest._retry - 1) * 1000;
        
        console.log(`[Network] Retrying request (${originalRequest._retry}/${maxRetries}) after ${delay}ms...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return instance(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

/**
 * Wrapper for API calls with automatic retry and error handling
 */
export async function apiCallWithRetry<T>(
  call: () => Promise<T>,
  options: NetworkErrorHandlerOptions = {}
): Promise<T | null> {
  const { maxRetries = 3, retryDelay = 1000, onError, onSuccess } = options;
  let lastError: AxiosError | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await call();
      
      if (attempt > 0) {
        toast.success('Request succeeded after retry!', { autoClose: 2000 });
      }
      
      if (onSuccess) {
        onSuccess(result as AxiosResponse);
      }
      
      return result;
    } catch (error) {
      lastError = error as AxiosError;
      
      const isLastAttempt = attempt === maxRetries;
      const { isRetryable } = handleNetworkError(lastError, {
        showToast: isLastAttempt, // Only show toast on final failure
        ...options,
        shouldRetry: !isLastAttempt && options.shouldRetry !== false,
      });

      if (isLastAttempt || !isRetryable) {
        break;
      }

      // Wait before retrying
      const delay = retryDelay * Math.pow(2, attempt);
      console.log(`[API Retry] Attempt ${attempt + 1}/${maxRetries + 1} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  if (onError && lastError) {
    onError(lastError);
  }

  return null;
}

/**
 * Check if the app is currently online
 */
export function getNetworkStatus(): { isOnline: boolean; wasOffline: boolean } {
  return { 
    isOnline, 
    wasOffline: !isOnline 
  };
}

/**
 * Debounce function for network requests
 */
export function debounceNetworkRequest<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default {
  handleNetworkError,
  createAxiosInstance,
  apiCallWithRetry,
  getNetworkStatus,
  debounceNetworkRequest,
};
