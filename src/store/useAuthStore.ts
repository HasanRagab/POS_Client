import { AuthService, LoginDto, OrganizationsService } from "@/api";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  permissions: string[];
  user: { id: string; name: string } | null;
  login: (data: LoginDto) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  permissions: [],
  user: null,
  login: async (data) => {
    const orgSubdomain = window.location.hostname.split('.')[0];
    const orgId = await OrganizationsService.organizationControllerGetBySubdomain(orgSubdomain)
      .then(res => res.data?.id)
      .catch(() => null);
    const user = await AuthService.loginUser(orgId, data)
    set({ isAuthenticated: true, user });
  },
}));