/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BenchmarksDto } from './BenchmarksDto';
import type { OperationalMetricsDto } from './OperationalMetricsDto';
import type { PerformanceAlertDto } from './PerformanceAlertDto';
import type { SalesPerformanceDto } from './SalesPerformanceDto';
import type { TrendDto } from './TrendDto';
export type PerformanceAnalyticsDto = {
    salesPerformance: SalesPerformanceDto;
    operationalMetrics: OperationalMetricsDto;
    trends: Array<TrendDto>;
    benchmarks: BenchmarksDto;
    alerts: Array<PerformanceAlertDto>;
};

