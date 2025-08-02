/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @param requestBody
     * @returns ApiResponse User created successfully
     * @throws ApiError
     */
    public static userControllerCreate(
        requestBody: CreateUserDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users',
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
     * @returns ApiResponse List of users
     * @throws ApiError
     */
    public static userControllerFindAll(
        page?: number,
        perPage?: number,
        sortOrder?: string,
        search?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users',
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
     * @returns ApiResponse User found
     * @throws ApiError
     */
    public static userControllerFindOne(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponse User updated successfully
     * @throws ApiError
     */
    public static userControllerUpdate(
        id: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponse User deleted successfully
     * @throws ApiError
     */
    public static userControllerRemove(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
        });
    }
}
