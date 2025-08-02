/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateDiscountDto = {
    name?: string;
    code?: string;
    type?: UpdateDiscountDto.type;
    value?: number;
    appliesAutomatically?: boolean;
    allowStacking?: boolean;
    active?: boolean;
    minPurchaseAmount?: number;
    minQuantity?: number;
    maxUses?: number;
    startAt?: string;
    endAt?: string;
    /**
     * Array of product IDs this discount applies to
     */
    productIds?: Array<string>;
};
export namespace UpdateDiscountDto {
    export enum type {
        PERCENT = 'PERCENT',
        FIXED = 'FIXED',
    }
}

