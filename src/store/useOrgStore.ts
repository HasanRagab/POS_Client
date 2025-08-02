import { OrganizationsService } from "@/api";
import { create } from "zustand";

interface Organization {
  id: string;
  name: string;
  subdomain: string;
}

interface OrgState {
  org: Organization | null;
  getOrgBySubdomain: (subdomain: string) => Promise<void>;
}

export const useOrgStore = create<OrgState>((set) => ({
  org: null,
  getOrgBySubdomain: async (subdomain) => {
    try {
      const res = await OrganizationsService.getOrgBySubdomain(subdomain);
      if (res) {
        set({ 
          org: {
            id: res.id,
            name: res.businessName,
            subdomain: res.subdomain
          }
        });
      } else {
        set({ org: null });
      }
    } catch (error) {
      console.error("Failed to fetch organization:", error);
      set({ org: null });
    }
  },
}));
