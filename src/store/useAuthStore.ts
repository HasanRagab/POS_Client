import { AuthService, LoginDto, OrganizationsService } from "@/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentSubdomain, isOrganizationSubdomain } from "@/lib/subdomain";
import { tokenManager } from "@/lib/tokenManager";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  permissions: string[];
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginDto) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      permissions: [],
      user: null,
      isLoading: false,
      error: null,

      login: async (data: LoginDto) => {
        try {
          set({ isLoading: true, error: null });

          const orgSubdomain = getCurrentSubdomain();

          // Check if we're on an organization subdomain
          if (!isOrganizationSubdomain()) {
            throw new Error(
              "Please access your organization's subdomain to login"
            );
          }

          const org = await OrganizationsService.getOrgBySubdomain(
            orgSubdomain
          );

          if (!org.id) {
            throw new Error(
              `Organization "${orgSubdomain}" not found. Please check your subdomain or contact support.`
            );
          }

          const user = await AuthService.loginUser(org.id, data);

          if (!user) {
            throw new Error("Invalid response from server");
          }

          // Store the authentication token
          if (user.accessToken) {
            tokenManager.setToken(user.accessToken);
          }

          set({
            isAuthenticated: true,
            user: {
              id: user.userId,
              name: user.name,
              email: user.email,
              role: user.globalRole,
            },
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error:
              (error as Error).message ||
              "Login failed. Please check your credentials.",
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      logout: () => {
        // Clear the authentication token
        tokenManager.removeToken();
        
        set({
          isAuthenticated: false,
          user: null,
          permissions: [],
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      checkAuth: async () => {
        try {
          // First check if we have a valid token
          if (!tokenManager.hasValidToken()) {
            set({ isAuthenticated: false, user: null });
            return;
          }

          // Try to get current user with the token
          const currentUser = await AuthService.getCurrentUser();
          if (currentUser) {
            set({
              isAuthenticated: true,
              user: {
                id: currentUser.userId,
                name: currentUser.name,
                email: currentUser.email,
                role: currentUser.globalRole,
              },
              error: null,
            });
          } else {
            // If getCurrentUser fails, clear auth state
            tokenManager.removeToken();
            set({ isAuthenticated: false, user: null });
          }
        } catch (error) {
          // If token is invalid or expired, clear auth state
          console.error('Auth check failed:', error);
          tokenManager.removeToken();
          set({ isAuthenticated: false, user: null });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        permissions: state.permissions,
      }),
    }
  )
);
