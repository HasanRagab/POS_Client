import { OrganizationsService } from "@/api";
import { create } from "zustand";

interface OrgState {
  org: { id: string; businessName: string; subdomain: string } | null;
  getOrgBySubdomain: (subdomain: string) => Promise<void>;
}

export const useOrgStore = create<OrgState>((set) => ({
  org: null,
  getOrgBySubdomain: async (subdomain) => {
    try {
      const res = await OrganizationsService.organizationControllerGetBySubdomain(subdomain);
      set({ org: res.data });
    } catch (error) {
      console.error("Failed to fetch organization:", error);
      set({ org: null });
    }
  },
}));
