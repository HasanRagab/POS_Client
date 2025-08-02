import { OpenAPI } from '@/api/core/OpenAPI';
import { tokenManager } from './tokenManager';
import { getCurrentSubdomain, isOrganizationSubdomain } from './subdomain';

/**
 * Setup API configuration for token handling
 */
export const setupApiConfig = () => {
  // Set the base URL if needed
  // OpenAPI.BASE = process.env.VITE_API_BASE_URL || '';

  // Set up token resolver function
  OpenAPI.TOKEN = async () => {
    const token = tokenManager.getToken();
    
    // Check if token is valid before returning it
    if (token && tokenManager.hasValidToken()) {
      return token;
    }
    
    // If token is invalid, remove it and return empty string
    if (token && !tokenManager.hasValidToken()) {
      tokenManager.removeToken();
    }
    
    return '';
  };

  // Set up headers resolver for additional headers
  OpenAPI.HEADERS = async () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add organization header if we're on a subdomain
    try {
      if (isOrganizationSubdomain()) {
        const subdomain = getCurrentSubdomain();
        if (subdomain) {
          headers['x-org-subdomain'] = subdomain;
        }
      }
    } catch (error) {
      console.debug('Could not add org header:', error);
    }

    return headers;
  };
};

/**
 * Initialize API configuration
 */
export const initializeApi = () => {
  setupApiConfig();
  
  // Initialize token from storage
  tokenManager.initializeToken();
};

/**
 * Handle API authentication errors
 */
export const handleAuthError = (error: { status?: number }) => {
  if (error.status === 401) {
    console.warn('Authentication failed, clearing token');
    tokenManager.removeToken();
    
    // Redirect to login if not already there
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }
};
