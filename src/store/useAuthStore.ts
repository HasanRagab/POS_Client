import { AuthService, LoginDto } from "@/api";
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
    const user = await AuthService.loginUser(data);
    set({ isAuthenticated: true, user });
  },
}));