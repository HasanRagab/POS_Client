/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { CreateTaxDto } from '../models/CreateTaxDto';
import type { UpdateTaxDto } from '../models/UpdateTaxDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TaxesService {
    /**
     * @param requestBody
     * @returns ApiResponse Tax created successfully
     * @throws ApiError
     */
    public static taxControllerCreate(
        requestBody: CreateTaxDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/taxes',
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
     * @returns ApiResponse List of taxes
     * @throws ApiError
     */
    public static taxControllerFindAll(
        page?: number,
        perPage?: number,
        sortOrder?: string,
        search?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/taxes',
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
     * @returns ApiResponse Tax found
     * @throws ApiError
     */
    public static taxControllerFindOne(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/taxes/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponse Tax updated successfully
     * @throws ApiError
     */
    public static taxControllerUpdate(
        id: string,
        requestBody: UpdateTaxDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/taxes/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponse Tax deleted successfully
     * @throws ApiError
     */
    public static taxControllerRemove(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/taxes/{id}',
            path: {
                'id': id,
            },
        });
    }
}
