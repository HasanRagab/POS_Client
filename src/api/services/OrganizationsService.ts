/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrgDto } from '../models/CreateOrgDto';
import type { OrgServiceResponse } from '../models/OrgServiceResponse';
import type { UpdateOrgDto } from '../models/UpdateOrgDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationsService {
    /**
     * Get org by subdomain
     * @param subdomain
     * @returns OrgServiceResponse Organization found by subdomain
     * @throws ApiError
     */
    public static getOrgBySubdomain(
        subdomain: string,
    ): CancelablePromise<OrgServiceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orgs/{subdomain}',
            path: {
                'subdomain': subdomain,
            },
        });
    }
    /**
     * Get org by current user’s orgId
     * @returns OrgServiceResponse Organization found by ID
     * @throws ApiError
     */
    public static getOrgById(): CancelablePromise<OrgServiceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orgs',
        });
    }
    /**
     * Create a new organization
     * @param requestBody
     * @returns OrgServiceResponse Organization created successfully
     * @throws ApiError
     */
    public static createOrg(
        requestBody: CreateOrgDto,
    ): CancelablePromise<OrgServiceResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orgs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update current user’s organization
     * @param requestBody
     * @returns OrgServiceResponse Organization updated successfully
     * @throws ApiError
     */
    public static updateOrg(
        requestBody: UpdateOrgDto,
    ): CancelablePromise<OrgServiceResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/orgs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Soft delete current user’s organization
     * @returns OrgServiceResponse Organization deleted successfully
     * @throws ApiError
     */
    public static deleteOrg(): CancelablePromise<OrgServiceResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/orgs',
        });
    }
}
