/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { CreateLocationDto } from '../models/CreateLocationDto';
import type { UpdateLocationDto } from '../models/UpdateLocationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocationsService {
    /**
     * @param requestBody
     * @returns ApiResponse Location created successfully
     * @throws ApiError
     */
    public static locationControllerCreate(
        requestBody: CreateLocationDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/locations',
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
     * @returns ApiResponse List of locations
     * @throws ApiError
     */
    public static locationControllerFindAll(
        page?: number,
        perPage?: number,
        sortOrder?: string,
        search?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/locations',
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
     * @returns ApiResponse Location found
     * @throws ApiError
     */
    public static locationControllerFindOne(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/locations/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponse Location updated successfully
     * @throws ApiError
     */
    public static locationControllerUpdate(
        id: string,
        requestBody: UpdateLocationDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/locations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponse Location deleted successfully
     * @throws ApiError
     */
    public static locationControllerRemove(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/locations/{id}',
            path: {
                'id': id,
            },
        });
    }
}
