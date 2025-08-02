/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReturnItemDto } from './CreateReturnItemDto';
export type UpdateReturnDto = {
    saleId?: string;
    refundAmount?: number;
    items?: Array<CreateReturnItemDto>;
    notes?: string;
    autoCalculateRefund?: boolean;
    restockItems?: boolean;
};

