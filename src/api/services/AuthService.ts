/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthPayload } from '../models/AuthPayload';
import type { LoginDto } from '../models/LoginDto';
import type { LoginResponse } from '../models/LoginResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Login user and return access token
     * @param xOrgId Organization ID for tenant resolution
     * @param requestBody
     * @returns LoginResponse User logged in successfully
     * @throws ApiError
     */
    public static loginUser(
        xOrgId: string,
        requestBody: LoginDto,
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            headers: {
                'x-org-id': xOrgId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Return the current authenticated user
     * @returns AuthPayload Get current user data
     * @throws ApiError
     */
    public static getCurrentUser(): CancelablePromise<AuthPayload> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/whoami',
        });
    }
}
