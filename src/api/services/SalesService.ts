/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { CreateSaleDto } from '../models/CreateSaleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SalesService {
    /**
     * @param requestBody
     * @returns ApiResponse Sale created successfully
     * @throws ApiError
     */
    public static saleControllerCreate(
        requestBody: CreateSaleDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/sales',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id Sale ID for filtering
     * @param customerId Customer ID for filtering
     * @param locationId Location ID for filtering
     * @param createdById Created by user ID for filtering
     * @param startDate Start date for filtering (ISO string)
     * @param endDate End date for filtering (ISO string)
     * @param minTotal Minimum total amount for filtering
     * @param maxTotal Maximum total amount for filtering
     * @param page Page number for pagination
     * @param limit Items per page for pagination
     * @returns ApiResponse List of sales with pagination
     * @throws ApiError
     */
    public static saleControllerFindAll(
        id?: string,
        customerId?: string,
        locationId?: string,
        createdById?: string,
        startDate?: string,
        endDate?: string,
        minTotal?: number,
        maxTotal?: number,
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sales',
            query: {
                'id': id,
                'customerId': customerId,
                'locationId': locationId,
                'createdById': createdById,
                'startDate': startDate,
                'endDate': endDate,
                'minTotal': minTotal,
                'maxTotal': maxTotal,
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * @param id
     * @returns ApiResponse Sale retrieved successfully
     * @throws ApiError
     */
    public static saleControllerFindOne(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sales/{id}',
            path: {
                'id': id,
            },
        });
    }
}
