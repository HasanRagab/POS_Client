/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateLocationDto = {
    name: string;
    /**
     * Auto-generated slug from name and address (can be overridden)
     */
    slug?: string;
    address: string;
    phone?: string;
    email?: string;
    timezone?: string;
};

