/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateInventoryLogDto = {
    /**
     * Product ID
     */
    productId: string;
    /**
     * Location ID
     */
    locationId: string;
    /**
     * Quantity change (positive for increase, negative for decrease)
     */
    change: number;
    /**
     * Quantity before the change
     */
    beforeQuantity?: number;
    /**
     * Quantity after the change
     */
    afterQuantity?: number;
    /**
     * Note about the inventory change
     */
    note?: string;
    /**
     * Reason for inventory change
     */
    reason: CreateInventoryLogDto.reason;
};
export namespace CreateInventoryLogDto {
    /**
     * Reason for inventory change
     */
    export enum reason {
        SALE = 'SALE',
        RETURN = 'RETURN',
        ADJUSTMENT = 'ADJUSTMENT',
        TRANSFER = 'TRANSFER',
    }
}

