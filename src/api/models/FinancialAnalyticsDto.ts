/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CashFlowDto } from './CashFlowDto';
import type { ExpenseCategoryDto } from './ExpenseCategoryDto';
import type { FinancialChangeDto } from './FinancialChangeDto';
import type { ProfitAnalysisDto } from './ProfitAnalysisDto';
import type { RevenueBreakdownDto } from './RevenueBreakdownDto';
export type FinancialAnalyticsDto = {
    grossRevenue: number;
    netRevenue: number;
    totalCosts: number;
    grossProfit: number;
    grossProfitMargin: number;
    totalTax: number;
    totalDiscounts: number;
    changeFromPrevious: FinancialChangeDto;
    revenueBreakdown: RevenueBreakdownDto;
    profitAnalysis: ProfitAnalysisDto;
    cashFlow: Array<CashFlowDto>;
    expenseCategories: Array<ExpenseCategoryDto>;
};

