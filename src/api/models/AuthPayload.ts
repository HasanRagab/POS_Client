/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AuthPayload = {
    /**
     * UUID of the organization
     */
    orgId: string;
    /**
     * UUID of the authenticated user
     */
    userId: string;
    /**
     * Email address of the authenticated user
     */
    email: string;
    /**
     * Name of the authenticated user
     */
    name: string;
    /**
     * Global role of the authenticated user
     */
    globalRole: AuthPayload.globalRole;
    /**
     * Array of locations with roles for the authenticated user
     */
    locations: Array<Record<string, any>>;
};
export namespace AuthPayload {
    /**
     * Global role of the authenticated user
     */
    export enum globalRole {
        SUPER_ADMIN = 'SUPER_ADMIN',
        ADMIN = 'ADMIN',
        USER = 'USER',
    }
}

