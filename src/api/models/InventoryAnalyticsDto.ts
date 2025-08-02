/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryBreakdownDto } from './CategoryBreakdownDto';
import type { InventoryChangeDto } from './InventoryChangeDto';
import type { LowStockAlertDto } from './LowStockAlertDto';
import type { StockMovementDto } from './StockMovementDto';
export type InventoryAnalyticsDto = {
    totalProducts: number;
    totalStockValue: number;
    lowStockItems: number;
    outOfStockItems: number;
    averageStockLevel: number;
    stockTurnover: number;
    changeFromPrevious: InventoryChangeDto;
    categoryBreakdown: Array<CategoryBreakdownDto>;
    lowStockAlerts: Array<LowStockAlertDto>;
    stockMovements: Array<StockMovementDto>;
};

