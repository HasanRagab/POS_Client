/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdjustInventoryDto } from '../models/AdjustInventoryDto';
import type { CreateInventoryLogDto } from '../models/CreateInventoryLogDto';
import type { QueryInventoryDto } from '../models/QueryInventoryDto';
import type { SetInventoryDto } from '../models/SetInventoryDto';
import type { UpdateInventoryDto } from '../models/UpdateInventoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InventoryService {
    /**
     * Get all inventories
     * @param page Page number (starts at 1)
     * @param perPage Items per page
     * @param sortOrder Sort order: asc or desc
     * @param search Search keyword (applies to name, email, etc.)
     * @param offset Skip N items (overrides page/perPage if set)
     * @param limit Limit number of items (overrides perPage if set)
     * @returns any Successfully retrieved inventories
     * @throws ApiError
     */
    public static inventoryControllerFindAllInventories(
        page?: number,
        perPage?: number,
        sortOrder?: string,
        search?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/inventory',
            query: {
                'page': page,
                'perPage': perPage,
                'sortOrder': sortOrder,
                'search': search,
                'offset': offset,
                'limit': limit,
            },
        });
    }
    /**
     * Query inventories with advanced filters
     * @param requestBody
     * @returns any Successfully queried inventories
     * @throws ApiError
     */
    public static inventoryControllerQueryInventories(
        requestBody: QueryInventoryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/inventory/query',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get inventories by location
     * @param locationId
     * @param page Page number (starts at 1)
     * @param perPage Items per page
     * @param sortOrder Sort order: asc or desc
     * @param search Search keyword (applies to name, email, etc.)
     * @param offset Skip N items (overrides page/perPage if set)
     * @param limit Limit number of items (overrides perPage if set)
     * @returns any Successfully retrieved inventories for location
     * @throws ApiError
     */
    public static inventoryControllerFindInventoryByLocation(
        locationId: string,
        page?: number,
        perPage?: number,
        sortOrder?: string,
        search?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/inventory/location/{locationId}',
            path: {
                'locationId': locationId,
            },
            query: {
                'page': page,
                'perPage': perPage,
                'sortOrder': sortOrder,
                'search': search,
                'offset': offset,
                'limit': limit,
            },
        });
    }
    /**
     * Get inventories by product
     * @param productId
     * @returns any Successfully retrieved inventories for product
     * @throws ApiError
     */
    public static inventoryControllerFindInventoryByProduct(
        productId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/inventory/product/{productId}',
            path: {
                'productId': productId,
            },
        });
    }
    /**
     * Update inventory quantity
     * @param requestBody
     * @returns any Inventory updated successfully
     * @throws ApiError
     */
    public static inventoryControllerUpdateInventory(
        requestBody: UpdateInventoryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/inventory/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Adjust inventory quantity
     * @param requestBody
     * @returns any Inventory adjusted successfully
     * @throws ApiError
     */
    public static inventoryControllerAdjustInventory(
        requestBody: AdjustInventoryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/inventory/adjust',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Set inventory quantity
     * @param requestBody
     * @returns any Inventory set successfully
     * @throws ApiError
     */
    public static inventoryControllerSetInventory(
        requestBody: SetInventoryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/inventory/set',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get low stock items
     * @param locationId
     * @param threshold
     * @returns any Successfully retrieved low stock items
     * @throws ApiError
     */
    public static inventoryControllerGetLowStockItems(
        locationId: string,
        threshold: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/inventory/alerts/low-stock',
            query: {
                'locationId': locationId,
                'threshold': threshold,
            },
        });
    }
    /**
     * Get out of stock items
     * @param locationId
     * @returns any Successfully retrieved out of stock items
     * @throws ApiError
     */
    public static inventoryControllerGetOutOfStockItems(
        locationId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/inventory/alerts/out-of-stock',
            query: {
                'locationId': locationId,
            },
        });
    }
    /**
     * Create inventory log
     * @param requestBody
     * @returns any Inventory log created successfully
     * @throws ApiError
     */
    public static inventoryControllerCreateInventoryLog(
        requestBody: CreateInventoryLogDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/inventory/logs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all inventory logs
     * @param page Page number (starts at 1)
     * @param perPage Items per page
     * @param sortOrder Sort order: asc or desc
     * @param search Search keyword (applies to name, email, etc.)
     * @param offset Skip N items (overrides page/perPage if set)
     * @param limit Limit number of items (overrides perPage if set)
     * @returns any Successfully retrieved inventory logs
     * @throws ApiError
     */
    public static inventoryControllerFindAllInventoryLogs(
        page?: number,
        perPage?: number,
        sortOrder?: string,
        search?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/inventory/logs',
            query: {
                'page': page,
                'perPage': perPage,
                'sortOrder': sortOrder,
                'search': search,
                'offset': offset,
                'limit': limit,
            },
        });
    }
    /**
     * Get inventory logs by product
     * @param productId
     * @param page Page number (starts at 1)
     * @param perPage Items per page
     * @param sortOrder Sort order: asc or desc
     * @param search Search keyword (applies to name, email, etc.)
     * @param offset Skip N items (overrides page/perPage if set)
     * @param limit Limit number of items (overrides perPage if set)
     * @returns any Successfully retrieved inventory logs for product
     * @throws ApiError
     */
    public static inventoryControllerFindInventoryLogsByProduct(
        productId: string,
        page?: number,
        perPage?: number,
        sortOrder?: string,
        search?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/inventory/logs/product/{productId}',
            path: {
                'productId': productId,
            },
            query: {
                'page': page,
                'perPage': perPage,
                'sortOrder': sortOrder,
                'search': search,
                'offset': offset,
                'limit': limit,
            },
        });
    }
    /**
     * Get inventory logs by location
     * @param locationId
     * @param page Page number (starts at 1)
     * @param perPage Items per page
     * @param sortOrder Sort order: asc or desc
     * @param search Search keyword (applies to name, email, etc.)
     * @param offset Skip N items (overrides page/perPage if set)
     * @param limit Limit number of items (overrides perPage if set)
     * @returns any Successfully retrieved inventory logs for location
     * @throws ApiError
     */
    public static inventoryControllerFindInventoryLogsByLocation(
        locationId: string,
        page?: number,
        perPage?: number,
        sortOrder?: string,
        search?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/inventory/logs/location/{locationId}',
            path: {
                'locationId': locationId,
            },
            query: {
                'page': page,
                'perPage': perPage,
                'sortOrder': sortOrder,
                'search': search,
                'offset': offset,
                'limit': limit,
            },
        });
    }
}
