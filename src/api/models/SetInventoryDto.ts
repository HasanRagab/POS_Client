/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SetInventoryDto = {
    /**
     * Product ID
     */
    productId: string;
    /**
     * Location ID
     */
    locationId: string;
    /**
     * New quantity to set
     */
    quantity: number;
    /**
     * Reason for setting the inventory
     */
    reason: SetInventoryDto.reason;
    /**
     * Note about the inventory change
     */
    note?: string;
};
export namespace SetInventoryDto {
    /**
     * Reason for setting the inventory
     */
    export enum reason {
        SALE = 'SALE',
        RETURN = 'RETURN',
        ADJUSTMENT = 'ADJUSTMENT',
        TRANSFER = 'TRANSFER',
    }
}

