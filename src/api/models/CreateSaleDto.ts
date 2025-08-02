/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSaleItemDto } from './CreateSaleItemDto';
export type CreateSaleDto = {
    /**
     * Location ID where the sale is made
     */
    locationId: string;
    /**
     * Customer ID (optional for walk-in customers)
     */
    customerId?: string;
    /**
     * Sale items
     */
    items: Array<CreateSaleItemDto>;
    /**
     * Global discount amount for the entire sale (optional)
     */
    globalDiscount?: number;
    /**
     * Notes for the sale (optional)
     */
    notes?: string;
};

