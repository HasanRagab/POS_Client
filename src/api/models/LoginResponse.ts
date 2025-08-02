/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LoginResponse = {
    /**
     * JWT access token for authenticated requests
     */
    accessToken: string;
    /**
     * UUID of the logged-in user
     */
    userId: string;
    /**
     * Name of the logged-in user
     */
    name: string;
    /**
     * Global role of the logged-in user
     */
    globalRole: LoginResponse.globalRole;
    /**
     * UUID of the organization the user belongs to
     */
    orgId: string;
    /**
     * Email address of the logged-in user
     */
    email: string;
};
export namespace LoginResponse {
    /**
     * Global role of the logged-in user
     */
    export enum globalRole {
        SUPER_ADMIN = 'SUPER_ADMIN',
        ADMIN = 'ADMIN',
        USER = 'USER',
    }
}

