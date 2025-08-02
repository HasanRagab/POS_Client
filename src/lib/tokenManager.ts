const TOKEN_STORAGE_KEY = 'auth_token';

/**
 * Token management utilities
 */
export const tokenManager = {
  /**
   * Get the stored token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  /**
   * Store the token
   */
  setToken(token: string): void {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  /**
   * Remove the token from storage
   */
  removeToken(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },

  /**
   * Initialize token from storage (call on app startup)
   */
  initializeToken(): void {
    const token = this.getToken();
    if (token && !this.hasValidToken()) {
      // Remove expired token
      this.removeToken();
    }
  },

  /**
   * Check if a token exists and is not expired
   */
  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Parse JWT token to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // Check if token is expired (with 30 second buffer)
      return payload.exp > currentTime + 30;
    } catch (error) {
      console.error('Error parsing token:', error);
      return false;
    }
  },

  /**
   * Get token payload (decoded JWT)
   */
  getTokenPayload(): Record<string, unknown> | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error parsing token payload:', error);
      return null;
    }
  }
};
