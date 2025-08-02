/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AdjustInventoryDto = {
    /**
     * Product ID
     */
    productId: string;
    /**
     * Location ID
     */
    locationId: string;
    /**
     * Quantity adjustment (positive for increase, negative for decrease)
     */
    adjustment: number;
    /**
     * Reason for the inventory adjustment
     */
    reason: AdjustInventoryDto.reason;
    /**
     * Note about the inventory adjustment
     */
    note?: string;
};
export namespace AdjustInventoryDto {
    /**
     * Reason for the inventory adjustment
     */
    export enum reason {
        SALE = 'SALE',
        RETURN = 'RETURN',
        ADJUSTMENT = 'ADJUSTMENT',
        TRANSFER = 'TRANSFER',
    }
}

