/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { CreateRoleDto } from '../models/CreateRoleDto';
import type { UpdateRoleDto } from '../models/UpdateRoleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RolesService {
    /**
     * @param requestBody
     * @returns ApiResponse Role created successfully
     * @throws ApiError
     */
    public static roleControllerCreate(
        requestBody: CreateRoleDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/roles',
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
     * @returns ApiResponse List of roles
     * @throws ApiError
     */
    public static roleControllerFindAll(
        page?: number,
        perPage?: number,
        sortOrder?: string,
        search?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/roles',
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
     * @returns ApiResponse Role found
     * @throws ApiError
     */
    public static roleControllerFindOne(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/roles/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponse Role updated successfully
     * @throws ApiError
     */
    public static roleControllerUpdate(
        id: string,
        requestBody: UpdateRoleDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/roles/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponse Role deleted successfully
     * @throws ApiError
     */
    public static roleControllerRemove(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/roles/{id}',
            path: {
                'id': id,
            },
        });
    }
}
