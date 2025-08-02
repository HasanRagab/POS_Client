/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerAnalyticsDto } from '../models/CustomerAnalyticsDto';
import type { DashboardOverviewDto } from '../models/DashboardOverviewDto';
import type { FinancialAnalyticsDto } from '../models/FinancialAnalyticsDto';
import type { InventoryAnalyticsDto } from '../models/InventoryAnalyticsDto';
import type { PerformanceAnalyticsDto } from '../models/PerformanceAnalyticsDto';
import type { ProductAnalyticsDto } from '../models/ProductAnalyticsDto';
import type { ReturnAnalyticsDto } from '../models/ReturnAnalyticsDto';
import type { SalesAnalyticsDto } from '../models/SalesAnalyticsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnalyticsService {
    /**
     * Get comprehensive dashboard overview analytics
     * @param startDate Start date for analytics query
     * @param endDate End date for analytics query
     * @param timeRange Predefined time range
     * @param groupBy Group data by time period
     * @param locationId Filter by location ID
     * @param categoryId Filter by category ID
     * @param productId Filter by product ID
     * @param userId Filter by user ID
     * @param customerId Filter by customer ID
     * @param compareWithPrevious Include comparison with previous period
     * @returns DashboardOverviewDto Dashboard analytics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetDashboard(
        startDate?: string,
        endDate?: string,
        timeRange?: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_90_days' | 'this_month' | 'last_month' | 'this_year' | 'last_year' | 'custom',
        groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year',
        locationId?: string,
        categoryId?: string,
        productId?: string,
        userId?: string,
        customerId?: string,
        compareWithPrevious?: boolean,
    ): CancelablePromise<DashboardOverviewDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analytics/dashboard',
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'timeRange': timeRange,
                'groupBy': groupBy,
                'locationId': locationId,
                'categoryId': categoryId,
                'productId': productId,
                'userId': userId,
                'customerId': customerId,
                'compareWithPrevious': compareWithPrevious,
            },
        });
    }
    /**
     * Get detailed sales analytics
     * @param startDate Start date for analytics query
     * @param endDate End date for analytics query
     * @param timeRange Predefined time range
     * @param groupBy Group data by time period
     * @param locationId Filter by location ID
     * @param categoryId Filter by category ID
     * @param productId Filter by product ID
     * @param userId Filter by user ID
     * @param customerId Filter by customer ID
     * @param compareWithPrevious Include comparison with previous period
     * @returns SalesAnalyticsDto Sales analytics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetSalesAnalytics(
        startDate?: string,
        endDate?: string,
        timeRange?: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_90_days' | 'this_month' | 'last_month' | 'this_year' | 'last_year' | 'custom',
        groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year',
        locationId?: string,
        categoryId?: string,
        productId?: string,
        userId?: string,
        customerId?: string,
        compareWithPrevious?: boolean,
    ): CancelablePromise<SalesAnalyticsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analytics/sales',
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'timeRange': timeRange,
                'groupBy': groupBy,
                'locationId': locationId,
                'categoryId': categoryId,
                'productId': productId,
                'userId': userId,
                'customerId': customerId,
                'compareWithPrevious': compareWithPrevious,
            },
        });
    }
    /**
     * Get detailed inventory analytics
     * @param startDate Start date for analytics query
     * @param endDate End date for analytics query
     * @param timeRange Predefined time range
     * @param groupBy Group data by time period
     * @param locationId Filter by location ID
     * @param categoryId Filter by category ID
     * @param productId Filter by product ID
     * @param userId Filter by user ID
     * @param customerId Filter by customer ID
     * @param compareWithPrevious Include comparison with previous period
     * @returns InventoryAnalyticsDto Inventory analytics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetInventoryAnalytics(
        startDate?: string,
        endDate?: string,
        timeRange?: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_90_days' | 'this_month' | 'last_month' | 'this_year' | 'last_year' | 'custom',
        groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year',
        locationId?: string,
        categoryId?: string,
        productId?: string,
        userId?: string,
        customerId?: string,
        compareWithPrevious?: boolean,
    ): CancelablePromise<InventoryAnalyticsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analytics/inventory',
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'timeRange': timeRange,
                'groupBy': groupBy,
                'locationId': locationId,
                'categoryId': categoryId,
                'productId': productId,
                'userId': userId,
                'customerId': customerId,
                'compareWithPrevious': compareWithPrevious,
            },
        });
    }
    /**
     * Get detailed customer analytics
     * @param startDate Start date for analytics query
     * @param endDate End date for analytics query
     * @param timeRange Predefined time range
     * @param groupBy Group data by time period
     * @param locationId Filter by location ID
     * @param categoryId Filter by category ID
     * @param productId Filter by product ID
     * @param userId Filter by user ID
     * @param customerId Filter by customer ID
     * @param compareWithPrevious Include comparison with previous period
     * @returns CustomerAnalyticsDto Customer analytics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetCustomerAnalytics(
        startDate?: string,
        endDate?: string,
        timeRange?: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_90_days' | 'this_month' | 'last_month' | 'this_year' | 'last_year' | 'custom',
        groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year',
        locationId?: string,
        categoryId?: string,
        productId?: string,
        userId?: string,
        customerId?: string,
        compareWithPrevious?: boolean,
    ): CancelablePromise<CustomerAnalyticsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analytics/customers',
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'timeRange': timeRange,
                'groupBy': groupBy,
                'locationId': locationId,
                'categoryId': categoryId,
                'productId': productId,
                'userId': userId,
                'customerId': customerId,
                'compareWithPrevious': compareWithPrevious,
            },
        });
    }
    /**
     * Get detailed product analytics
     * @param startDate Start date for analytics query
     * @param endDate End date for analytics query
     * @param timeRange Predefined time range
     * @param groupBy Group data by time period
     * @param locationId Filter by location ID
     * @param categoryId Filter by category ID
     * @param productId Filter by product ID
     * @param userId Filter by user ID
     * @param customerId Filter by customer ID
     * @param compareWithPrevious Include comparison with previous period
     * @returns ProductAnalyticsDto Product analytics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetProductAnalytics(
        startDate?: string,
        endDate?: string,
        timeRange?: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_90_days' | 'this_month' | 'last_month' | 'this_year' | 'last_year' | 'custom',
        groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year',
        locationId?: string,
        categoryId?: string,
        productId?: string,
        userId?: string,
        customerId?: string,
        compareWithPrevious?: boolean,
    ): CancelablePromise<ProductAnalyticsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analytics/products',
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'timeRange': timeRange,
                'groupBy': groupBy,
                'locationId': locationId,
                'categoryId': categoryId,
                'productId': productId,
                'userId': userId,
                'customerId': customerId,
                'compareWithPrevious': compareWithPrevious,
            },
        });
    }
    /**
     * Get detailed return analytics
     * @param startDate Start date for analytics query
     * @param endDate End date for analytics query
     * @param timeRange Predefined time range
     * @param groupBy Group data by time period
     * @param locationId Filter by location ID
     * @param categoryId Filter by category ID
     * @param productId Filter by product ID
     * @param userId Filter by user ID
     * @param customerId Filter by customer ID
     * @param compareWithPrevious Include comparison with previous period
     * @returns ReturnAnalyticsDto Return analytics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetReturnAnalytics(
        startDate?: string,
        endDate?: string,
        timeRange?: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_90_days' | 'this_month' | 'last_month' | 'this_year' | 'last_year' | 'custom',
        groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year',
        locationId?: string,
        categoryId?: string,
        productId?: string,
        userId?: string,
        customerId?: string,
        compareWithPrevious?: boolean,
    ): CancelablePromise<ReturnAnalyticsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analytics/returns',
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'timeRange': timeRange,
                'groupBy': groupBy,
                'locationId': locationId,
                'categoryId': categoryId,
                'productId': productId,
                'userId': userId,
                'customerId': customerId,
                'compareWithPrevious': compareWithPrevious,
            },
        });
    }
    /**
     * Get detailed financial analytics
     * @param startDate Start date for analytics query
     * @param endDate End date for analytics query
     * @param timeRange Predefined time range
     * @param groupBy Group data by time period
     * @param locationId Filter by location ID
     * @param categoryId Filter by category ID
     * @param productId Filter by product ID
     * @param userId Filter by user ID
     * @param customerId Filter by customer ID
     * @param compareWithPrevious Include comparison with previous period
     * @returns FinancialAnalyticsDto Financial analytics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetFinancialAnalytics(
        startDate?: string,
        endDate?: string,
        timeRange?: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_90_days' | 'this_month' | 'last_month' | 'this_year' | 'last_year' | 'custom',
        groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year',
        locationId?: string,
        categoryId?: string,
        productId?: string,
        userId?: string,
        customerId?: string,
        compareWithPrevious?: boolean,
    ): CancelablePromise<FinancialAnalyticsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analytics/financial',
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'timeRange': timeRange,
                'groupBy': groupBy,
                'locationId': locationId,
                'categoryId': categoryId,
                'productId': productId,
                'userId': userId,
                'customerId': customerId,
                'compareWithPrevious': compareWithPrevious,
            },
        });
    }
    /**
     * Get detailed performance analytics
     * @param startDate Start date for analytics query
     * @param endDate End date for analytics query
     * @param timeRange Predefined time range
     * @param groupBy Group data by time period
     * @param locationId Filter by location ID
     * @param categoryId Filter by category ID
     * @param productId Filter by product ID
     * @param userId Filter by user ID
     * @param customerId Filter by customer ID
     * @param compareWithPrevious Include comparison with previous period
     * @returns PerformanceAnalyticsDto Performance analytics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetPerformanceAnalytics(
        startDate?: string,
        endDate?: string,
        timeRange?: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_90_days' | 'this_month' | 'last_month' | 'this_year' | 'last_year' | 'custom',
        groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year',
        locationId?: string,
        categoryId?: string,
        productId?: string,
        userId?: string,
        customerId?: string,
        compareWithPrevious?: boolean,
    ): CancelablePromise<PerformanceAnalyticsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analytics/performance',
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'timeRange': timeRange,
                'groupBy': groupBy,
                'locationId': locationId,
                'categoryId': categoryId,
                'productId': productId,
                'userId': userId,
                'customerId': customerId,
                'compareWithPrevious': compareWithPrevious,
            },
        });
    }
}
