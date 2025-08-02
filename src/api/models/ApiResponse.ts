/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ApiResponse = {
    /**
     * Indicates if the request was successful
     */
    success: boolean;
    /**
     * Response message
     */
    message: string;
    /**
     * Response data
     */
    data?: Record<string, any>;
    /**
     * Error details
     */
    error?: string;
    /**
     * Additional metadata
     */
    meta?: Record<string, any>;
    /**
     * Response timestamp
     */
    timestamp: string;
};

