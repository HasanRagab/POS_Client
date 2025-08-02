/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DiscountDto = {
    code: string;
    type: DiscountDto.type;
    value: number;
};
export namespace DiscountDto {
    export enum type {
        PERCENT = 'PERCENT',
        FIXED = 'FIXED',
    }
}

