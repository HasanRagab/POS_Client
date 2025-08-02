/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { BulkProductDeleteDto } from '../models/BulkProductDeleteDto';
import type { BulkProductImportDto } from '../models/BulkProductImportDto';
import type { BulkProductUpdateDto } from '../models/BulkProductUpdateDto';
import type { CreateProductDto } from '../models/CreateProductDto';
import type { CreateProductVariantDto } from '../models/CreateProductVariantDto';
import type { ProductLocationPricingDto } from '../models/ProductLocationPricingDto';
import type { ProductSearchDto } from '../models/ProductSearchDto';
import type { UpdateProductDto } from '../models/UpdateProductDto';
import type { UpdateProductLocationPricingDto } from '../models/UpdateProductLocationPricingDto';
import type { UpdateProductVariantDto } from '../models/UpdateProductVariantDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * @param requestBody
     * @returns ApiResponse Product created successfully
     * @throws ApiError
     */
    public static productControllerCreate(
        requestBody: CreateProductDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param page Page number (starts at 1)
     * @param perPage Items per page
     * @param sortOrder Sort order: asc or desc
     * @param search Search keyword (applies to name, email, etc.)
     * @param offset Skip N items (overrides page/perPage if set)
     * @param limit Limit number of items (overrides perPage if set)
     * @returns ApiResponse List of products
     * @throws ApiError
     */
    public static productControllerFindAll(
        page?: number,
        perPage?: number,
        sortOrder?: string,
        search?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products',
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
     * @param id
     * @returns ApiResponse Product found
     * @throws ApiError
     */
    public static productControllerFindOne(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponse Product updated successfully
     * @throws ApiError
     */
    public static productControllerUpdate(
        id: string,
        requestBody: UpdateProductDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponse Product deleted successfully
     * @throws ApiError
     */
    public static productControllerRemove(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponse Product search results
     * @throws ApiError
     */
    public static productControllerSearch(
        requestBody: ProductSearchDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products/search',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id Parent product ID
     * @param requestBody
     * @returns ApiResponse Product variant created successfully
     * @throws ApiError
     */
    public static productControllerCreateVariant(
        id: string,
        requestBody: CreateProductVariantDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products/{id}/variants',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id Parent product ID
     * @returns ApiResponse Product variants retrieved successfully
     * @throws ApiError
     */
    public static productControllerGetVariants(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/{id}/variants',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param variantId
     * @param requestBody
     * @returns ApiResponse Product variant updated successfully
     * @throws ApiError
     */
    public static productControllerUpdateVariant(
        variantId: string,
        requestBody: UpdateProductVariantDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/products/variants/{variantId}',
            path: {
                'variantId': variantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param variantId
     * @returns ApiResponse Product variant deleted successfully
     * @throws ApiError
     */
    public static productControllerDeleteVariant(
        variantId: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/products/variants/{variantId}',
            path: {
                'variantId': variantId,
            },
        });
    }
    /**
     * @param id Product ID
     * @param locationId Location ID
     * @param requestBody
     * @returns ApiResponse Location pricing set successfully
     * @throws ApiError
     */
    public static productControllerSetLocationPricing(
        id: string,
        locationId: string,
        requestBody: ProductLocationPricingDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/products/{id}/locations/{locationId}/pricing',
            path: {
                'id': id,
                'locationId': locationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id Product ID
     * @param locationId Location ID
     * @param requestBody
     * @returns ApiResponse Location pricing updated successfully
     * @throws ApiError
     */
    public static productControllerUpdateLocationPricing(
        id: string,
        locationId: string,
        requestBody: UpdateProductLocationPricingDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/products/{id}/locations/{locationId}/pricing',
            path: {
                'id': id,
                'locationId': locationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id Product ID
     * @param locationId Location ID
     * @returns ApiResponse Location pricing deleted successfully
     * @throws ApiError
     */
    public static productControllerDeleteLocationPricing(
        id: string,
        locationId: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/products/{id}/locations/{locationId}/pricing',
            path: {
                'id': id,
                'locationId': locationId,
            },
        });
    }
    /**
     * @param id Product ID
     * @param locationId Specific location ID
     * @returns ApiResponse Location pricing retrieved successfully
     * @throws ApiError
     */
    public static productControllerGetLocationPricing(
        id: string,
        locationId?: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/{id}/locations/pricing',
            path: {
                'id': id,
            },
            query: {
                'locationId': locationId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponse Products imported successfully
     * @throws ApiError
     */
    public static productControllerBulkImport(
        requestBody: BulkProductImportDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products/bulk/import',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponse Products updated successfully
     * @throws ApiError
     */
    public static productControllerBulkUpdate(
        requestBody: BulkProductUpdateDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/products/bulk/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponse Products deleted successfully
     * @throws ApiError
     */
    public static productControllerBulkDelete(
        requestBody: BulkProductDeleteDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/products/bulk/delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id Product ID
     * @param locationId Specific location ID
     * @returns ApiResponse Product analytics retrieved successfully
     * @throws ApiError
     */
    public static productControllerGetAnalytics(
        id: string,
        locationId?: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/{id}/analytics',
            path: {
                'id': id,
            },
            query: {
                'locationId': locationId,
            },
        });
    }
}
