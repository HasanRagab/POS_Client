/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateUserDto = {
    /**
     * Full name of the user
     */
    name: string;
    /**
     * User email address
     */
    email: string;
    /**
     * User phone number
     */
    phone?: string;
    /**
     * User password
     */
    password: string;
    /**
     * Global role of the user
     */
    globalRole?: CreateUserDto.globalRole;
    /**
     * Indicates if the user is active
     */
    active?: boolean;
};
export namespace CreateUserDto {
    /**
     * Global role of the user
     */
    export enum globalRole {
        SUPER_ADMIN = 'SUPER_ADMIN',
        ADMIN = 'ADMIN',
        USER = 'USER',
    }
}

