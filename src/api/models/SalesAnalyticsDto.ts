/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationSalesDto } from './LocationSalesDto';
import type { MetricChangeDto } from './MetricChangeDto';
import type { PaymentMethodDto } from './PaymentMethodDto';
import type { TimeSeriesDataDto } from './TimeSeriesDataDto';
import type { TopProductDto } from './TopProductDto';
export type SalesAnalyticsDto = {
    totalRevenue: number;
    totalTransactions: number;
    averageOrderValue: number;
    totalTax: number;
    totalDiscount: number;
    netRevenue: number;
    changeFromPrevious: MetricChangeDto;
    timeSeries: Array<TimeSeriesDataDto>;
    topSellingProducts: Array<TopProductDto>;
    salesByLocation: Array<LocationSalesDto>;
    paymentMethods: Array<PaymentMethodDto>;
};

