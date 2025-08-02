/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { CreateOrgDto } from '../models/CreateOrgDto';
import type { UpdateOrgDto } from '../models/UpdateOrgDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationsService {
    /**
     * @param subdomain
     * @returns ApiResponse Organization found by subdomain
     * @throws ApiError
     */
    public static organizationControllerGetBySubdomain(
        subdomain: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orgs/{subdomain}',
            path: {
                'subdomain': subdomain,
            },
        });
    }
    /**
     * @returns ApiResponse Organization found by ID
     * @throws ApiError
     */
    public static organizationControllerGetById(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orgs',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponse Organization created successfully
     * @throws ApiError
     */
    public static organizationControllerCreate(
        requestBody: CreateOrgDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orgs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponse Organization updated successfully
     * @throws ApiError
     */
    public static organizationControllerUpdate(
        requestBody: UpdateOrgDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/orgs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ApiResponse Organization deleted successfully
     * @throws ApiError
     */
    public static organizationControllerRemove(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/orgs',
        });
    }
}
