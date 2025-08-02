/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { CreateReturnDto } from '../models/CreateReturnDto';
import type { UpdateReturnDto } from '../models/UpdateReturnDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReturnsService {
    /**
     * Create a new return
     * @param requestBody
     * @returns ApiResponse Return created successfully
     * @throws ApiError
     */
    public static returnControllerCreate(
        requestBody: CreateReturnDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/returns',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all returns with pagination and filtering
     * @param saleId
     * @param customerEmail
     * @param startDate
     * @param endDate
     * @param minRefundAmount
     * @param maxRefundAmount
     * @param reason
     * @param restockable
     * @param processedBy
     * @param search
     * @param sortBy
     * @param sortOrder
     * @param page
     * @param limit
     * @returns ApiResponse Returns retrieved successfully
     * @throws ApiError
     */
    public static returnControllerFindAll(
        saleId?: string,
        customerEmail?: string,
        startDate?: string,
        endDate?: string,
        minRefundAmount?: number,
        maxRefundAmount?: number,
        reason?: 'DAMAGED' | 'CUSTOMER_REQUEST' | 'WRONG_ITEM' | 'OTHER',
        restockable?: boolean,
        processedBy?: string,
        search?: string,
        sortBy?: 'createdAt' | 'refundAmount' | 'saleId',
        sortOrder?: 'asc' | 'desc',
        page?: number,
        limit?: number,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/returns',
            query: {
                'saleId': saleId,
                'customerEmail': customerEmail,
                'startDate': startDate,
                'endDate': endDate,
                'minRefundAmount': minRefundAmount,
                'maxRefundAmount': maxRefundAmount,
                'reason': reason,
                'restockable': restockable,
                'processedBy': processedBy,
                'search': search,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get return statistics
     * @param saleId
     * @param customerEmail
     * @param startDate
     * @param endDate
     * @param minRefundAmount
     * @param maxRefundAmount
     * @param reason
     * @param restockable
     * @param processedBy
     * @param search
     * @param sortBy
     * @param sortOrder
     * @param page
     * @param limit
     * @returns ApiResponse Return statistics retrieved successfully
     * @throws ApiError
     */
    public static returnControllerGetStats(
        saleId?: string,
        customerEmail?: string,
        startDate?: string,
        endDate?: string,
        minRefundAmount?: number,
        maxRefundAmount?: number,
        reason?: 'DAMAGED' | 'CUSTOMER_REQUEST' | 'WRONG_ITEM' | 'OTHER',
        restockable?: boolean,
        processedBy?: string,
        search?: string,
        sortBy?: 'createdAt' | 'refundAmount' | 'saleId',
        sortOrder?: 'asc' | 'desc',
        page?: number,
        limit?: number,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/returns/stats',
            query: {
                'saleId': saleId,
                'customerEmail': customerEmail,
                'startDate': startDate,
                'endDate': endDate,
                'minRefundAmount': minRefundAmount,
                'maxRefundAmount': maxRefundAmount,
                'reason': reason,
                'restockable': restockable,
                'processedBy': processedBy,
                'search': search,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get a return by ID
     * @param id Return ID
     * @returns ApiResponse Return retrieved successfully
     * @throws ApiError
     */
    public static returnControllerFindOne(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/returns/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a return
     * @param id Return ID
     * @param requestBody
     * @returns ApiResponse Return updated successfully
     * @throws ApiError
     */
    public static returnControllerUpdate(
        id: string,
        requestBody: UpdateReturnDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/returns/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a return
     * @param id Return ID
     * @returns ApiResponse Return deleted successfully
     * @throws ApiError
     */
    public static returnControllerRemove(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/returns/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Process refund for a return
     * @param id Return ID
     * @returns ApiResponse Refund processed successfully
     * @throws ApiError
     */
    public static returnControllerProcessRefund(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/returns/{id}/process-refund',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Validate return data before processing
     * @param requestBody
     * @returns ApiResponse Return validation completed
     * @throws ApiError
     */
    public static returnControllerValidateReturn(
        requestBody: CreateReturnDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/returns/validate-return',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Process multiple returns in bulk
     * @param requestBody
     * @returns ApiResponse Bulk processing completed
     * @throws ApiError
     */
    public static returnControllerBulkProcess(
        requestBody: {
            /**
             * Array of return IDs to process
             */
            returnIds?: Array<string>;
        },
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/returns/bulk-process',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
