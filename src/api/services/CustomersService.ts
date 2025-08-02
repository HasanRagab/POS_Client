/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { CreateCustomerDto } from '../models/CreateCustomerDto';
import type { UpdateCustomerDto } from '../models/UpdateCustomerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomersService {
    /**
     * @param requestBody
     * @returns ApiResponse Customer created successfully
     * @throws ApiError
     */
    public static customerControllerCreate(
        requestBody: CreateCustomerDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/customers',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id Customer ID for filtering
     * @param name Customer name for filtering
     * @param email Customer email for filtering
     * @param phone Customer phone for filtering
     * @param includeDeleted Include deleted customers
     * @returns ApiResponse List of customers
     * @throws ApiError
     */
    public static customerControllerFindAll(
        id?: string,
        name?: string,
        email?: string,
        phone?: string,
        includeDeleted: boolean = false,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customers',
            query: {
                'id': id,
                'name': name,
                'email': email,
                'phone': phone,
                'includeDeleted': includeDeleted,
            },
        });
    }
    /**
     * @param id
     * @returns ApiResponse Customer retrieved successfully
     * @throws ApiError
     */
    public static customerControllerFindOne(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/customers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponse Customer updated successfully
     * @throws ApiError
     */
    public static customerControllerUpdate(
        id: string,
        requestBody: UpdateCustomerDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/customers/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static customerControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/customers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns ApiResponse Customer restored successfully
     * @throws ApiError
     */
    public static customerControllerRestore(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/customers/{id}/restore',
            path: {
                'id': id,
            },
        });
    }
}
