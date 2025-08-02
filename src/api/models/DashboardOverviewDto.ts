/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlertDto } from './AlertDto';
import type { DashboardCustomersDto } from './DashboardCustomersDto';
import type { DashboardInventoryDto } from './DashboardInventoryDto';
import type { DashboardReturnsDto } from './DashboardReturnsDto';
import type { DashboardSalesDto } from './DashboardSalesDto';
export type DashboardOverviewDto = {
    sales: DashboardSalesDto;
    inventory: DashboardInventoryDto;
    customers: DashboardCustomersDto;
    returns: DashboardReturnsDto;
    alerts: Array<AlertDto>;
};

