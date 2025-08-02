/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateOrgDto = {
    /**
     * The name of the business organization
     */
    businessName: string;
    /**
     * Phone number of the organization
     */
    phone: string;
    /**
     * Email of the super admin
     */
    email: string;
    /**
     * Password for the super admin
     */
    password: string;
    /**
     * Subdomain for the organization
     */
    subdomain: string;
    /**
     * Maximum number of active users allowed for the organization
     */
    maxActiveUsers?: number;
    /**
     * Maximum storage size (in MB) allowed for the organization
     */
    maxStorageSize?: number;
};

