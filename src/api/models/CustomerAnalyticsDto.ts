/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerChangeDto } from './CustomerChangeDto';
import type { CustomerGrowthDto } from './CustomerGrowthDto';
import type { CustomerSegmentDto } from './CustomerSegmentDto';
import type { TopCustomerDto } from './TopCustomerDto';
export type CustomerAnalyticsDto = {
    totalCustomers: number;
    newCustomers: number;
    returningCustomers: number;
    averageCustomerValue: number;
    customerRetentionRate: number;
    customerLifetimeValue: number;
    changeFromPrevious: CustomerChangeDto;
    customerSegments: Array<CustomerSegmentDto>;
    topCustomers: Array<TopCustomerDto>;
    customerGrowth: Array<CustomerGrowthDto>;
};

