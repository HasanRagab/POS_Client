/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AlertDto = {
    type: AlertDto.type;
    message: string;
    actionRequired: boolean;
};
export namespace AlertDto {
    export enum type {
        WARNING = 'warning',
        ERROR = 'error',
        INFO = 'info',
    }
}

