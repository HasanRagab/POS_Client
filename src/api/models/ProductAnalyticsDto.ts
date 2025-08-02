/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryPerformanceDto } from './CategoryPerformanceDto';
import type { PriceAnalysisDto } from './PriceAnalysisDto';
import type { ProductChangeDto } from './ProductChangeDto';
import type { ProfitabilityAnalysisDto } from './ProfitabilityAnalysisDto';
import type { TopSellingProductDto } from './TopSellingProductDto';
export type ProductAnalyticsDto = {
    totalProducts: number;
    totalVariants: number;
    averagePrice: number;
    totalRevenue: number;
    bestPerformingCategory: string;
    changeFromPrevious: ProductChangeDto;
    topSellingProducts: Array<TopSellingProductDto>;
    categoryPerformance: Array<CategoryPerformanceDto>;
    priceAnalysis: PriceAnalysisDto;
    profitabilityAnalysis: Array<ProfitabilityAnalysisDto>;
};

