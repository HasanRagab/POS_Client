/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QueryInventoryDto = {
    /**
     * Product ID for filtering
     */
    productId?: string;
    /**
     * Location ID for filtering
     */
    locationId?: string;
    /**
     * Minimum quantity for filtering
     */
    minQuantity?: number;
    /**
     * Maximum quantity for filtering
     */
    maxQuantity?: number;
    /**
     * Search term for product name or SKU
     */
    search?: string;
    /**
     * Show only low stock items
     */
    lowStockOnly?: boolean;
    /**
     * Show only out of stock items
     */
    outOfStockOnly?: boolean;
    /**
     * Page number for pagination
     */
    page?: number;
    /**
     * Items per page for pagination
     */
    limit?: number;
};

